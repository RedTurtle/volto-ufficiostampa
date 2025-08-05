import {
  Icon as IconNext,
  Pagination,
  Toolbar,
  Unauthorized,
} from '@plone/volto/components';
import { BodyClass, Helmet, getBaseUrl } from '@plone/volto/helpers';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import backSVG from '@plone/volto/icons/back.svg';
import checkSVG from '@plone/volto/icons/check.svg';
import clockSVG from '@plone/volto/icons/clock.svg';
import exclamationSVG from '@plone/volto/icons/exclamation.svg';
import { createPortal } from 'react-dom';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';
import {
  Container,
  Dropdown,
  Form,
  FormGroup,
  FormField,
  Input,
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
  moment.locale(intl.locale);

  const [showModalDelete, setShowModalDelete] = useState(false);

  const [itemsSelected, setItemsSelected] = useState([]);

  // search/filter
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [searchableTitle, setSearchableTitle] = useState('');
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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      doSearch();
    }, 1200);
    return () => clearTimeout(delayDebounceFn);
  }, [searchableTitle]);

  const doSearch = () => {
    const title =
      searchableTitle && searchableTitle.length > 0 ? searchableTitle : '';
    const options = {
      channels: selectedChannel,
      type: selectedType,
      b_size: isNaN(b_size) ? 10000000 : b_size,
      b_start: currentPage * (isNaN(b_size) ? 10000000 : b_size),
    };
    if (title.length) {
      options.title = title + '*'; // add wildcard for search
    }
    return dispatch(getSendHistory(options));
  };

  useEffect(() => {
    doSearch();
  }, [b_size, currentPage, selectedChannel, selectedType]);

  const totResults = history.result?.items_total || 0;

  return isUnauthorized ? (
    <Unauthorized />
  ) : (
    <>
      <BodyClass className="ufficiostampa-management" />
      <Container
        fluid
        id="page-send-history"
        className="controlpanel-send-history"
      >
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
              <FormGroup>
                <FormField width={4}>
                  <Input
                    fluid
                    icon="search"
                    value={searchableTitle}
                    onChange={(e) => {
                      setSearchableTitle(e.target.value);
                    }}
                    placeholder={intl.formatMessage(messages.filter_title)}
                  />
                </FormField>
                <FormField width={4}>
                  <label>{intl.formatMessage(messages.channels)}</label>
                  <Dropdown
                    placeholder={intl.formatMessage(messages.selectChannel)}
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
                      history?.result?.channels?.map((c) => ({
                        key: c,
                        text: c,
                        value: c,
                      })) || [],
                    )}
                  />
                </FormField>
                <FormField width={4}>
                  <label>{intl.formatMessage(messages.portal_type)}</label>
                  <Dropdown
                    placeholder={intl.formatMessage(
                      messages.select_portal_type,
                    )}
                    selection
                    onChange={(event, data) => {
                      setSelectedType(data.value);
                    }}
                    options={[
                      {
                        key: 'all',
                        text: intl.formatMessage(messages.all),
                        value: null,
                      },
                      {
                        key: 'Comunicato Stampa',
                        text: 'Comunicato Stampa',
                        value: 'Comunicato Stampa',
                      },
                      {
                        key: 'Invito Stampa',
                        text: 'Invito Stampa',
                        value: 'Invito Stampa',
                      },
                    ]}
                  />
                </FormField>
              </FormGroup>
            </Form>
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
                    const statusLabel = `${intl.formatMessage(
                      messages.status,
                    )}: ${intl.formatMessage(messages[item.status])}`;
                    let statusIcon = null;
                    switch (item.status) {
                      case 'success':
                        statusIcon = checkSVG;
                        break;
                      case 'sending':
                        statusIcon = clockSVG;
                        break;
                      case 'error':
                        statusIcon = exclamationSVG;
                        break;
                      default:
                        statusIcon = exclamationSVG;
                        break;
                    }
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
                              // <span
                              //   className={item.status}
                              //   aria-label={statusLabel}
                              //   role="status"
                              // ></span>
                              <div className={item.status}>
                                <IconNext
                                  name={statusIcon}
                                  size="15px"
                                  title={statusLabel}
                                />
                              </div>
                            }
                          />
                        </Table.Cell>
                        <Table.Cell>{item.type}</Table.Cell>
                        <Table.Cell>
                          {item.channels && item.channels.join(', ')}
                        </Table.Cell>
                        <Table.Cell>
                          {moment(item.date).format('DD/MM/YYYY HH:mm')}
                        </Table.Cell>
                        <Table.Cell>
                          {moment(item.completed_date).format(
                            'DD/MM/YYYY HH:mm',
                          )}
                        </Table.Cell>
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
