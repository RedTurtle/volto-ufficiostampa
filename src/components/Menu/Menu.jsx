import { Plug } from '@plone/volto/components/manage/Pluggable';
import {
  flattenToAppURL,
  getBaseUrl,
  Helmet,
  tryParseJSON,
  usePrevious,
} from '@plone/volto/helpers';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  useIntl,
} from 'react-intl';
import rightArrowSVG from '@plone/volto/icons/right-key.svg';
import { Link } from 'react-router-dom';
import { Icon, TextWidget } from '@plone/volto/components';

const messages = defineMessages({
  sendComunicato: {
    id: 'sendComunicato',
    defaultMessage: 'Invia Comunicato Stampa',
  },
  manageChannels: {
    id: 'manageChannels',
    defaultMessage: 'Comunicati Stampa: Gestione Canali',
  },
  manageHistory: {
    id: 'manageHistory',
    defaultMessage: 'Comunicati Stampa: Storico Invio Comunicati',
  },
});

const SendMenu = (props) => {
  const { content, pathname, intl } = props;
  const path = getBaseUrl(pathname);
  return (
    content?.['@type'] === 'ComunicatoStampa' && (
      <>
        {/* // TODO: anzichè nasconderlo completamente sarebbe meglio disabilitarlo */}
        {content?.review_state === 'published' && (
          <Plug
            pluggable="toolbar-more-manage-content"
            id="send-comunicato-menu"
          >
            <li>
              <Link to={`${path}/@send-comunicato`}>
                <div>
                  <span className="pastanaga-menu-label">
                    {intl.formatMessage(messages.sendComunicato)}
                  </span>
                  <span className="pastanaga-menu-value" />
                </div>
                <Icon name={rightArrowSVG} size="24px" />
              </Link>
            </li>
          </Plug>
        )}
        {/* Questi controlpanel sarebbero a livello di sito e non di contenuto,
                sono messi anche tra i controlpanel, ma ripetuti qui, altrimenti chi non ha
                accesso ai controlpanel non avrebbe la url per arrivarci */}
        <Plug pluggable="toolbar-more-manage-content" id="manage-channels-menu">
          <li>
            <Link
              to={`/controlpanel/ufficiostampa-managechannels`}
              target="_blank"
            >
              <div>
                <span className="pastanaga-menu-label">
                  {intl.formatMessage(messages.manageChannels)}
                </span>
                <span className="pastanaga-menu-value" />
              </div>
              <Icon name={rightArrowSVG} size="24px" />
            </Link>
          </li>
        </Plug>
        <Plug pluggable="toolbar-more-manage-content" id="manage-history-menu">
          <li>
            <Link
              to={`/controlpanel/ufficiostampa-managehistory`}
              target="_blank"
            >
              <div>
                <span className="pastanaga-menu-label">
                  {intl.formatMessage(messages.manageHistory)}
                </span>
                <span className="pastanaga-menu-value" />
              </div>
              <Icon name={rightArrowSVG} size="24px" />
            </Link>
          </li>
        </Plug>
      </>
    )
  );
};

export default SendMenu;
