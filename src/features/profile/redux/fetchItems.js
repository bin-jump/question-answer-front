import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  PROFILE_FETCH_ITEM_BEGIN,
  PROFILE_FETCH_ITEM_SUCCESS,
  PROFILE_FETCH_ITEM_FAILURE,
} from './constants';

// drop older version response to keep items up to date
//, consider using Redux-Saga in the future
let version = 0;
export function fetchItems(url, after) {
  if (after) {
    url = `${url}?after=${after}`;
  }
  version += 1;
  return getRequest(
    url,
    PROFILE_FETCH_ITEM_BEGIN,
    PROFILE_FETCH_ITEM_SUCCESS,
    PROFILE_FETCH_ITEM_FAILURE,
    null,
    { version },
  );
}

export function useFetchItems() {
  const dispatch = useDispatch();
  const { items, fetchItemAfter, fetchItemPending, lastError } = useSelector(
    (state) => ({
      items: state.profile.items,
      fetchItemAfter: state.profile.fetchItemAfter,
      fetchItemPending: state.profile.fetchItemPending,
      lastError: state.profile.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (url, after) => {
      dispatch(fetchItems(url, after));
    },
    [dispatch],
  );

  return {
    items,
    fetchItems: boundAction,
    fetchItemAfter,
    fetchItemPending,
    lastError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PROFILE_FETCH_ITEM_BEGIN:
      return {
        ...state,
        fetchItemPending: true,
        lastError: null,
      };

    case PROFILE_FETCH_ITEM_SUCCESS:
      // if version is not up to date,
      // a newer response has already updated the state,
      // so, just keep the current state
      if (action.extra.version < version) {
        return { ...state };
      }

      return {
        ...state,
        items: [...state.items, ...action.data.data.children],
        fetchItemAfter: action.data.data.dist ? action.data.data.after : null,
        fetchItemPending: false,
        lastError: null,
      };

    case PROFILE_FETCH_ITEM_FAILURE:
      return {
        ...state,
        fetchItemPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
