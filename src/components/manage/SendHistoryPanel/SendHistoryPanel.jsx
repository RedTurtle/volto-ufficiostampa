import {
  Icon as IconNext,
  Pagination,
  Toolbar,
  Unauthorized
} from '@plone/volto/components';
import { BodyClass, Helmet, getBaseUrl } from '@plone/volto/helpers';
import backSVG from '@plone/volto/icons/back.svg';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  Segment,
  Table
} from 'semantic-ui-react';
import {
  getSendHistory
} from '../../../actions';
import ModalDelete from './ModalDelete';
import messages from './messages';

import '@plone/components/src/styles/basic/Button.css';
import '@plone/components/src/styles/basic/Dialog.css';
import '@plone/components/src/styles/basic/Form.css';
import '@plone/components/src/styles/basic/Modal.css';
import '../modals.css';
// import './send-history-panel.css';

const SendHistoryPanel = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  const [showModalDelete, setShowModalDelete] = useState(false);

  const [itemsSelected, setItemsSelected] = useState([]);

  // search/filter
  const [selectedChannel, setSelectedChannel] = useState(null);
  // const [searchableText, setSearchableText] = useState('');
  // const [text, setText] = useState('');
  const [b_size, setB_size] = useState(50);
  const [currentPage, setCurrentPage] = useState(0);

  const history = useSelector((state) => state.getSendHistory);
  // const deleteSendHistoryState = useSelector(
  //   (state) => state?.deleteSendHistory,
  // );
  
  const isUnauthorized = useMemo(
    () => history?.error?.status === 401,
    [history?.error],
  );

  // const deleteSendHistoryEnd = deleteSendHistoryState?.loaded;

  const doSearch = useCallback(() => {
    return dispatch(
      getSendHistory({
        b_size: isNaN(b_size) ? 10000000 : b_size,
        b_start: currentPage * (isNaN(b_size) ? 10000000 : b_size),
        channels: selectedChannel,
        // text: text && text.length > 0 ? text : null,
      }),
    );
  }, [dispatch, b_size, currentPage, selectedChannel]);

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     setText(searchableText);
  //   }, 1200);
  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchableText]);

  // load initial data
  useEffect(() => {
    doSearch();
  }, [doSearch]);

  // TODO: remove await/async
  // const resetSelectedSendHistory = async () => {
  //   // eslint-disable-next-line no-unused-expressions
  //   try {

  //     await dispatch(deleteSendHistory({ uids: itemsSelected }));
  //     setShowConfirmDelete(false);
  //     toastify.toast.success(
  //       <Toast
  //         success
  //         title={intl.formatMessage(messages.success)}
  //         content={intl.formatMessage(messages.delete_success)}
  //       />,
  //     );
  //   } catch (e) {
  //     console.error(e);
  //     toastify.toast.error(
  //       <Toast
  //         error
  //         title={intl.formatMessage(messages.error)}
  //         content={intl.formatMessage(messages.delete_error, {
  //           element: e?.item?.title ?? '',
  //         })}
  //       />,
  //     );
  //   }
  // };

  // useEffect(() => {
  //   if (deleteSendHistoryEnd) {
  //     doSearch().then(() => {
  //       setItemsSelected([]);
  //     });
  //     dispatch(resetDeleteSendHistory());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [deleteSendHistoryEnd]);

  // const getItemStatus = (item) => {
  //   if (item.running) {
  //     return intl.formatMessage(messages.statusInProgress);
  //   }
  //   return item.completed
  //     ? intl.formatMessage(messages.statusSent)
  //     : intl.formatMessage(messages.statusError);
  // };

  const totResults = history.result?.items_total || 0;

  return   isUnauthorized ?
   <Unauthorized />
  :

