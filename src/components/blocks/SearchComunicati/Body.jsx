import React, { useState, useReducer, useEffect, createRef } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Spinner,
  Card,
  CardBody,
  CardCategory,
  CardTitle,
  CardText,
} from 'design-react-kit';
import moment from 'moment';
import cx from 'classnames';

import { UniversalLink } from '@plone/volto/components';

import { Pagination } from 'design-comuni-plone-theme/components/ItaliaTheme';
import {
  viewDate,
  useDebouncedEffect,
} from 'design-comuni-plone-theme/helpers';
import FiltersConfig from 'volto-ufficiostampa/components/blocks/SearchComunicati/FiltersConfig';
import {
  searchComunicatiParameters,
  searchComunicati,
  resetSearchComunicati,
} from 'volto-ufficiostampa/actions/search';

const messages = defineMessages({
  noResult: {
    id: 'noResult',
    defaultMessage: 'Nessun risultato trovato',
  },
  total_results: {
    id: 'search-comunicati-total-results',
    defaultMessage: 'Trovati {total} risultati',
  },
});

const Body = ({ data, id, inEditMode, onChangeBlock }) => {
  const intl = useIntl();
  const b_size = 20;

  moment.locale(intl.locale);

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const subrequest_id = id + 'comunicati_plone';
  const searchResults = useSelector((state) => {
    return state.searchComunicati?.subrequests?.[subrequest_id];
  });

  const items = useSelector((state) => {
    return state.searchComunicati?.subrequests?.[subrequest_id]?.items ?? [];
  });

  const loading = useSelector((state) => {
    return (
      state.searchComunicati?.subrequests?.[subrequest_id]?.loading || false
    );
  });

  const parameters = useSelector((state) => {
    return state.searchComunicatiParameters;
  });

  const resultsRef = createRef();

  const doRequest = (page = currentPage) => {
    setCurrentPage(page);
    let query = [];

    [filterOne, filterTwo, filterThree, filterFour].forEach((f) => {
      if (f?.widget) {
        const value = f.widget.props.value;

        if (f.query) {
          f.query(value, query);
        }
      }
    });

    dispatch(
      searchComunicati(
        {
          query,
          b_size: b_size,
        },
        subrequest_id,
        page,
      ),
    );
  };

  useEffect(() => {
    if (!parameters?.loading && !parameters.loaded) {
      dispatch(searchComunicatiParameters());
    }
  }, []);

  useEffect(() => {
    dispatchFilter({ type: 'init_filters' });
  }, [parameters.items]);

  const filtersReducer = (state = getInitialState(), action) => {
    let newState = {
      ...state,
    };

    if (action.type === 'init_filters') {
      newState = {
        ...getInitialState(),
      };
    } else if (action.type === 'reset') {
      newState = {
        ...getInitialState(),
      };
      dispatch(resetSearchComunicati(subrequest_id));
    } else {
      const f = newState[action.filter];
      const defaultReducer = (value, state) => value;
      const reducer = f.reducer || defaultReducer;
      f.widget.props.value = reducer(action.value, state[action.filter]);

      const optionsReducer = f.optionsReducer || (() => f.widget.props.options);
      if (f.type === 'legislatura') {
        const filter_argomenti = Object.keys(newState).filter(
          (f) => newState[f].type === 'argomenti',
        )?.[0];
        if (filter_argomenti) {
          const argomenti_choices = getArgomentiChoices(action.value);

          if (argomenti_choices) {
            newState[filter_argomenti].widget.props.options.choices =
              argomenti_choices;
          } else {
            newState[filter_argomenti].widget.props.options.choices = undefined;
          }
          const argomenti_value =
            newState[filter_argomenti].widget.props.value?.value;
          if (argomenti_value) {
            if (!argomenti_choices?.find((i) => i.value === argomenti_value)) {
              newState[filter_argomenti].widget.props.value = null;
            }
          }
        }
      }
    }
    return newState;
  };

  const getArgomentiChoices = (legislatura) => {
    if (legislatura) {
      const param_legislature_config = parameters?.items?.filter(
        (i) => i.id === 'legislature',
      )?.[0];
      if (param_legislature_config) {
        const argumentsOptions =
          param_legislature_config.slave?.slaveOptions?.[legislatura.label];
        return argumentsOptions ?? undefined;
      }
    }
    return undefined;
  };

  const filtersConfig = FiltersConfig();

  const getInitialState = () => {
    const legislatura_param = parameters?.items?.filter(
      (i) => i.id === 'legislature',
    )?.[0];
    const legislatura_default_value = legislatura_param?.default?.[0]
      ? legislatura_param.options.filter(
          (o) => o.value === legislatura_param.default?.[0],
        )[0]
      : null;

    const legislatura_filter = {
      ...filtersConfig['legislatura'],
      widget: {
        ...filtersConfig['legislatura'].widget,
        props: {
          ...filtersConfig['legislatura'].widget.props,
          value: legislatura_default_value,
          options: {
            ...filtersConfig['legislatura'].widget.props.options,
            choices: legislatura_param?.options ?? undefined,
          },
        },
      },
    };

    let argomenti_filter = filtersConfig['argomenti'];
    if (legislatura_default_value) {
      const argomenti_choices = getArgomentiChoices(legislatura_default_value);

      if (argomenti_choices) {
        argomenti_filter.widget.props.options.choices = argomenti_choices;
      } else {
        argomenti_filter.widget.props.options.choices = undefined;
      }
    }
    return {
      filterOne: filtersConfig['SearchableText'],
      filterTwo: filtersConfig['data'],
      filterThree: legislatura_filter,
      filterFour: argomenti_filter,
    };
  };

  const [{ filterOne, filterTwo, filterThree, filterFour }, dispatchFilter] =
    useReducer(filtersReducer, getInitialState());

  useDebouncedEffect(
    () => {
      doRequest(1);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    600,
    [
      filterOne?.widget?.props?.value,
      filterTwo?.widget?.props?.value,
      filterThree?.widget?.props?.value,
      filterFour?.widget?.props?.value,
    ],
  );

  function handleQueryPaginationChange(e, { activePage }) {
    resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    const current = activePage?.children ?? 1;
    setCurrentPage(current);
    doRequest(current);
  }

  return filterOne || filterTwo || filterThree || filterFour ? (
    <Container className="mb-4">
      <div
        className={cx('rounded bg-primary p-4', {
          'public-ui': inEditMode,
        })}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            doRequest(1);
          }}
        >
          <div className="d-flex justify-content-center">
            <div className="d-flex search-container align-items-center justify-content-center flex-wrap w-100">
              {filterOne && (
                <>
                  {React.createElement(filterOne.widget.component, {
                    ...filterOne.widget?.props,
                    blockID: id,
                    id: 'filterOne',
                    onChange: (filter, value) => {
                      dispatchFilter({
                        filter: filter,
                        value: value,
                      });
                    },
                  })}
                </>
              )}
              {filterTwo &&
                React.createElement(filterTwo.widget?.component, {
                  ...filterTwo.widget?.props,
                  blockID: id,
                  id: 'filterTwo',
                  onChange: (filter, value) =>
                    dispatchFilter({
                      filter: filter,
                      value: value,
                    }),
                })}
              {filterThree &&
                React.createElement(filterThree.widget?.component, {
                  ...filterThree.widget?.props,
                  blockID: id,
                  id: 'filterThree',
                  onChange: (filter, value) =>
                    dispatchFilter({
                      filter: filter,
                      value: value,
                    }),
                })}
              {filterFour &&
                React.createElement(filterFour.widget?.component, {
                  ...filterFour.widget?.props,
                  blockID: id,
                  id: 'filterFour',
                  onChange: (filter, value) =>
                    dispatchFilter({
                      filter: filter,
                      value: value,
                    }),
                })}
            </div>
          </div>
        </form>
        <div className="info py-2 text-white">
          {filterOne.widget.props.description}
        </div>
      </div>

      {!loading ? (
        items?.length > 0 ? (
          <div
            className="mt-4"
            ref={resultsRef}
            aria-live="polite"
            role="region"
          >
            <div className="total-results" aria-live="assertive" role="region">
              {intl.formatMessage(messages.total_results, {
                total: searchResults.total,
              })}
            </div>
            <div className="results-wrapper">
              {items.map((item, index) => (
                <Card
                  className="align-items-top rounded shadow no-after my-md-3"
                  //noWrapper
                  //teaser
                >
                  <CardBody>
                    {item.Date && (
                      <CardCategory
                        date={viewDate(intl.locale, item.Date, 'll')}
                      ></CardCategory>
                    )}
                    <CardTitle tag="h3">
                      <UniversalLink
                        href={inEditMode ? '#' : undefined}
                        item={inEditMode ? undefined : item}
                        tabIndex={0}
                      >
                        {item.title}
                      </UniversalLink>
                    </CardTitle>

                    <CardText>{item.description}</CardText>
                  </CardBody>
                </Card>
              ))}
            </div>

            {searchResults.total > b_size && (
              <Pagination
                activePage={currentPage}
                totalPages={Math.ceil(searchResults.total / b_size)}
                onPageChange={handleQueryPaginationChange}
              />
            )}
          </div>
        ) : searchResults ? (
          <>
            <div className="mt-4" aria-live="polite">
              <p className="text-center">
                {intl.formatMessage(messages.noResult)}
              </p>
            </div>
          </>
        ) : null
      ) : (
        <div className="d-flex justify-content-center mt-3">
          <Spinner active />
        </div>
      )}
    </Container>
  ) : null;
};
export default Body;
