import React, { useEffect } from 'react';
import { Button, Dialog, Heading, Modal } from 'react-aria-components';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { deleteSendHistory } from '../../../actions';
import messages from './messages';

const ModalDelete = ({ items, setItems, showModal, setShowModal, onClose }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const status = useSelector((state) => state?.deleteSendHistory);

  useEffect(() => {
    return () => {
      onClose();
    };
  }, [onClose]);

  useEffect(() => {
    if (
      status?.loaded &&
      status?.error === null
    ) {
      // TODO: toastify
      setItems([]);
      setShowModal(false);
    } else if (status?.loaded) {
      console.log(status?.error);
      // TODO: manage errors
    }
  }, [status, onClose, setItems, setShowModal]);

  return (
    <Modal
      className="react-aria-Modal newsletter-modal"
      isDismissable
      isOpen={showModal}
      // onOpenChange={() => setShowModal(showModal)}
    >
      <Dialog>
        <div className="modal-header">
          <Heading>
            {intl.formatMessage(messages.confirm_delete_selected)}
          </Heading>
          <div className="close">
            <Button onPress={() => setShowModal(false)}>X</Button>
          </div>
        </div>

        <div className="content ui ">
          <div className="content ui ">
            {status?.loading && !status?.loaded && (
              <Dimmer active>
                <Loader inverted inline="centered" size="large">
                  {intl.formatMessage(messages.loading)}
                </Loader>
              </Dimmer>
            )}
            <pre>{JSON.stringify(items, null, 2)}</pre>
            {/* {items?.map((item, i) => (
              <div className="confirm-delete-item" key={item}>
                {item.email}
              </div>
            ))} */}
          </div>
        </div>
        <div className="form-action">
          <Button
            onClick={() => {
              dispatch(
                deleteSendHistory({
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