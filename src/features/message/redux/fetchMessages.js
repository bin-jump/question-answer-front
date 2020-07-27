import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  MESSAGE_FETCH_MESSAGE_BEGIN,
  MESSAGE_FETCH_MESSAGE_SUCCESS,
  MESSAGE_FETCH_MESSAGE_FAILURE,
} from './constants';

export function fetchMessages(id, after) {
  let url = `/api/message/${id}`;
  if (after) {
    url = `${url}?after=${after}`;
  }
  return getRequest(
    url,
    MESSAGE_FETCH_MESSAGE_BEGIN,
    MESSAGE_FETCH_MESSAGE_SUCCESS,
    MESSAGE_FETCH_MESSAGE_FAILURE,
    id,
  );
}

export function useFetchMessages() {
  const dispatch = useDispatch();
  const {
    messages,
    fetchMessagePending,
    fetchMessageAfter,
    error,
  } = useSelector(
    (state) => ({
      messages: state.message.messages,
      fetchMessagePending: state.message.fetchMessagePending,
      fetchMessageAfter: state.message.fetchMessageAfter,
      error: state.message.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (withId, after) => {
      dispatch(fetchMessages(withId, after));
    },
    [dispatch],
  );

  return {
    fetchMessages: boundAction,
    messages,
    fetchMessagePending,
    fetchMessageAfter,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MESSAGE_FETCH_MESSAGE_BEGIN:
      return {
        ...state,
        fetchMessagePending: true,
        lastError: null,
      };

    case MESSAGE_FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...action.data.data.children, ...state.messages],
        fetchMessagePending: false,
        fetchMessageAfter: action.data.data.after,

        lastError: null,
      };

    case MESSAGE_FETCH_MESSAGE_FAILURE:
      return {
        ...state,
        fetchMessagePending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
