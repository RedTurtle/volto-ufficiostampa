import '@plone/components/src/styles/basic/Button.css';
import '@plone/components/src/styles/basic/Dialog.css';
import '@plone/components/src/styles/basic/Modal.css';
import { getContent } from '@plone/volto/actions';
import {
  Form,
  Icon,
  Toast,
  Toolbar,
  Unauthorized,
} from '@plone/volto/components';
import {
  flattenToAppURL,
  getBaseUrl,
  Helmet,
  tryParseJSON,
  usePrevious,
} from '@plone/volto/helpers';
import backSVG from '@plone/volto/icons/back.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import saveSVG from '@plone/volto/icons/send.svg';
import showSVG from '@plone/volto/icons/show.svg';
import { useEffect, useRef, useState } from 'react';
import {
  // Button,
  Dialog,
  Heading,
  // Input,
  // Label,
  Modal,
} from 'react-aria-components';
import { createPortal } from 'react-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Portal } from 'react-portal';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, Dimmer, Loader, Segment } from 'semantic-ui-react';
import {
  getSendComunicatoSchema,
  resetSendComunicato,
  sendComunicato,
} from '../../../actions';
import '../modals.css';
import SendComunicatoPreview from './SendComunicatoPreview';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  edit: {
    id: 'Edit {title}',
    defaultMessage: 'Edit {title}',
  },
  send: {
    id: 'Send',
    defaultMessage: 'Send',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  someErrors: {
    id: 'There are some errors.',
    defaultMessage: 'There are some errors.',
  },
  send: {
    id: 'Send',
    defaultMessage: 'Send',
  },
  send_success: {
    id: 'send_success',
    defaultMessage: 'Comunicato sent',
  },
  send_success_text: {
    id: 'send_success_text',
    defaultMessage: 'Go to send history to check its status.',
  },
  loading: {
    id: 'loading',
    defaultMessage: 'Loading',
  },
});

