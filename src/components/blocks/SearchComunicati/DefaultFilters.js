import moment from 'moment';
import { useIntl, defineMessages } from 'react-intl';

import {
  TextFilter,
  DateFilter,
  SelectFilter,
} from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/Common/SearchFilters';

import { searchComunicatiParameters } from 'volto-ufficiostampa/actions/search';

const messages = defineMessages({
  legislatura: {
    id: 'searchComunicati_legislatura',
    defaultMessage: 'Legislatura',
  },
  data_filter: {
    id: 'searchComunicati_data_filter',
    defaultMessage: 'Data',
  },
  data_dal: {
    id: 'searchComunicati_dal',
    defaultMessage: 'Data dal',
  },
  data_al: {
    id: 'searchComunicati_al',
    defaultMessage: 'Data al',
  },
  SearchableText: {
    id: 'searchComunicati_searchable_text',
    defaultMessage: 'Ricerca testuale',
  },
  argomenti: {
    id: 'searchComunicati_argomenti',
    defaultMessage: 'Argomenti',
  },
});

const DefaultFilters = (dispatchFilter) => {
  const intl = useIntl();
  moment.locale(intl.locale);

  return {
    SearchableText: {
      label: intl.formatMessage(messages.SearchableText),
      type: 'searchableText',
      widget: {
        component: TextFilter,
        props: {
          value: '',
          placeholder: intl.formatMessage(messages.SearchableText),
        },
      },
      query: (value, query) => {
        if (value) {
          query.push({
            i: 'SearchableText',
            v: value,
          });
        }
      },
    },

    data: {
      label: intl.formatMessage(messages.data_filter),
      type: 'data',
      widget: {
        component: DateFilter,
        props: {
          value: {
            startDate: undefined, //moment().startOf('day'),
            endDate: undefined, //moment().endOf('day'),
          },
          showClearDates: true,
          // defaultStart: moment().startOf('day'),
          // defaultEnd: moment().endOf('day'),
          isOutsideRange: () => false,
          startLabel: intl.formatMessage(messages.data_dal),
          endLabel: intl.formatMessage(messages.data_al),
        },
      },

      reducer: (value, state) => {
        return {
          startDate: value.start ?? state.widget.props.defaultStart,
          endDate: value.end ?? state.widget.props.defaultEnd,
        };
      },
      query: (value, query) => {
        const date_fmt = 'YYYY-MM-DD';
        if (value?.startDate || value?.endDate) {
          if (value?.startDate) {
            let start_v = value.startDate.clone();
            let start = start_v?.startOf('day')?.utc()?.format(date_fmt);
            query.push({
              i: 'created.query',
              v: start,
            });
          }
          if (value?.endDate) {
            let end_v = value.endDate.clone();
            let end = end_v.add(1, 'd').startOf('day')?.utc().format(date_fmt);
            query.push({
              i: 'created.query',
              v: end,
            });
          }
          if (value?.startDate && value?.endDate) {
            query.push({
              i: 'created.range',
              v: 'min:max',
            });
          } else if (value?.startDate) {
            query.push({
              i: 'created.range',
              v: 'min',
            });
          } else if (value?.endDate) {
            query.push({
              i: 'created.range',
              v: 'max',
            });
          }
        }
      },
    },
    legislatura: {
      label: intl.formatMessage(messages.legislatura),
      type: 'legislatura',
      widget: {
        component: SelectFilter,
        props: {
          value: null,
          options: {
            placeholder: intl.formatMessage(messages.legislatura),
          },
        },
      },
      query: (value, query) => {
        if (value?.value) {
          query.push({
            i: 'legislature',
            v: value.value,
          });
        }
      },
    },
    argomenti: {
      label: intl.formatMessage(messages.argomenti),
      type: 'argomenti',
      widget: {
        component: SelectFilter,
        props: {
          value: null,
          options: {
            placeholder: intl.formatMessage(messages.argomenti),
          },
        },
      },
      query: (value, query) => {
        if (value?.value) {
          query.push({
            i: 'arguments',
            v: value.value,
          });
        }
      },
    },
  };
};

export default DefaultFilters;
