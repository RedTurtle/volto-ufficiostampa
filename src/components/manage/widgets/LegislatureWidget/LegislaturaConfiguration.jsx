import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button } from 'semantic-ui-react';
import TextWidget from '@plone/volto/components/manage/Widgets/TextWidget';
import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';
import ArrayWidget from '@plone/volto/components/manage/Widgets/ArrayWidget';

import { usePreventClick } from 'volto-ufficiostampa/helpers/widgetHooks';

const messages = defineMessages({
  deleteButton: {
    id: 'legislature-widget_delete_index',
    defaultMessage: 'Elimina legislatura',
  },
  legislature: {
    id: 'legislature-widget-legislature',
    defaultMessage: 'Legislatura',
  },
  arguments: {
    id: 'legislature-widget_arguments',
    defaultMessage: 'Argomenti',
  },
  arguments_placeholder: {
    id: 'legislature-widget_arguments_placeholder',
    defaultMessage: 'Inserisci gli argomenti...',
  },
});

const LegislaturaConfiguration = ({ item, index, onChange, deleteItem }) => {
  const intl = useIntl();

  usePreventClick('.index-configuration');

  const onChangeFormData = (id, value) => {
    onChange({ ...item, [id]: value });
  };

  return (
    <div className="index-configuration">
      <TextWidget
        id="legislature"
        title={intl.formatMessage(messages.legislature)}
        value={item.legislature}
        onChange={(f, v) => {
          onChangeFormData(f, v);
        }}
      />

      <ArrayWidget
        id="arguments"
        title={intl.formatMessage(messages.arguments)}
        value={item.arguments}
        onChange={(f, v) => {
          onChangeFormData(f, v);
        }}
        placeholder={intl.formatMessage(messages.arguments_placeholder)}
        creatable={true}
      />

      <div className="delete-item-wrapper">
        <Button
          icon="trash"
          onClick={deleteItem}
          className="delete-item"
          negative
          content={intl.formatMessage(messages.deleteButton)}
        />
      </div>
    </div>
  );
};

export default LegislaturaConfiguration;
