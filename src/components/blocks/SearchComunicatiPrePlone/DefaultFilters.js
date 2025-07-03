import moment from 'moment';
import { useIntl, defineMessages } from 'react-intl';

import {
  TextFilter,
  DateFilter,
} from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/Common/SearchFilters';

const messages = defineMessages({
  parolechiave: {
    id: 'searchComunicati_parolechiave',
    defaultMessage: 'Parole chiave',
  },
  parolechiave_description: {
    id: 'searchComunicati_parolechiave_description',
    defaultMessage:
      'Le parole chiave devono essere separate dal carattere " | "',
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
});

const DefaultFilters = () => {
  const intl = useIntl();
  moment.locale(intl.locale);

  return {
    parolechiave: {
      label: intl.formatMessage(messages.parolechiave),
      type: 'parolechiave',
      widget: {
        component: TextFilter,
        props: {
          value: '',
          placeholder: intl.formatMessage(messages.parolechiave) + '*',
          description:
            '*' + intl.formatMessage(messages.parolechiave_description),
        },
      },
      query: (value, query) => {
        if (value) {
          query.push({
            i: 'parolechiave',
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
              i: 'dataDa',
              v: start,
            });
          }
          if (value?.endDate) {
            let end_v = value.endDate.clone();
            let end = end_v.add(1, 'd').startOf('day')?.utc().format(date_fmt);
            query.push({
              i: 'dataA',
              v: end,
            });
          }
        }
      },
    },
  };
};

export default DefaultFilters;
