// TODO:: spostare la complessità sul frontend e usare solo l'api crud del backend
// https://github.com/tableflowhq/csv-import
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import {
  DropZone,
  FileTrigger,
  Button,
  Dialog,
  Heading,
  Checkbox,
  Label,
  Modal,
  TextField,
  Text,
  Input,
} from 'react-aria-components';
import { Dimmer, Loader } from 'semantic-ui-react';
import trashSVG from '@plone/volto/icons/delete.svg';
import { Icon } from '@plone/volto/components';
import { resetImportSubscription, importSubscriptions } from '../../../actions';
import '@plone/components/src/styles/basic/Form.css';
import '@plone/components/src/styles/basic/Button.css';
import '@plone/components/src/styles/basic/Modal.css';
import '@plone/components/src/styles/basic/Dialog.css';
import '@plone/components/src/styles/basic/Checkbox.css';
// import template_csv from './import_template.csv';
import messages from './messages';

const ModalImportSubscriptions = ({ showModal, setShowModal, onClose }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    clear: false,
    overwrite: false,
    has_header: false,
    csv_separator: ',',
    file: null,
  });
  const [formFilename, setFormFilename] = useState('');
  const status = useSelector((state) => state.importSubscriptions);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      // setFormData({});
      // setFormFilename('');
      dispatch(resetImportSubscription());
      onClose();
    };
  }, [dispatch, onClose]);

  useEffect(() => {
    if (status.loaded) {
      if (status.error) {
        const msg =
          status.error?.response?.body?.message ||
          intl.formatMessage(messages.subscribe_add_error);
        setError(msg);
      } else {
        setShowModal(false);
      }
    }
  }, [status, intl, setShowModal]);

  useEffect(() => {
    setError('');
  }, [formData]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    // TODO: disable form
    dispatch(importSubscriptions(formData));
  };
  return (
    <Modal
      id="modal-import-subscriptions"
      className="react-aria-Modal ufficiostampa-modal"
      isDismissable
      isOpen={showModal}
      onOpenChange={setShowModal}
      // onOpenChange={() => toggleModal(!showModal)}
    >
      {status.loading && (
        <Dimmer active>
          <Loader inverted inline="centered" size="large">
            {intl.formatMessage(messages.loading)}
          </Loader>
        </Dimmer>
      )}

      <Dialog>
        <div className="modal-header">
          <Heading slot="title">
            {intl.formatMessage(messages.import_subscriptions)}
          </Heading>
          {/* <div className="close">
            <Button onPress={() => setShowModal(false)}>X</Button>
          </div> */}
        </div>
        <p className="modal-description">
          {intl.formatMessage(messages.import_description)}
          {/* Download the
          <a href={template_csv} download>
            template file
          </a> */}
        </p>

        <form onSubmit={onFormSubmit} disable={status.loading}>
          <div className="field">
            <DropZone className="react-aria-DropZone dropzone-placeholder">
              {/* TODO: gestire anche xls/xlsx */}
              <FileTrigger
                acceptedFileTypes={['text/csv']}
                allowsMultiple={false}
                onSelect={(e) => {
                  const file = Array.from(e)[0];
                  setFormFilename(file.name);
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    setFormData({
                      ...formData,
                      file: {
                        data: reader.result,
                        encoding: 'base64',
                        'content-type': file.type,
                        filename: file.name,
                      },
                    });
                  };
                }}
              >
                <Button>
                  {formFilename
                    ? intl.formatMessage(messages.replace_file)
                    : intl.formatMessage(messages.select_file)}
                </Button>
              </FileTrigger>
            </DropZone>
            <Text>{formFilename}</Text>
            {formFilename && (
              <Button
                color="red"
                icon
                labelPosition="right"
                className="react-aria-Button delete-file"
                onClick={() => {
                  setFormData({ ...formData, file: null });
                  setFormFilename('');
                }}
              >
                <i className="icon">
                  <Icon name={trashSVG} size="20px" />
                </i>
              </Button>
            )}
          </div>
          <div className="field">
            <Checkbox
              isSelected={formData.clear || false}
              onChange={(v) => {
                setFormData({ ...formData, clear: v });
              }}
            >
              <div className="checkbox">
                <svg viewBox="0 0 18 18" aria-hidden="true">
                  <polyline points="1 9 7 14 15 4" />
                </svg>
              </div>
              {intl.formatMessage(messages.reset_list_label)}
              <Text slot="description">
                {intl.formatMessage(messages.reset_list_help)}
              </Text>
            </Checkbox>
          </div>
          {/* <div className="field">
            <Checkbox
              isSelected={formData.remove_from_list || false}
              onChange={(v) => {
                setFormData({ ...formData, remove_from_list: v });
              }}
            >
              <div className="checkbox">
                <svg viewBox="0 0 18 18" aria-hidden="true">
                  <polyline points="1 9 7 14 15 4" />
                </svg>
              </div>
              {intl.formatMessage(messages.remove_from_list_label)}
              <Text slot="description">
                {intl.formatMessage(messages.remove_from_list_help)}
              </Text>
            </Checkbox>
          </div> */}
          {/* <div className="field">
            <Checkbox
              isSelected={formData.has_header || false}
              onChange={(v) => {
                setFormData({ ...formData, has_header: v });
              }}
            >
              <div className="checkbox">
                <svg viewBox="0 0 18 18" aria-hidden="true">
                  <polyline points="1 9 7 14 15 4" />
                </svg>
              </div>
              {intl.formatMessage(messages.has_header_label)}
              <Text slot="description">
                {intl.formatMessage(messages.has_header_help)}
              </Text>
            </Checkbox>
          </div> */}
          {/* <div className="field">
            <TextField
              required
              id="csv_separator"
              value={formData.csv_separator || ','}
              onChange={(v) => {
                setFormData({ ...formData, csv_separator: v });
              }}
            >
              <Label>{intl.formatMessage(messages.csv_separator_label)}</Label>
              <Text slot="description">
                {intl.formatMessage(messages.csv_separator_help)}
              </Text>
              <Input />
            </TextField>
          </div> */}
          {/* TODO: error styles */}
          <div>{error}</div>
          <div className="form-action">
            <Button
              type="submit"
              className="react-aria-Button primary"
              disable={!formData?.file || status?.loading ? true : false}
            >
              {/* {status?.loading && (
                <Icon
                  icon="it-refresh"
                  className="icon-sm load-status-icon"
                  color="white"
                />
              )} */}
              {intl.formatMessage(messages.modal_button_confirm)}
            </Button>
            <Button
              className="react-aria-Button cancel"
              onClick={() => setShowModal(false)}
              disable={status?.loading ? true : false}
            >
              {intl.formatMessage(messages.modal_button_cancel)}
            </Button>
          </div>
        </form>
      </Dialog>
    </Modal>
  );
};

export default ModalImportSubscriptions;
