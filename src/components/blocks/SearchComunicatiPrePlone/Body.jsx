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
import FiltersConfig from 'volto-ufficiostampa/components/blocks/SearchComunicatiPrePlone/FiltersConfig';
import {
  searchComunicatiOld,
  resetSearchComunicatiOld,
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

  const subrequest_id = id + 'comunicati_pre_plone';
  const searchResults = useSelector((state) => {
    return state.searchComunicatiOld?.subrequests?.[subrequest_id];
  });

  const items = useSelector((state) => {
    return state.searchComunicatiOld?.subrequests?.[subrequest_id]?.items ?? [];
  });

  const loading = useSelector((state) => {
    return (
      state.searchComunicatiOld?.subrequests?.[subrequest_id]?.loading || false
    );
  });

  const resultsRef = createRef();

  const doRequest = (page = currentPage) => {
    setCurrentPage(page);
    let query = [];

    [filterOne, filterTwo, filterThree].forEach((f) => {
      if (f?.widget) {
        const value = f.widget.props.value;

        if (f.query) {
          f.query(value, query);
        }
      }
    });

    dispatch(
      searchComunicatiOld(
        {
          query,
          b_size: b_size,
        },
        subrequest_id,
        page,
      ),
    );
  };

  // Se cambia uno dei tre filtri resetto lo stato dei filtri
  useEffect(() => {
    dispatchFilter({ type: 'reset' });
  }, [data]);

  const filtersReducer = (state = getInitialState(), action) => {
    let newState = {
      ...state,
    };

    if (action.type === 'reset') {
      newState = {
        ...getInitialState(),
      };
      dispatch(resetSearchComunicatiOld(subrequest_id));
    } else {
      const f = newState[action.filter];
      const defaultReducer = (value, state) => value;
      const reducer = f.reducer || defaultReducer;
      f.widget.props.value = reducer(action.value, state[action.filter]);
    }
    return newState;
  };

  const filtersConfig = FiltersConfig(null);

  const getInitialState = () => {
    return {
      filterOne: filtersConfig[data?.filter_one ?? 'parolechiave'],
      filterTwo: filtersConfig[data?.filter_two ?? 'data'],
      filterThree: filtersConfig[data?.filter_three],
    };
  };

  const [{ filterOne, filterTwo, filterThree }, dispatchFilter] = useReducer(
    filtersReducer,
    getInitialState(),
  );

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
    ],
  );

  function handleQueryPaginationChange(e, { activePage }) {
    resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    const current = activePage?.children ?? 1;
    setCurrentPage(current);
    doRequest(current);
  }

  return filterOne || filterTwo || filterThree ? (
    <Container>
      <div
        className={cx('rounded bg-primary px-4 py-2', {
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
            <div
              className="total-results fw-bold"
              aria-live="assertive"
              role="region"
            >
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
                    {item.data_e_ora && (
                      <CardCategory
                        date={viewDate(intl.locale, item.data_e_ora, 'll')}
                      ></CardCategory>
                    )}
                    <CardTitle tag="h3">
                      <UniversalLink
                        item={!inEditMode ? item : null}
                        href={inEditMode ? '#' : null}
                        tabIndex={0}
                      >
                        {item.titolo}
                      </UniversalLink>
                    </CardTitle>

                    <CardText>{item.oggetto}</CardText>
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
