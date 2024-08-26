import { defineMessages } from 'react-intl';

const messages = defineMessages({
  add_subscriber: {
    id: 'subscriptions_add_subscriber',
    defaultMessage: 'Add subscriber',
  },
  all: { id: 'newsletter_panel_all', defaultMessage: 'All' },
  back: { id: 'Back', defaultMessage: 'Back' },
  cancel: { id: 'button_cancel', defaultMessage: 'Cancel' },
  channels: { id: 'channels', defaultMessage: 'Channels' },
  confirm: { id: 'button_confirm', defaultMessage: 'Confirm' },
  confirm_delete_selected: {
    id: 'newsletter_panel_confirm_delete_selected_subscriptions',
    defaultMessage:
      'Are you sure you want to delete the following subscriptions?',
  },
  creation_date: {
    id: 'subscriptions_creation_date',
    defaultMessage: 'Creation date',
  },
  delete_subscriptions: {
    id: 'newsletter_panel_delete_send_subscriptions',
    defaultMessage: 'Delete subscriptions',
  },
  delete_subscriptions_error: {
    id: 'newsletter_panel_delete_subscriptions_error',
    defaultMessage:
      'An error has occurred while trying to delete subscriptions',
  },
  delete_subscriptions_success: {
    id: 'newsletter_panel_delete_subscriptions_success',
    defaultMessage: 'Subscriptions deleted successfully!',
  },
  download_list: {
    id: 'subscriptions_download_list',
    defaultMessage: 'Download',
  },
  email: { id: 'subscriptions_email', defaultMessage: 'Email' },
  email_label: {
    id: 'modal_add_subscription_email_label',
    defaultMessage: 'Email',
  },
  error: { id: 'panel_error', defaultMessage: 'Error' },
  filter_title: {
    id: 'newsletter_panel_filter_title',
    defaultMessage: 'Filter title',
  },
  import_description: {
    id: 'import_description',
    defaultMessage:
      'Import subscriptions from a csv file. The CSV file must have a columns named "email", ...',
  },
  items_selected: {
    id: 'newsletter_panel_items_selected',
    defaultMessage: 'items selected.',
  },
  loading: { id: 'subscriptions_loading', defaultMessage: 'Loading...' },
  message_send_error: {
    id: 'modal_add_subscription_error',
    defaultMessage: 'Error adding subscription.',
  },
  message_send_success: {
    id: 'modal_add_subscription_success',
    defaultMessage: 'Subscriber added.',
  },
  modal_button_cancel: { id: 'button_cancel', defaultMessage: 'Cancel' },
  modal_button_confirm: { id: 'button_confirm', defaultMessage: 'Confirm' },
  modal_description: {
    id: 'modal_add_subscription_description',
    defaultMessage: 'Manually add a subscription to this newsletter.',
  },
  modal_add_title: {
    id: 'modal_add_subscription',
    defaultMessage: 'Add subscription',
  },
  no_results: {
    id: 'newsletter_panel_no_results',
    defaultMessage: 'No results found',
  },
  select_all: {
    id: 'newsletter_panel_select_all',
    defaultMessage: 'Select/Deselect all',
  },
  select_item: {
    id: 'newsletter_panel_select_item',
    defaultMessage: 'Select item',
  },
  selectChannel: { id: 'select_channel', defaultMessage: 'Select channel' },
  state: { id: 'subscriptions_state', defaultMessage: 'State' },
  subscribe_add_error: {
    id: 'subscribe_add_error',
    defaultMessage: 'An error has occurred trying to add subscription.',
  },
  subscribe_add_success: {
    id: 'subscribe_add_success',
    defaultMessage: 'Subscription added.',
  },
  subscribe_import_error: {
    id: 'subscribe_import_error',
    defaultMessage: 'An error has occurred trying to import subscriptions.',
  },
  subscribe_import_success: {
    id: 'subscribe_import_success',
    defaultMessage: 'Subscriptions imported.',
  },
  subscription_state_active: {
    id: 'subscription_state_active',
    defaultMessage: 'Active',
  },
  subscription_state_inactive: {
    id: 'subscription_state_inactive',
    defaultMessage: 'Inactive',
  },
  subscriptions_controlpanel: {
    id: 'subscriptions_title',
    defaultMessage: 'Manage subscriptions',
  },
  success: { id: 'success_label', defaultMessage: 'Success' },
  tot_filtered: {
    id: 'tot_results_filtered',
    defaultMessage: '{totResults} results (filtered).',
  },
  tot_unfiltered: {
    id: 'tot_results_unfiltered',
    defaultMessage: '{totResults} results.',
  },
  import_subscriptions: { id: 'import_subscriptions', defaultMessage: 'Import subscriptions' },
  modal_import_description: {
    id: 'modal_import_subscriptions_description',
    defaultMessage: 'Import subscriptions from a csv file.',
  },
  file_label: {
    id: 'import_file_label',
    defaultMessage: 'Source file',
  },
  reset_list_label: {
    id: 'import_reset_list_label',
    defaultMessage: 'Reset list',
  },
  reset_list_help: {
    id: 'import_reset_list_help',
    defaultMessage: 'Reset subscriptions before import.',
  },
  remove_from_list_label: {
    id: 'import_remove_from_list_label',
    defaultMessage: 'Remove subscriptions from file',
  },
  remove_from_list_help: {
    id: 'import_remove_from_list_help',
    defaultMessage:
      'Upload a file with a list of subscriptions that need to be removed.',
  },
  has_header_label: {
    id: 'import_has_header_label',
    defaultMessage: 'File has header',
  },
  has_header_help: {
    id: 'import_has_header_help',
    defaultMessage: 'Check this field if the uploaded file has an header row.',
  },
  csv_separator_label: {
    id: 'import_csv_separator_label',
    defaultMessage: 'CSV separator',
  },
  csv_separator_help: {
    id: 'import_csv_separator_help',
    defaultMessage: 'Possible values are "," or ";".',
  },
  select_file: {
    id: 'dropzone_select_file',
    defaultMessage: 'Select a file',
  },
  replace_file: {
    id: 'dropzone_replace_file',
    defaultMessage: 'Replace file',
  },
});

export default messages;
