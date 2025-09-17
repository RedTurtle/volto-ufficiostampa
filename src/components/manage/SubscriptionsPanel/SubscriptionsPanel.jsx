import {
  Icon,
  Pagination,
  Toolbar,
  Unauthorized,
} from '@plone/volto/components';
import { BodyClass, getBaseUrl, Helmet } from '@plone/volto/helpers';
import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  Checkbox,
  Container,
  Dropdown,
  Form,
  FormField,
  FormGroup,
  Loader,
  Message,
  Segment,
  Table,
  Input,
  Button,
} from 'semantic-ui-react';
import { getSubscriptions } from 'volto-ufficiostampa/actions';
import messages from './messages';
import SubscriptionsPanelMenu from './SubscriptionsPanelMenu';
import ModalAddSubscription from './ModalAddSubscription';
import ModalDelete from './ModalDelete';

import backSVG from '@plone/volto/icons/back.svg';
import editingSVG from '@plone/volto/icons/editing.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

import './subscriptions-panel.css';
import '../modals.css';

const SubscriptionsPanel = ({ toastify }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const subscriptions = useSelector((state) => state.getSubscriptions);
  const [b_size, setB_size] = useState(50);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [searchableText, setSearchableText] = useState('');
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [itemsSelected, setItemsSelected] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      doSearch();
    }, 1200);
    return () => clearTimeout(delayDebounceFn);
  }, [searchableText]);

  const isUnauthorized = useMemo(
    () => subscriptions?.error?.status === 401,
    [subscriptions?.error],
  );

  const doSearch = () => {
    const text =
      searchableText && searchableText.length > 0 ? searchableText : '';
    const options = {
      channels: selectedChannel,
      b_size: isNaN(b_size) ? 10000000 : b_size,
      b_start: currentPage * (isNaN(b_size) ? 10000000 : b_size),
    };
    if (text.length) {
      options.text = text;
    }
    return dispatch(getSubscriptions(options));
  };

  useEffect(() => {
    doSearch();
  }, [b_size, currentPage, selectedChannel]);

  const canManage = subscriptions?.result?.permissions?.can_manage || false;

  return isUnauthorized ? (
    <Unauthorized />
  ) : (
    <>
      <BodyClass className="ufficiostampa-management" />
      <Container
        fluid
        id="page-subscriptions"
        className="controlpanel-subscriptions"
      >
        <Helmet
          title={intl.formatMessage(messages.subscriptions_controlpanel)}
        />
        <Segment.Group raised>
          <Segment className="primary">
            {intl.formatMessage(messages.subscriptions_controlpanel)}
          </Segment>

          {canManage && <SubscriptionsPanelMenu doSearch={doSearch} />}

          <Segment>
            {itemsSelected.length > 0 && (
              <Message className="selected-items" color="teal">
                <div className="text">
                  {itemsSelected?.length}{' '}
                  {itemsSelected?.length === 1
                    ? intl.formatMessage(messages.single_item_selected)
                    : intl.formatMessage(messages.items_selected)}
                </div>
                <div className="actions ms-auto">
                  <Button
                    type="button"
                    color="red"
                    icon
                    labelPosition="right"
                    onClick={() => setShowModalDelete(true)}
                  >
                    {intl.formatMessage(messages.delete_subscriptions)}
                    <i className="icon">
                      <Icon name={trashSVG} size="20px" />
                    </i>
                  </Button>
                </div>
              </Message>
            )}
            <Form className="search-form">
              <FormGroup>
                <FormField width={7}>
                  <Input
                    fluid
                    icon="search"
                    value={searchableText}
                    onChange={(e) => {
                      setSearchableText(e.target.value);
                    }}
                    placeholder={intl.formatMessage(
                      messages.filter_subscriptions,
                    )}
                  />
                </FormField>
                <FormField width={5}>
                  <Dropdown
                    placeholder={intl.formatMessage(messages.selectChannel)}
                    fluid
                    selection
                    onChange={(event, data) => {
                      setSelectedChannel(data.value);
                    }}
                    options={[
                      {
                        key: 'all',
                        text: intl.formatMessage(messages.all),
                        value: null,
                      },
                    ].concat(
                      subscriptions?.result?.channels?.map((c) => ({
                        key: c,
                        text: c,
                        value: c,
                      })) || [],
                    )}
                  />
                </FormField>
              </FormGroup>
            </Form>
            {/* {subscriptions.result?.items ? (
              <p>
                {searchableText.length
                  ? intl.formatMessage(messages.tot_filtered, { totResults })
                  : intl.formatMessage(messages.tot_unfiltered, { totResults })}
              </p>
            ) : (
              ''
            )} */}
          </Segment>
          <Segment>
            <Table
              selectable
              compact
              singleLine
              attached
              fixed
              striped
              className="controlpanel-table"
            >
              <Table.Header>
                <Table.Row>
                  {canManage && (
                    <Table.HeaderCell
                      width={1}
                      textAlign="center"
                      verticalAlign="middle"
                    >
                      <Checkbox
                        title={intl.formatMessage(messages.select_all)}
                        checked={
                          subscriptions?.result?.items?.length !== 0 &&
                          itemsSelected?.length ===
                            subscriptions?.result?.items?.length
                        }
                        onChange={(e, o) => {
                          if (o.checked) {
                            // TODO: attenzione che in paginazione vengono filtrati solo
                            // quelli visibili
                            setItemsSelected(subscriptions?.result?.items);
                          } else {
                            setItemsSelected([]);
                          }
                        }}
                      />
                    </Table.HeaderCell>
                  )}
                  <Table.HeaderCell width={4}>
                    {intl.formatMessage(messages.name_label)}
                  </Table.HeaderCell>
                  <Table.HeaderCell width={4}>
                    {intl.formatMessage(messages.surname_label)}
                  </Table.HeaderCell>
                  <Table.HeaderCell width={4}>
                    {intl.formatMessage(messages.email_label)}
                  </Table.HeaderCell>
                  <Table.HeaderCell width={3}>
                    {intl.formatMessage(messages.phone_label)}
                  </Table.HeaderCell>
                  <Table.HeaderCell width={5}>
                    {intl.formatMessage(messages.newspaper_label)}
                  </Table.HeaderCell>
                  {canManage && <Table.HeaderCell width={2}></Table.HeaderCell>}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {subscriptions?.loaded &&
                  subscriptions.result?.items?.map((item, i) => (
                    <tr key={`subscription-${item.id}`}>
                      {canManage && (
                        <Table.Cell textAlign="center">
                          <Checkbox
                            title={intl.formatMessage(messages.select_item)}
                            checked={itemsSelected.includes(item)}
                            onChange={(e, o) => {
                              if (o.checked) {
                                itemsSelected.includes(item) ||
                                  setItemsSelected([item, ...itemsSelected]);
                              } else {
                                setItemsSelected(
                                  itemsSelected.includes(item) &&
                                    itemsSelected.filter((i) => i !== item),
                                );
                              }
                            }}
                          />
                        </Table.Cell>
                      )}
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.surname}</Table.Cell>
                      <Table.Cell>{item.email}</Table.Cell>
                      <Table.Cell>{item.phone}</Table.Cell>
                      <Table.Cell>{item.newspaper}</Table.Cell>
                      {canManage && (
                        <Table.Cell>
                          <Button
                            color="primary"
                            icon
                            onClick={() => {
                              setShowModalAdd(true);
                              setModalData(item);
                            }}
                          >
                            <i className="icon">
                              <Icon name={editingSVG} size="20px" />
                            </i>
                          </Button>
                          )
                        </Table.Cell>
                      )}
                      {/* <Table.Cell>
                        {item.is_active
                          ? intl.formatMessage(
                              messages.subscription_state_active,
                            )
                          : intl.formatMessage(
                              messages.subscription_state_inactive,
                            )}
                      </Table.Cell> */}
                    </tr>
                  ))}
              </Table.Body>
            </Table>
            {subscriptions?.loading && <Loader active inline="centered" />}
            {subscriptions?.result?.items?.length === 0 && (
              <div className="no-results">
                {intl.formatMessage(messages.no_results)}
              </div>
            )}

            <div className="contents-pagination">
              <Pagination
                current={currentPage}
                total={Math.ceil(subscriptions?.result?.items_total / b_size)}
                pageSize={b_size}
                pageSizes={[50, intl.formatMessage(messages.all)]}
                onChangePage={(e, p) => {
                  setCurrentPage(p.value);
                }}
                onChangePageSize={(e, s) => setB_size(s.value)}
              />
            </div>
          </Segment>
        </Segment.Group>
        {canManage && showModalAdd && (
          <ModalAddSubscription
            showModal={showModalAdd}
            setShowModal={setShowModalAdd}
            onClose={doSearch}
            data={modalData}
          />
        )}
        {canManage && showModalDelete && (
          <ModalDelete
            onClose={doSearch}
            items={itemsSelected}
            setItems={setItemsSelected}
            showModal={showModalDelete}
            setShowModal={setShowModalDelete}
          />
        )}
      </Container>
      {__CLIENT__ &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <Link to={`${getBaseUrl(pathname)}`} className="item">
                <Icon
                  name={backSVG}
                  className="contents circled"
                  size="30px"
                  title={intl.formatMessage(messages.back)}
                />
              </Link>
            }
          />,
          document.getElementById('toolbar'),
        )}
    </>
  );
};

export default SubscriptionsPanel;
