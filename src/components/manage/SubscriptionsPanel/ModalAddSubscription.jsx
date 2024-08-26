import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Dialog,
  Heading,
  Input,
  Label,
  Modal,
  TextField,
  FieldError,
} from 'react-aria-components';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

// import { Toast } from '@plone/volto/components';
// import { toast, ToastContainer } from 'react-toastify';
import { addSubscription, resetAddSubscription } from '../../../actions';
import messages from './messages';

const ModalAddSubscription = ({ showModal, setShowModal, onClose }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.addSubscription);
  const subscriptions = useSelector((state) => state.getSubscriptions);
  const [emailAddress, setEmailAddress] = useState('');
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [error, setError] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    // TODO: validate email, validate empty channels
    dispatch(
      addSubscription({
        // TODO: add other fields
        // "name",
        // "surname",
        // "phone",
        // "newspaper",
        email: emailAddress,
        channels: selectedChannels,
      }),
    );
    // cleanup fields
    // setEmailAddress('');
  };

  useEffect(() => {
    if (status.loaded) {
      if (status.error) {
        const msg =
          status.error?.response?.body?.message ||
          intl.formatMessage(messages.subscribe_add_error);
        // console.log(msg);
        // toast.error(<Toast error content={msg} />);
        setError(msg);
      } else {
        // toast.success(
        //   <Toast
        //     success
        //     content={intl.formatMessage(messages.subscribe_add_success)}
        //   />,
        // );
        setShowModal(false);
      }
    }
  }, [status, intl, setShowModal]);

  useEffect(() => {
    return () => {
      // setEmailAddress('');
      dispatch(resetAddSubscription());
      onClose();
    };
  }, [dispatch, onClose]);

  return (
    <Modal
      id="modal-add-subscription"
      className="react-aria-Modal newsletter-modal"
      isDismissable
      isOpen={showModal}
      // onOpenChange={() => toggleModal(!modalIsOpen)}
    >
      <Dialog>
        <div className="modal-header">
          <Heading slot="title">
            {intl.formatMessage(messages.modal_add_title)}
          </Heading>
          {/* <div className="close">
            <Button onPress={() => setShowModal(false)}>X</Button>
          </div> */}
        </div>
        <p className="modal-description">
          {intl.formatMessage(messages.modal_description)}
        </p>
        <form validationErrors={{ email: error }} onSubmit={onFormSubmit}>
          <div className="field">
            <TextField
              required
              name="email"
              id="email"
              // autoFocus
              autoComplete="off"
              value={emailAddress}
              onChange={setEmailAddress}
            >
              <Label>{intl.formatMessage(messages.email_label)}</Label>
              <Input />
              <FieldError />
            </TextField>
          </div>
          <div className="field">
            <CheckboxGroup onChange={(value) => setSelectedChannels(value)}>
              <Label>{intl.formatMessage(messages.selectChannel)}</Label>
              {subscriptions?.result?.channels?.map((channel) => (
                <Checkbox value={channel}>
                  <div className="checkbox" aria-hidden="true">
                    <svg viewBox="0 0 18 18">
                      <polyline points="1 9 7 14 15 4" />
                    </svg>
                  </div>
                  {channel}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
          <div className="form-action">
            <Button type="submit" className="react-aria-Button primary">
              {status?.loading && (
                <Icon
                  icon="it-refresh"
                  className="icon-sm load-status-icon"
                  color="white"
                />
              )}
              {intl.formatMessage(messages.modal_button_confirm)}
            </Button>
            <Button
              className="react-aria-Button cancel"
              onClick={() => setShowModal(false)}
            >
              {intl.formatMessage(messages.modal_button_cancel)}
            </Button>
          </div>
          <div>{error}</div>
        </form>
      </Dialog>
    </Modal>
  );
};

export default ModalAddSubscription;
