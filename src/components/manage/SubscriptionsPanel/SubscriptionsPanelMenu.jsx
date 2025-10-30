import { Icon } from '@plone/volto/components';
import React, { useState } from 'react';
import { Link as AriaComponentsLink } from 'react-aria-components';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Menu, Button, Modal, ModalHeader } from 'semantic-ui-react';
import downloadSVG from '@plone/volto/icons/download.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';
import addSVG from '@plone/volto/icons/add.svg';
import settingSVG from '@plone/volto/icons/configuration.svg';
import ModalAddSubscription from './ModalAddSubscription';
import ModalImportSubscriptions from './ModalImportSubscriptions';
import messages from './messages';
import { useSelector } from 'react-redux';

const SubscriptionsPanelMenu = ({ doSearch, querystring }) => {
  const intl = useIntl();
  const subscriptions = useSelector((state) => state.getSubscriptions);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalImport, setShowModalImport] = useState(false);
  const canManage = subscriptions?.result?.permissions?.can_manage || false;
  if (!canManage) return null;
  return (
    <>
      <Menu secondary className="subscriptions-panel-menu">
        <Menu.Item>
          <Button
            color="green"
            icon
            labelPosition="right"
            onClick={() => setShowModalAdd(true)}
          >
            {intl.formatMessage(messages.add_subscriber)}
            <i className="icon">
              <Icon name={addSVG} size="20px" />
            </i>
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            color="primary"
            labelPosition="right"
            icon
            onClick={() => {
              setShowModalImport(true);
            }}
          >
            {intl.formatMessage(messages.import_subscriptions)}
            <i className="icon">
              <Icon name={uploadSVG} size="20px" />
            </i>
          </Button>
        </Menu.Item>
        <Menu.Item>
          <AriaComponentsLink
            className="ui button icon right labeled primary"
            href={`/++api++/@subscriptions-csv?${querystring}`}
            download="subscriptions.csv"
          >
            {intl.formatMessage(messages.export_list)}
            <i className="icon">
              <Icon name={downloadSVG} size="20px" />
            </i>
          </AriaComponentsLink>
        </Menu.Item>
        <Menu.Item>
          <Link
            className="ui button icon right labeled"
            to="/controlpanel/rer.ufficiostampa"
          >
            {intl.formatMessage(messages.ufficiostampa_settings)}
            <i className="icon">
              <Icon name={settingSVG} size="20px" />
            </i>
          </Link>
        </Menu.Item>
      </Menu>

      <ModalAddSubscription
        showModal={showModalAdd}
        setShowModal={setShowModalAdd}
        onClose={doSearch}
      />

      <Modal
        id="modal-add-subscription"
        className="ufficiostampa-modal"
        isOpen={showModalAdd}
      >
        <ModalHeader>
          {intl.formatMessage(messages.modal_add_title)}
        </ModalHeader>
      </Modal>

      {showModalImport && (
        <ModalImportSubscriptions
          showModal={showModalImport}
          setShowModal={setShowModalImport}
          onClose={doSearch}
        />
      )}
    </>
  );
};

export default SubscriptionsPanelMenu;