(
    <>
      <BodyClass className="newsletter-management" />
      <Container id="page-send-history" className="controlpanel-send-history">
        <Helmet
          title={intl.formatMessage(messages.send_history_controlpanel)}
        />
        <Segment.Group raised>
          <Segment className="primary">
            {intl.formatMessage(messages.send_history_controlpanel)}
          </Segment>

          <Segment>
            {/* {history.result?.items ? (
              <p>
                {searchableText.length
                  ? intl.formatMessage(messages.tot_filtered, { totResults })
                  : intl.formatMessage(messages.tot_unfiltered, { totResults })}
              </p>
            ) : (
              ''
            )} */}
            {/* {itemsSelected.length > 0 && (
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
                    {intl.formatMessage(messages.delete_send_history)}
                  </Button>
                </div>
              </Message>
            )} */}
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
                    history?.result?.channels?.map((c) => ({
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
            <Table selectable compact singleLine attached fixed striped>
              <Table.Header>
                <Table.Row>
                  {/* <Table.HeaderCell
                    width={1}
                    textAlign="center"
                    verticalAlign="middle"
                  >
                    <Checkbox
                      title={intl.formatMessage(messages.select_all)}
                      checked={
                        history?.result?.items?.length !== 0 &&
                        itemsSelected?.length === history?.result?.items?.length
                      }
                      onChange={(e, o) => {
                        if (o.checked) {
                          // TODO: attenzione che in paginazione vengono filtrati solo
                          // quelli visibili
                          setItemsSelected(history?.result?.items);
                        } else {
                          setItemsSelected([]);
                        }
                      }}
                    />
                  </Table.HeaderCell> */}
                  <Table.HeaderCell width={6}>
                    {intl.formatMessage(messages.message)}
                  </Table.HeaderCell>
                  <Table.HeaderCell width={2}>
                    {intl.formatMessage(messages.channels)}
                  </Table.HeaderCell>
                  <Table.HeaderCell width={3}>
                    {intl.formatMessage(messages.start_send)}
                  </Table.HeaderCell>
                  <Table.HeaderCell width={3}>
                    {intl.formatMessage(messages.end_send)}
                  </Table.HeaderCell>
                  <Table.HeaderCell width={2}>
                    {intl.formatMessage(messages.status)}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {history?.loaded &&
                  history.result?.items?.map((item, i) => (
                    <Table.Row key={item.uid}>
                      {/* <Table.Cell textAlign="center">
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
                      </Table.Cell> */}
                      <Table.Cell>
                        <a href={item.url} title={item.title}>{item.title}</a>
                      </Table.Cell>
                      <Table.Cell>
                        {item.channels && item.channels.join(', ')}
                      </Table.Cell>
                      <Table.Cell>
                        {item.date}
                      </Table.Cell>
                      <Table.Cell>
                        {item.completed_date}
                      </Table.Cell>
                      <Table.Cell>{item.status}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
            {history?.loading && <Loader active inline="centered" />}
            {history?.result?.items?.length === 0 && (
              <div className="no-results">
                {intl.formatMessage(messages.no_results)}
              </div>
            )}

            <div className="contents-pagination">
              <Pagination
                current={currentPage}
                total={Math.ceil(history?.result?.items_total / b_size)}
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

        {/* {showConfirmDelete && (
          <Modal
            className="react-aria-Modal newsletter-modal"
            isDismissable
            isOpen={showConfirmDelete}
            onOpenChange={() => setShowConfirmDelete(showConfirmDelete)}
          >
            <Dialog>
              <div className="modal-header">
                <Heading>
                  {intl.formatMessage(messages.confirm_delete_selected)}
                </Heading>
                <div className="close">
                  <Button onPress={() => setShowConfirmDelete(false)}>X</Button>
                </div>
              </div>

              <div className="form-action">
                <Button
                  onClick={resetSelectedSendHistory}
                  className="react-aria-Button primary"
                >
                  {intl.formatMessage(messages.confirm)}
                </Button>
                <Button
                  className="react-aria-Button cancel"
                  onClick={() => setShowConfirmDelete(false)}
                >
                  {intl.formatMessage(messages.cancel)}
                </Button>
              </div>
            </Dialog>
          </Modal>         
          )}
          */}
      </Container>
      {__CLIENT__ &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <Link to={`${getBaseUrl(pathname)}`} className="item">
                <IconNext
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
//         const pathname = location.pathname.replace('/send-history', '');
//         const content = await dispatch(getContent(getBaseUrl(pathname)));
//         return content;
//       },
//     },
//   ]),
// )(SendHistoryPanel);

export default SendHistoryPanel;
