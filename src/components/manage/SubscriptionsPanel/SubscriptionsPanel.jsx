import {
  Icon,
  Pagination,
  Toolbar,
  Unauthorized,
} from '@plone/volto/components';
import { BodyClass, getBaseUrl, Helmet } from '@plone/volto/helpers';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-aria-components';
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
  Loader,
  Message,
  Segment,
  Table,
} from 'semantic-ui-react';
import { getSubscriptions } from '../../../actions';
import messages from './messages';
import SubscriptionsPanelMenu from './SubscriptionsPanelMenu';

import backSVG from '@plone/volto/icons/back.svg';
import ModalDelete from './ModalDelete';
// import './subscriptions-panel.css';
import '@plone/components/src/styles/basic/Button.css';
import '@plone/components/src/styles/basic/Dialog.css';
import '@plone/components/src/styles/basic/Form.css';
import '@plone/components/src/styles/basic/Modal.css';
import '../modals.css';

const SubscriptionsPanel = ({ toastify }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const subscriptions = useSelector((state) => state.getSubscriptions);
  const [b_size, setB_size] = useState(50);
  const [currentPage, setCurrentPage] = useState(0);
  // const [searchableText, setSearchableText] = useState('');
  // const [text, setText] = useState('');
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [itemsSelected, setItemsSelected] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     setText(searchableText);
  //     // Send Axios request here
  //   }, 1200);
  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchableText]);

  const isUnauthorized = useMemo(
    () => subscriptions?.error?.status === 401,
    [subscriptions?.error],
  );

  const doSearch = () => {
    return dispatch(
      getSubscriptions({
        channels: selectedChannel,
        b_size: isNaN(b_size) ? 10000000 : b_size,
        b_start: currentPage * (isNaN(b_size) ? 10000000 : b_size),
        // text: text && text.length > 0 ? text : null,
      }),
    );
  };

  useEffect(() => {
    doSearch();
  }, [b_size, currentPage, selectedChannel]);

  // const resetSelectedSubscriptions = async () => {
  //   // eslint-disable-next-line no-unused-expressions
  //   try {
  //     await dispatch(deleteSubscriptions({ email: itemsSelected }));
  //     setShowModalDelete(false);
  //     toastify.toast.success(
  //       <Toast
  //         success
  //         title={intl.formatMessage(messages.success)}
  //         content={intl.formatMessage(messages.delete_subscriptions_success)}
  //       />,
  //     );
  //   } catch (e) {
  //     toastify.toast.error(
  //       <Toast
  //         error
  //         title={intl.formatMessage(messages.error)}
  //         content={intl.formatMessage(messages.delete_subscriptions_error, {
  //           element: e?.item?.title ?? '',
  //         })}
  //       />,
  //     );
  //   }
  // };

  // useEffect(() => {
  //   if (deleteSubscriptionsEnd) {
  //     doSearch().then(() => {
  //       setItemsSelected([]);
  //     });
  //     dispatch(resetDeleteSubscriptions());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [deleteSubscriptionsEnd]);

  // const totResults =
  //   subscriptions && subscriptions.result?.items_total
  //     ? subscriptions.result?.items_total
  //     : 0;

  return isUnauthorized ? (
    <Unauthorized />
  ) : (
    <>
      <BodyClass className="newsletter-management" />
      <Container id="page-subscriptions" className="controlpanel-subscriptions">
        <Helmet
          title={intl.formatMessage(messages.subscriptions_controlpanel)}
        />
        <Segment.Group raised>
          <Segment className="primary">
            {intl.formatMessage(messages.subscriptions_controlpanel)}
          </Segment>

          <SubscriptionsPanelMenu doSearch={doSearch} />

          <Segment>
            {itemsSelected.length > 0 && (
              <Message className="selected-items" color="teal">
                <div className="text">
                  {itemsSelected?.length}{' '}
                  {intl.formatMessage(messages.items_selected)}
                </div>
                <div className="actions">
                  <Button
                    type="button"
                    className="react-aria-Button cancel"
                    onClick={() => setShowModalDelete(true)}
                  >
                    {intl.formatMessage(messages.delete_subscriptions)}
                  </Button>
                </div>
              </Message>
            )}
            <Form className="search-form">
              <FormField>
                <label>{intl.formatMessage(messages.channels)}</label>
                <Dropdown
                  placeholder={intl.formatMessage(messages.selectChannel)}
                  fluid
                  selection
                  onChange={(event, data) => {
                    setSelectedChannel(data.value);
                  }}
                  options={[{ key: 'all', text: 'All', value: null }].concat(
                    subscriptions?.result?.channels?.map((c) => ({
                      key: c,
                      text: c,
                      value: c,
                    })) || [],
                  )}
                />
              </FormField>
              {/* <Input
                fluid
                icon="search"
                value={searchableText}
                onChange={(e) => {
                  setSearchableText(e.target.value);
                }}
                placeholder={intl.formatMessage(messages.filter_title)}
              /> */}
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
            <Table selectable compact singleLine attached fixed striped>
              <Table.Header>
                <Table.Row>
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
                  <Table.HeaderCell width={4}>
                    {intl.formatMessage(messages.email)}
                  </Table.HeaderCell>
                  <Table.HeaderCell width={4}>
                    {intl.formatMessage(messages.channels)}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={3}>
                    {intl.formatMessage(messages.creation_date)}
                  </Table.HeaderCell>
                  {/* <Table.HeaderCell textAlign="center" width={3}>
                    {intl.formatMessage(messages.state)}
                  </Table.HeaderCell> */}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {subscriptions?.loaded &&
                  subscriptions.result?.items?.map((item, i) => (
                    <tr key={`subscription-${item.id}`}>
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
                      <Table.Cell>{item.email}</Table.Cell>
                      <Table.Cell>
                        {item.channels && item.channels.join(', ')}
                      </Table.Cell>
                      <Table.Cell>{item.date}</Table.Cell>
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
        {showModalDelete && (
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

// export default compose(
//   injectLazyLibs(['toastify']),
//   asyncConnect([
//     {
//       key: 'content',
//       promise: async ({ location, store: { dispatch } }) => {
//         const pathname = location.pathname.replace('/subscriptions', '');
//         const content = await dispatch(getContent(getBaseUrl(pathname)));
//         return content;
//       },
//     },
//   ]),
// )(SubscriptionsPanel);

export default SubscriptionsPanel;
