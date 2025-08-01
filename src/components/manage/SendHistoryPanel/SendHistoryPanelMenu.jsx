import { Icon } from '@plone/volto/components';
import React, { useState } from 'react';
import { Link as AriaComponentsLink } from 'react-aria-components';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Menu, Button } from 'semantic-ui-react';
import ModalDelete from './ModalDelete';

import downloadSVG from '@plone/volto/icons/download.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
// import '@plone/components/src/styles/basic/Button.css';
// import '@plone/components/src/styles/basic/Dialog.css';
// import '@plone/components/src/styles/basic/Modal.css';
// import '../modals.css';
import messages from './messages';

const SendHistoryPanelMenu = ({ doSearch }) => {
  const intl = useIntl();

  const [showModalDelete, setShowModalDelete] = useState(false);

  return (
    <>
      <Menu secondary className="send-history-panel-menu">
        <Menu.Item>
          <AriaComponentsLink
            className="ui button icon right labeled primary"
            href="/++api++/@send-history-csv"
            download="subscriptions.csv"
          >
            {intl.formatMessage(messages.download_label)}
            <i className="icon">
              <Icon name={downloadSVG} size="20px" />
            </i>
          </AriaComponentsLink>
        </Menu.Item>
        <Menu.Item>
          <Button
            color="red"
            icon
            labelPosition="right"
            onClick={() => setShowModalDelete(true)}
          >
            {intl.formatMessage(messages.delete_send_history)}
            <i className="icon">
              <Icon name={trashSVG} size="20px" />
            </i>
          </Button>
        </Menu.Item>
      </Menu>
      {showModalDelete && (
        <ModalDelete
          showModal={showModalDelete}
          setShowModal={setShowModalDelete}
          onClose={doSearch}
        />
      )}
    </>
  );
};

export default SendHistoryPanelMenu;
