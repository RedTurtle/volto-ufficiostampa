import { Icon } from '@plone/volto/components';
import React, { useState } from 'react';
import { Button, Link } from 'react-aria-components';
import { useIntl } from 'react-intl';
import { Menu } from 'semantic-ui-react';
import downloadSVG from '@plone/volto/icons/download.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';
import ModalAddSubscription from './ModalAddSubscription';
import ModalImportSubscriptions from './ModalImportSubscriptions';

// import '@plone/components/src/styles/basic/Button.css';
// import '@plone/components/src/styles/basic/Dialog.css';
// import '@plone/components/src/styles/basic/Modal.css';
// import '../modals.css';
import messages from './messages';

const SubscriptionsPanelMenu = ({ doSearch }) => {
  // const location = useLocation();
  const intl = useIntl();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalImport, setShowModalImport] = useState(false);

  return (
    <>
      <Menu secondary>
        <Menu.Item>
          <Button
            className="react-aria-Button primary"
            onPress={() => {
              setShowModalAdd(true);
            }}
          >
            {intl.formatMessage(messages.add_subscriber)}
          </Button>
          <Link
            className="react-aria-Button primary"
            labelPosition="right"
            icon
            href="/++api++/@subscriptions-csv"
            download="subscriptions.csv"
          >
            {intl.formatMessage(messages.download_list)}
            <i className="icon">
              <Icon name={downloadSVG} size="20px" />
            </i>
          </Link>
          <Button
            className="react-aria-Button primary"
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
      </Menu>
      {showModalAdd && (
        <ModalAddSubscription
          showModal={showModalAdd}
          setShowModal={setShowModalAdd}
          onClose={doSearch}
        />
      )}
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
