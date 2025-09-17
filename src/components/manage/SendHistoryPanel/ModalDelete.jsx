import React, { useEffect } from 'react';
import { Button, Dialog, Heading, Modal } from 'react-aria-components';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { deleteSendHistory } from '../../../actions';
import messages from './messages';
import { Toast } from '@plone/volto/components';
import { toast } from 'react-toastify';

const ModalDelete = ({ items, setItems, showModal, setShowModal, onClose }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const status = useSelector((state) => state?.deleteSendHistory);

  useEffect(() => {
    if (status?.loaded && status?.error === null) {
      // TODO: toastify
      setShowModal(false);
      toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.success)}
          content={intl.formatMessage(messages.history_deleted)}
        />,
      );
    } else if (status?.loaded) {
      console.error(status?.error);
      // TODO: manage errors
    }
  }, [status, onClose, setItems, setShowModal]);

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

        <div className="content ui">
          {status?.loading && !status?.loaded && (
            <Dimmer active>
              <Loader inverted inline="centered" size="large">
                {intl.formatMessage(messages.loading)}
              </Loader>
            </Dimmer>
          )}
          <pre>{JSON.stringify(items, null, 2)}</pre>
        </div>
        <div className="form-action">
          <Button
            onClick={() => {
              dispatch(deleteSendHistory());
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
