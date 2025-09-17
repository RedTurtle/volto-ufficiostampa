import { Plug } from '@plone/volto/components/manage/Pluggable';
import { flattenToAppURL } from '@plone/volto/helpers';
import rightArrowSVG from '@plone/volto/icons/right-key.svg';
import { Link } from 'react-router-dom';
import { Icon } from '@plone/volto/components';

const SendMenu = (props) => {
  const { content } = props;
  const actionIds = [
    'ufficiostampa-channels-management',
    'ufficiostampa-history-management',
    'ufficiostampa-send',
  ];

  const actions = content?.['@components']?.actions?.object || [];
  const filteredActions = actionIds
    .map((id) => actions.find((action) => action.id === id))
    .filter(Boolean);

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
    </>
  );
};

export default SendMenu;
