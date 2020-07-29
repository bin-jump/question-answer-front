import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SEARCH_FETCH_RESULT_BEGIN,
  SEARCH_FETCH_RESULT_SUCCESS,
  SEARCH_FETCH_RESULT_FAILURE,
} from './constants';

export function fetchSearchResults(keyWord, after) {
  let url = `/api/search?q=${keyWord}`;
  if (after) {
    url = `${url}&after=${after}`;
  }
  return getRequest(
    url,
    SEARCH_FETCH_RESULT_BEGIN,
    SEARCH_FETCH_RESULT_SUCCESS,
    SEARCH_FETCH_RESULT_FAILURE,
  );
}

export function useFetchSearchResults() {
  const dispatch = useDispatch();
  const { searchResult, searchPending, searchAfter, error } = useSelector(
    (state) => ({
      searchResult: state.search.searchResult,
      searchPending: state.search.searchPending,
      searchAfter: state.search.searchAfter,
      error: state.search.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (keyWord, after) => {
      dispatch(fetchSearchResults(keyWord, after));
    },
    [dispatch],
  );

  return {
    fetchSearchResults: boundAction,
    searchResult,
    searchPending,
    searchAfter,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SEARCH_FETCH_RESULT_BEGIN:
      return {
        ...state,
        searchPending: true,
        lastError: null,
      };

    case SEARCH_FETCH_RESULT_SUCCESS:
      return {
        ...state,
        searchResult: [...state.searchResult, ...action.data.data.children],
        searchAfter: action.data.data.after,
        searchPending: false,
        lastError: null,
      };

    case SEARCH_FETCH_RESULT_FAILURE:
      return {
        ...state,
        searchPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
