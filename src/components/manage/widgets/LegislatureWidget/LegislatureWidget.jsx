import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Icon, Grid, Menu, Form, Button, Segment } from 'semantic-ui-react';
import LegislaturaConfiguration from './LegislaturaConfiguration';
import {
  usePreventClick,
  usePreventEnterCapture,
} from 'volto-ufficiostampa/helpers/widgetHooks';
import './legislature-widget.css';

const messages = defineMessages({
  no_items: {
    id: 'legislature-widget_no_items',
    defaultMessage: 'Nessuna legislatura',
  },
  legislatura_selection: {
    id: 'legislature-widget_item_selection',
    defaultMessage: 'Seleziona la legislatura',
  },
  no_title: {
    id: 'legislature-widget_no_title',
    defaultMessage: 'Senza titolo',
  },
  moveItemUp: {
    id: 'legislature-widget_moveItemUp',
    defaultMessage: 'Sposta prima',
  },
  moveItemDown: {
    id: 'legislature-widget_moveItemDown',
    defaultMessage: 'Sposta dopo',
  },
  addItem: {
    id: 'legislature-widget_addItem',
    defaultMessage: 'Aggiungi una legislatura',
  },
  item_content: {
    id: 'legislature-widget_item_content',
    defaultMessage: 'Dati della legislatura',
  },
  noActiveItem: {
    id: 'legislature-widget_no_active_items',
    defaultMessage: 'Nessuna legislatura selezionata.',
  },
});
const defaultItem = {
  legislature: '',
  arguments: [],
};
const LegislatureWidget = ({
  value,
  id,
  onChange,
  required,
  title,
  description,
}) => {
  const intl = useIntl();
  usePreventClick('.legislature-widget .ui.vertical.menu');

  const [items, setItems] = useState(JSON.parse(value) ?? [defaultItem]);
  const [activeItem, setActiveItem] = useState(0);

  const handleChange = (v) => {
    setItems(v);
    onChange(id, JSON.stringify(v));
  };

  const addItem = (e) => {
    e?.preventDefault();
    const new_items = [...items, defaultItem];
    setItems(new_items);
    setActiveItem(new_items.length - 1);
  };

  const removeItem = (e, index) => {
    e.preventDefault();
    let new_items = [...items];
    new_items.splice(index, 1);

    if (activeItem === index) {
      setTimeout(() => setActiveItem(index > 0 ? index - 1 : 0), 0);
    }

    handleChange(new_items);
  };

  const moveItem = (e, index, direction) => {
    e.preventDefault();
    const up = direction === 'up';
    let new_items = [...items];

    let item = new_items[index];
    new_items.splice(index, 1);
    new_items.splice(index + (up ? -1 : 1), 0, item);

    handleChange(new_items);
  };

  return (
    <div>
      <Form.Field inline id={id}>
        <Grid>
          <Grid.Row>
            <Grid.Column width="12">
              <div className="wrapper">
                <label htmlFor="legislature">{title}</label>
              </div>
            </Grid.Column>
          </Grid.Row>
          {description && (
            <Grid.Row>
              <Grid.Column stretched width="12">
                <p className="help">{description}</p>
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row>
            <Grid.Column width="12" className="legislature-widget">
              <div id="legislature">
                <Segment>
                  <Grid>
                    <Grid.Column width={4}>
                      <Menu
                        fluid
                        vertical
                        tabular
                        className="legislature-menu"
                        role="region"
                        aria-label={intl.formatMessage(
                          messages.legislatura_selection,
                        )}
                      >
                        {items?.map((item, idx) => {
                          const itemTitle =
                            item.legislature?.length > 0
                              ? item.legislature
                              : intl.formatMessage(messages.no_title);
                          return (
                            <Menu.Item
                              key={`index-item-${idx}`}
                              name={itemTitle}
                              active={activeItem === idx}
                              onClick={() => setActiveItem(idx)}
                              aria-controls={'index-config-content'}
                              as="button"
                              aria-expanded={activeItem === idx}
                              aria-label={itemTitle}
                            >
                              <Button.Group
                                vertical
                                className="move-buttons"
                                key={`index-item-${idx}-buttons`}
                                id={`index-item-${idx}-buttons`}
                                name={item.title}
                                active={activeItem === idx}
                                onClick={() => setActiveItem(idx)}
                                aria-label={itemTitle}
                              >
                                <Button
                                  disabled={idx === 0}
                                  size="tiny"
                                  icon={<Icon name="arrow left" />}
                                  title={intl.formatMessage(
                                    messages.moveItemUp,
                                  )}
                                  onClick={(e) => moveItem(e, idx, 'up')}
                                  role="button"
                                />
                                <Button
                                  disabled={idx === items.length - 1}
                                  size="tiny"
                                  icon={<Icon name="arrow right" />}
                                  title={intl.formatMessage(
                                    messages.moveItemDown,
                                  )}
                                  onClick={(e) =>
                                    moveItem(e, activeFooter, idx, 'down')
                                  }
                                  role="button"
                                />
                              </Button.Group>
                              <span>{itemTitle}</span>
                            </Menu.Item>
                          );
                        })}
                        <Menu.Item
                          as="button"
                          name={intl.formatMessage(messages.addItem)}
                          aria-label={intl.formatMessage(messages.addItem)}
                          onClick={(e) => addItem(e)}
                        >
                          <Icon name="plus" />
                        </Menu.Item>
                      </Menu>
                    </Grid.Column>
                    <Grid.Column stretched width={8}>
                      <div
                        id="index-config-content"
                        role="region"
                        aria-label={intl.formatMessage(messages.item_content)}
                      >
                        {items.length && items[activeItem] ? (
                          <LegislaturaConfiguration
                            key={'legislatura-configuration' + activeItem}
                            index={activeItem}
                            item={items[activeItem]}
                            onChange={(el) => {
                              let new_items = [...items];
                              new_items[activeItem] = el;

                              handleChange(new_items);
                            }}
                            deleteItem={(e) => removeItem(e, activeItem)}
                          />
                        ) : (
                          <span>
                            {intl.formatMessage(messages.noActiveItem)}
                          </span>
                        )}
                      </div>
                    </Grid.Column>
                  </Grid>
                  {items.length === 0 && (
                    <span>{intl.formatMessage(messages.no_items)}</span>
                  )}
                </Segment>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form.Field>
    </div>
  );
};

export default LegislatureWidget;
