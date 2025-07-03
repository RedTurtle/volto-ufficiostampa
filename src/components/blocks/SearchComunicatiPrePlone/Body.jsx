import React, { useState, useReducer, useEffect, createRef } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Spinner } from 'design-react-kit';
import moment from 'moment';
import cx from 'classnames';

import { Pagination } from 'design-comuni-plone-theme/components/ItaliaTheme';

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
});

const Body = ({ data, id, inEditMode, onChangeBlock }) => {
  const intl = useIntl();
  const b_size = 21;

  moment.locale(intl.locale);

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const searchResults = useSelector((state) => {
    return state.searchComunicatiOld?.subrequests?.[
      id + '_comunicati_pre_plone'
    ];
  });

  const items = useSelector((state) => {
    return (
      state.querystringsearch?.subrequests?.[id + '_comunicati_pre_plone']
        ?.items ?? []
    );
  });

  const loading = useSelector((state) => {
    return (
      state.querystringsearch?.subrequests?.[id + '_comunicati_pre_plone']
        ?.loading || false
    );
  });

  const resultsRef = createRef();

  //TODO: da sisteamare la chiamata al BE
  const doRequest = (page = currentPage) => {
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
        id + '_comunicati_pre_plone',
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
      dispatch(resetSearchComunicatiOld(id + '_comunicati_pre_plone'));
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

  useEffect(() => {
    doRequest(1);
  }, [
    filterOne?.widget?.props?.value,
    filterTwo?.widget?.props?.value,
    filterThree?.widget?.props?.value,
  ]);

  function handleQueryPaginationChange(e, { activePage }) {
    resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    const current = activePage?.children ?? 1;
    setCurrentPage(current);
    doRequest(current);
  }

  return filterOne || filterTwo || filterThree ? (
    <Container>
      <div
        className={cx('rounded bg-primary', {
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
            <div className="d-flex search-container align-items-center justify-content-center flex-wrap">
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
        <div className="info p-2 text-white">
          {filterOne.widget.props.description}
        </div>
      </div>

      {!loading ? (
        items?.length > 0 ? (
          <div className="mt-4" ref={resultsRef} aria-live="polite">
            <div className="block listing">
              {items.length} risultati trovati. TODO: Implementare la view di
              ogni risultato
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
