import React, { useEffect } from 'react';
import { Button, Dialog, Heading, Modal } from 'react-aria-components';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { deleteSubscriptions } from '../../../actions';
import messages from './messages';

import './subscriptions-panel.css';

const ModalDelete = ({ items, setItems, showModal, setShowModal, onClose }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const deleteSubscriptionsState = useSelector(
    (state) => state?.deleteSubscriptions,
  );

  useEffect(() => {
    if (
      deleteSubscriptionsState?.loaded &&
      deleteSubscriptionsState?.error === null
    ) {
      // TODO: toastify
      setItems([]);
      setShowModal(false);
    } else if (deleteSubscriptionsState?.loaded) {
      console.log(deleteSubscriptionsState?.error);
      // TODO: manage errors
    }
  }, [deleteSubscriptionsState, onClose, setItems, setShowModal]);

  return (
    <Modal
      className="react-aria-Modal ufficiostampa-modal"
      isDismissable
      isOpen={showModal}
      onOpenChange={setShowModal}
    >
      <Dialog>
        <div className="modal-header">
          <Heading>
            {intl.formatMessage(messages.confirm_delete_selected)}
          </Heading>
        </div>

        <div className="content ui ">
          <div className="content ui ">
            {deleteSubscriptionsState?.loading &&
              !deleteSubscriptionsState?.loaded && (
                <Dimmer active>
                  <Loader inverted inline="centered" size="large">
                    {intl.formatMessage(messages.loading)}
                  </Loader>
                </Dimmer>
              )}
            {items?.map((item, i) => (
              <div className="confirm-delete-item" key={item.email}>
                {item.email}
              </div>
            ))}
          </div>
        </div>
        <div className="form-action">
          <Button
            onClick={() => {
              dispatch(
                deleteSubscriptions({
                  id: items.map((i) => i.id),
                }),
              );
            }}
            className="react-aria-Button primary"
          >
            {intl.formatMessage(messages.confirm)}
          </Button>
          <Button
            className="react-aria-Button cancel"
            onClick={() => setShowModal(false)}
          >
            {intl.formatMessage(messages.cancel)}
          </Button>
        </div>
      </Dialog>
    </Modal>
  );
};

export default ModalDelete;