const SendComunicatoView = (props) => {
  const { location, history } = props;
  const pathname = location.pathname;
  const intl = useIntl();
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const content = useSelector((state) => state.content?.data, shallowEqual);
  const updateRequest = useSelector((state) => state.comunicatoSendReducer);
  const prevrequestloading = usePrevious(updateRequest.loading);
  const [selectedContainers, setSelectedContainers] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const schema = useSelector(
    (state) => state.comunicatoSchemaReducer.result,
    shallowEqual,
  );
  const unauthorized = useSelector(
    (state) => state.comunicatoSchemaReducer?.error === 401,
  );
  const form = useRef();

  useEffect(() => {
    dispatch(getSendComunicatoSchema(flattenToAppURL(getBaseUrl(pathname))));
  }, [dispatch, pathname]);

  //   const onChange = (event, { checked, value }) => {
  //     setSelectedContainers(
  //       checked ? selectedContainers.concat([value]) : selectedContainers.filter((uid) => uid !== value)
  //     );
  //   }

  const onSubmit = (data) => {
    dispatch(sendComunicato(flattenToAppURL(getBaseUrl(pathname)), data));
  };

  const onCancel = (e) => {
    history.push(getBaseUrl(pathname));
  };

  useEffect(() => {
    getContent(getBaseUrl(pathname));
  }, [pathname]);

  useEffect(() => {
    // dispatch(getReplicas(flattenToAppURL(getBaseUrl(pathname))));
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (updateRequest.error) {
      const message =
        updateRequest.error?.response?.body?.error?.message ||
        updateRequest.error?.response?.body?.message ||
        updateRequest.error?.response?.text ||
        '';
      const error =
        new DOMParser().parseFromString(message, 'text/html')?.all[0]
          ?.textContent || message;
      const errorsList = tryParseJSON(error);
      let erroMessage;
      if (Array.isArray(errorsList)) {
        const invariantErrors = errorsList
          .filter((errorItem) => !('field' in errorItem))
          .map((errorItem) => errorItem['message']);
        if (invariantErrors.length > 0) {
          // Plone invariant validation message.
          erroMessage = invariantErrors.join(' - ');
        } else {
          // Error in specific field.
          erroMessage = intl.formatMessage(messages.someErrors);
        }
      } else {
        erroMessage = error;
      }
      toast.error(
        <Toast
          error
          title={intl.formatMessage(messages.error)}
          content={erroMessage}
        />,
      );
      dispatch(resetSendComunicato());
    }
  }, [dispatch, intl, updateRequest.error]);

  useEffect(() => {
    if (updateRequest.result?.status === 'success') {
      toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.send_success)}
          content={intl.formatMessage(messages.send_success_text)}
        />,
      );
      dispatch(resetSendComunicato());
      history.push(getBaseUrl(pathname));
    }
  }, [updateRequest]);

  return unauthorized ? (
    <Unauthorized />
  ) : (
    <>
      <Container id="send-comunicato">
        {updateRequest?.loadingResults && !updateRequest?.hasError && (
          <Dimmer active>
            <Loader inverted inline="centered" size="large">
              {intl.formatMessage(messages.loading)}
            </Loader>
          </Dimmer>
        )}
        <Helmet
          title={`${intl.formatMessage(messages.send)}: ${content?.title}`}
        />
        <Segment.Group raised>
          <Segment className="primary">
            {/* <FormattedMessage
              id="Manage Replica Content for {title}"
              defaultMessage="Manage Replica Content for {title}"
              values={{ title: <q>{content?.title}</q> }}
            /> */}
            <pre>{updateRequest.loadingResults && 'loadingResults'}</pre>
            <pre>{updateRequest.hasError && 'hasError'}</pre>
          </Segment>

          <Segment className="secondary">
            <h4>{content?.title}</h4>
            <p>{content?.description}</p>
          </Segment>
          {schema && (
            <Form
              ref={form}
              title="Send Comunicato"
              schema={schema}
              onSubmit={onSubmit}
              //   onCancel={this.onCancel}
              hideActions
              //   loading={this.props.updateRequest.loading}
            />
          )}
        </Segment.Group>
        {showPreview && (
          <Modal
            id="modal-preview"
            className="react-aria-Modal ufficiostampa-modal"
            isDismissable
            isOpen={showPreview}
            // onOpenChange={() => toggleModal(!modalIsOpen)}
          >
            <Dialog>
              <div className="modal-header">
                <Heading></Heading>
                <div className="close">
                  <Button onClick={() => setShowPreview(false)}>X</Button>
                </div>
              </div>
              {/* <p className="modal-description">
                {intl.formatMessage(messages.modal_description)}
              </p> */}

              <SendComunicatoPreview pathname={pathname} form={form.current} />
            </Dialog>
          </Modal>
        )}
      </Container>
      {isClient && pathname && (
        <Portal node={document.getElementById('toolbar')}>
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Button
                  id="toolbar-save"
                  className="save"
                  aria-label={intl.formatMessage(messages.send)}
                  onClick={() => form.current.onSubmit()}
                  disabled={updateRequest.loading}
                  loading={updateRequest.loading}
                >
                  <Icon
                    name={saveSVG}
                    className="circled"
                    size="30px"
                    title={intl.formatMessage(messages.send)}
                  />
                </Button>
                <Button
                  id="toolbar-preview"
                  onClick={() => setShowPreview(true)}
                >
                  <Icon
                    name={showSVG}
                    className="circled"
                    size="30px"
                    title="preview"
                  />
                </Button>
                <Button
                  className="cancel"
                  aria-label={intl.formatMessage(messages.cancel)}
                  onClick={() => onCancel()}
                >
                  <Icon
                    name={clearSVG}
                    className="circled"
                    size="30px"
                    title={intl.formatMessage(messages.cancel)}
                  />
                </Button>
              </>
            }
          />
        </Portal>
      )}
    </>
  );
};

// export default compose(
//   injectIntl,
//   connect((state, props) => {
//     return {
//       pathname: props.location.pathname,
//       // content: state.content?.data,
//     };
//   }),
// )(Replica);

export default SendComunicatoView;
