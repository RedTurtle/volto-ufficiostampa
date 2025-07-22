import {
  Icon as IconNext,
  Pagination,
  Toolbar,
  Unauthorized,
} from '@plone/volto/components';
import { BodyClass, Helmet, getBaseUrl } from '@plone/volto/helpers';
import backSVG from '@plone/volto/icons/back.svg';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  Container,
  Dropdown,
  Form,
  FormField,
  Loader,
  Segment,
  Table,
  Popup,
} from 'semantic-ui-react';
import { getSendHistory } from '../../../actions';
import ModalDelete from './ModalDelete';
import messages from './messages';
import SendHistoryPanelMenu from './SendHistoryPanelMenu';

import '@plone/components/src/styles/basic/Button.css';
import '@plone/components/src/styles/basic/Dialog.css';
import '@plone/components/src/styles/basic/Form.css';
import '@plone/components/src/styles/basic/Modal.css';
import '@plone/components/src/styles/basic/ComboBox.css';
import '../modals.css';
import './send-history-panel.css';

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

  // load initial data
  useEffect(() => {
    doSearch();
  }, [doSearch]);

  const totResults = history.result?.items_total || 0;

  return isUnauthorized ? (
    <Unauthorized />
  ) : (
    <>
      <BodyClass className="ufficiostampa-management" />
      <Container id="page-send-history" className="controlpanel-send-history">
        <Helmet
          title={intl.formatMessage(messages.send_history_controlpanel)}
        />
        <Segment.Group raised>
          <Segment className="primary">
            {intl.formatMessage(messages.send_history_controlpanel)}
          </Segment>
          <SendHistoryPanelMenu doSearch={doSearch} />
          <Segment>
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
            </Form>
            <Table selectable compact singleLine attached fixed striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={1}>
                    {intl.formatMessage(messages.status)}
                  </Table.HeaderCell>
                  <Table.HeaderCell width={1}>
                    {intl.formatMessage(messages.comunicato_type)}
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
                    {intl.formatMessage(messages.comunicato_recipients)}
                  </Table.HeaderCell>
                  <Table.HeaderCell width={2}>
                    {intl.formatMessage(messages.comunicato_number)}
                  </Table.HeaderCell>
                  <Table.HeaderCell width={6}>
                    {intl.formatMessage(messages.comunicato_title)}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {history?.loaded &&
                  history.result?.items?.map((item, i) => {
                    const statusLabel = `{intl.formatMessage(messages.status)}: {intl.formatMessage(messages[item.status])}`;
                    let popupMessage = '';
                    switch (item.status) {
                      case 'success':
                        popupMessage = intl.formatMessage(
                          messages.status_message_success,
                          { recipients: item.recipients },
                        );
                        break;
                      case 'sending':
                        popupMessage = intl.formatMessage(
                          messages.status_message_sending,
                          { recipients: item.recipients },
                        );
                        break;
                      case 'error':
                        popupMessage = item.status_message;
                      default:
                        break;
                    }
                    return (
                      <Table.Row key={item.uid}>
                        <Table.Cell
                          className="history-status"
                          textAlign="center"
                        >
                          <Popup
                            content={popupMessage}
                            position="right center"
                            wide="very"
                            mouseLeaveDelay={500}
                            key={item.id}
                            header={intl.formatMessage(
                              messages.status_message_header,
                            )}
                            trigger={
                              <span
                                className={item.status}
                                aria-label={statusLabel}
                                role="status"
                              ></span>
                            }
                          />
                        </Table.Cell>
                        <Table.Cell>{item.type}</Table.Cell>
                        <Table.Cell>
                          {item.channels && item.channels.join(', ')}
                        </Table.Cell>
                        <Table.Cell>{item.date}</Table.Cell>
                        <Table.Cell>{item.completed_date}</Table.Cell>
                        <Table.Cell>{item.recipients}</Table.Cell>
                        <Table.Cell>{item.number}</Table.Cell>
                        <Table.Cell>
                          <a href={item.url} title={item.title}>
                            {item.title}
                          </a>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
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
