import { Toast } from '@plone/volto/components';
import { Icon } from '@plone/volto/components';
import { Plug } from '@plone/volto/components/manage/Pluggable';
import { flattenToAppURL } from '@plone/volto/helpers';
import rightArrowSVG from '@plone/volto/icons/right-key.svg';
import { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { convertToNews, resetConvertToNews } from '../../actions';
import config from '@plone/volto/registry';

const messages = defineMessages({
  convert_to_news: {
    id: 'ufficiostampa_convert_to_news_label',
    defaultMessage: 'Crea notizia',
  },
  success_title: {
    id: 'ufficiostampa_convert_to_news_success_title',
    defaultMessage: 'Notizia creata',
  },
  success_text: {
    id: 'ufficiostampa_convert_to_news_success_text',
    defaultMessage: 'La notizia è stata creata con successo.',
  },
  error_title: {
    id: 'ufficiostampa_convert_to_news_error_title',
    defaultMessage: 'Errore',
  },
  error_text: {
    id: 'ufficiostampa_convert_to_news_error_text',
    defaultMessage:
      'Si è verificato un errore durante la creazione della notizia.',
  },
});

const COMUNICATO_TYPES = ['ComunicatoStampa', 'InvitoStampa'];

const SendMenu = (props) => {
  const { content } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const convertStatus = useSelector((state) => state?.convertToNews);

  const actionIds = [
    'ufficiostampa-channels-management',
    'ufficiostampa-history-management',
    'ufficiostampa-send',
  ];

  const actions = content?.['@components']?.actions?.object || [];
  const filteredActions = actionIds
    .map((id) => actions.find((action) => action.id === id))
    .filter(Boolean);

  const isComunicato = COMUNICATO_TYPES.includes(content?.['@type']);

  useEffect(() => {
    if (!convertStatus?.loaded) return;
    if (!convertStatus?.error) {
      toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.success_title)}
          content={intl.formatMessage(messages.success_text)}
        />,
      );
      dispatch(resetConvertToNews());
      window.location.href = convertStatus?.result?.url;
    } else {
      toast.error(
        <Toast
          error
          title={intl.formatMessage(messages.error_title)}
          content={
            convertStatus?.error.response.body.message ||
            intl.formatMessage(messages.error_text)
          }
        />,
      );
      dispatch(resetConvertToNews());
    }
  }, [convertStatus?.loaded, convertStatus?.error]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {filteredActions.map((action) => {
        return (
          <Plug
            pluggable="toolbar-more-manage-content"
            key={action.id}
            id={action.id}
          >
            <li>
              <Link
                to={flattenToAppURL(action.url)}
                target={action.id !== 'ufficiostampa-send' ? '_blank' : ''}
              >
                <div>
                  <span className="pastanaga-menu-label">{action.title}</span>
                  <span className="pastanaga-menu-value" />
                </div>
                <Icon name={rightArrowSVG} size="24px" />
              </Link>
            </li>
          </Plug>
        );
      })}
      {isComunicato && config.settings.UfficioStampa?.convertToNews && (
        <Plug
          pluggable="toolbar-more-manage-content"
          id="ufficiostampa-convert-to-news"
        >
          <li>
            <button
              className="ufficiostampa-toolbar-action"
              onClick={() =>
                dispatch(convertToNews(flattenToAppURL(content['@id'])))
              }
            >
              <div>
                <span className="pastanaga-menu-label">
                  {intl.formatMessage(messages.convert_to_news)}
                </span>
                <span className="pastanaga-menu-value" />
              </div>
              <Icon name={rightArrowSVG} size="24px" />
            </button>
          </li>
        </Plug>
      )}
    </>
  );
};

export default SendMenu;
