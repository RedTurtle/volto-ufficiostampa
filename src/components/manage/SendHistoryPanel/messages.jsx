import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  send_history_controlpanel: {
    id: 'Send history',
    defaultMessage: 'Send history',
  },
  select_all: {
    id: 'ufficiostampa_panel_select_all',
    defaultMessage: 'Select/Deselect all',
  },
  select_item: {
    id: 'ufficiostampa_panel_select_item',
    defaultMessage: 'Select item',
  },
  all: {
    id: 'ufficiostampa_panel_all',
    defaultMessage: 'All',
  },
  message: {
    id: 'ufficiostampa_panel_message',
    defaultMessage: 'Message',
  },
  subscribers: {
    id: 'ufficiostampa_panel_subscribers',
    defaultMessage: 'Active subscribers',
  },
  start_send: {
    id: 'ufficiostampa_panel_start_send',
    defaultMessage: 'Start send',
  },
  end_send: {
    id: 'ufficiostampa_panel_end_send',
    defaultMessage: 'End send',
  },
  status: {
    id: 'ufficiostampa_panel_status',
    defaultMessage: 'Status',
  },
  filter_title: {
    id: 'ufficiostampa_panel_filter_title',
    defaultMessage: 'Filter title',
  },
  items_selected: {
    id: 'ufficiostampa_panel_items_selected',
    defaultMessage: 'items selected.',
  },
  delete_send_history: {
    id: 'ufficiostampa_panel_delete_send_history',
    defaultMessage: 'Delete history',
  },
  confirm_delete_selected: {
    id: 'ufficiostampa_panel_confirm_delete_selected',
    defaultMessage: 'Are you sure you want to reset the following history?',
  },
  error: {
    id: 'error_label',
    defaultMessage: 'Error',
  },
  success: {
    id: 'success_label',
    defaultMessage: 'Success',
  },
  delete_success: {
    id: 'ufficiostampa_panel_delete_success',
    defaultMessage: 'Selected history deleted successfully!',
  },
  delete_error: {
    id: 'ufficiostampa_panel_delete_error',
    defaultMessage:
      'An error has occurred while trying to delete history for {element}',
  },
  cancel: {
    id: 'button_cancel',
    defaultMessage: 'Cancel',
  },
  confirm: {
    id: 'button_confirm',
    defaultMessage: 'Confirm',
  },
  channels: {
    id: 'channels',
    defaultMessage: 'Channels',
  },
  selectChannel: { id: 'select_channel', defaultMessage: 'Select channel' },
  no_results: {
    id: 'ufficiostampa_panel_no_results',
    defaultMessage: 'No results found',
  },
  loading: {
    id: 'ufficiostampa_panel_loading',
    defaultMessage: 'Loading...',
  },
  statusInProgress: {
    id: 'ufficiostampa_panel_status_in_progress',
    defaultMessage: 'In progress',
  },
  statusSent: {
    id: 'ufficiostampa_panel_status_sent',
    defaultMessage: 'Sent',
  },
  statusError: {
    id: 'ufficiostampa_panel_status_error',
    defaultMessage: 'Error',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  tot_filtered: {
    id: 'tot_results_filtered',
    defaultMessage: '{totResults} results (filtered).',
  },
  tot_unfiltered: {
    id: 'tot_results_unfiltered',
    defaultMessage: '{totResults} results.',
  },
});

export default messages;
