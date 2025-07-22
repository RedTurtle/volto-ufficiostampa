import { Icon } from '@plone/volto/components';
import React, { useState } from 'react';
import { Button, Link as AriaComponentsLink } from 'react-aria-components';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Menu } from 'semantic-ui-react';
import downloadSVG from '@plone/volto/icons/download.svg';
import ModalDelete from './ModalDelete';

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
      <Menu secondary>
        <Menu.Item>
          <AriaComponentsLink
            className="react-aria-Button primary"
            labelPosition="right"
            icon
            href="/++api++/@send-history-csv"
            download="subscriptions.csv"
          >
            {intl.formatMessage(messages.export)}
            <i className="icon">
              <Icon name={downloadSVG} size="20px" />
            </i>
          </AriaComponentsLink>
          <Button
            className="react-aria-Button cancel"
            labelPosition="right"
            onClick={() => {
              setShowModalDelete(true);
            }}
          >
            {intl.formatMessage(messages.delete_send_history)}
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
