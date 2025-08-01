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
  Form,
  TextField,
  FieldError,
} from 'react-aria-components';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '@plone/volto/components';
import { toast } from 'react-toastify';
import {
  addSubscription,
  resetAddSubscription,
  updateSubscription,
  resetUpdateSubscription,
} from 'volto-ufficiostampa/actions';
import messages from './messages';

const defaultSubscriptionData = {
  name: '',
  surname: '',
  email: '',
  channels: [],
  phone: '',
  newspaper: '',
};

const ModalAddSubscription = ({
  showModal,
  setShowModal,
  onClose,
  data = defaultSubscriptionData,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const isEdit = data?.id ? true : false;
  const addStatus = useSelector((state) => state.addSubscription);
  const updateStatus = useSelector((state) => state.updateSubscription);
  const subscriptions = useSelector((state) => state.getSubscriptions);
  const textLineFields = ['name', 'surname', 'email', 'phone', 'newspaper'];
  const requiredFields = ['email', 'channels'];
  const [fieldErrors, setFieldErrors] = useState({});
  const [formSubmitError, setFormSubmitError] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState({});

  const onFormSubmit = (e) => {
    e.preventDefault();

    // validation email
    const { email } = subscriptionData;
    const { id } = data;
    if (email.length && !email.includes('@')) {
      setFieldErrors({ email: 'Email non valida' });
      return;
    }

    // dispatchs
    isEdit
      ? dispatch(updateSubscription({ id, data: subscriptionData }))
      : dispatch(addSubscription(subscriptionData));
  };

  useEffect(() => {
    const status = isEdit ? updateStatus : addStatus;

    if (!status?.loaded && status?.error) {
      const msg =
        status.error?.response?.body?.message ||
        status.error?.response?.body?.error?.message ||
        intl.formatMessage(messages.subscribe_add_error);
      setFormSubmitError(msg);
    } else if (status?.loaded) {
      setSubscriptionData({ ...defaultSubscriptionData });
      setFieldErrors({});
      setFormSubmitError(null);
      setShowModal(false);
      toast.success(
        <Toast
          success
          content={
            isEdit
              ? intl.formatMessage(messages.subscribe_update_success)
              : intl.formatMessage(messages.subscribe_add_success)
          }
        />,
      );
    }
  }, [addStatus, updateStatus, setShowModal]);

  useEffect(() => {
    return () => {
      // setEmailAddress('');
      isEdit
        ? dispatch(resetUpdateSubscription())
        : dispatch(resetAddSubscription());
      onClose();
    };
  }, []);

  useEffect(() => {
    if (data) {
      const { id, date, ...neededData } = data;
      setSubscriptionData({ ...subscriptionData, ...neededData });
    }
  }, [data]);

  const updateFormData = (newValue) => {
    setFormSubmitError(null);
    setSubscriptionData({ ...subscriptionData, ...newValue });
  };

  return (
    <Modal
      id="modal-add-subscription"
      className="react-aria-Modal ufficiostampa-modal"
      isDismissable
      isOpen={showModal}
      onOpenChange={setShowModal}
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
        <Form validationErrors={fieldErrors} onSubmit={onFormSubmit}>
          {formSubmitError && (
            <div role="alert" tabIndex={-1} ref={(e) => e?.focus()}>
              <h3>Unable to submit</h3>
              <p>{formSubmitError}</p>
            </div>
          )}
          {textLineFields.map((fieldId) => (
            <TextField
              name={fieldId}
              id={fieldId}
              key={fieldId}
              value={subscriptionData[fieldId]}
              isRequired={requiredFields.includes(fieldId) || false}
              onChange={(value) => updateFormData({ [fieldId]: value })}
            >
              <Label>{intl.formatMessage(messages[`${fieldId}_label`])}</Label>
              <Input />
              <FieldError />
            </TextField>
          ))}

          <div className="channels-list">
            <CheckboxGroup
              onChange={(value) => updateFormData({ channels: value })}
              isRequired={true}
              value={subscriptionData?.channels ?? []}
            >
              <Label>{intl.formatMessage(messages.selectChannel)}</Label>
              {subscriptions?.result?.channels?.map((channel) => (
                <Checkbox value={channel} key={channel}>
                  <div className="checkbox" aria-hidden="true">
                    <svg viewBox="0 0 18 18">
                      <polyline points="1 9 7 14 15 4" />
                    </svg>
                  </div>
                  {channel}
                </Checkbox>
              ))}
              <FieldError />
            </CheckboxGroup>
          </div>
          <div className="form-action">
            <Button type="submit" className="react-aria-Button primary">
              {(addStatus?.loading || updateStatus?.loading) && (
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
        </Form>
      </Dialog>
    </Modal>
  );
};

export default ModalAddSubscription;
