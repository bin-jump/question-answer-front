import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  MESSAGE_FETCH_MESSAGE_BEGIN,
  MESSAGE_FETCH_MESSAGE_SUCCESS,
  MESSAGE_FETCH_MESSAGE_FAILURE,
} from './constants';

let version = 0;

export function fetchMessages(id, after) {
  let url = `/api/message/${id}`;
  if (after) {
    url = `${url}?after=${after}`;
  }
  version += 1;
  return getRequest(
    url,
    MESSAGE_FETCH_MESSAGE_BEGIN,
    MESSAGE_FETCH_MESSAGE_SUCCESS,
    MESSAGE_FETCH_MESSAGE_FAILURE,
    id,
    { version },
  );
}

export function useFetchMessages() {
  const dispatch = useDispatch();
  const {
    messages,
    fetchMessagePending,
    fetchMessageAfter,

    chats,
    error,
  } = useSelector(
    (state) => ({
      // messages: state.message.messages,
      fetchMessagePending: state.message.fetchMessagePending,
      // fetchMessageAfter: state.message.fetchMessageAfter,

      chats: state.message.chats,
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

    chats,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MESSAGE_FETCH_MESSAGE_BEGIN:
      return {
        ...state,
        fetchMessagePending: true,

        // chats: state.chats.map((item) => {
        //   if (item.id === action.id) {
        //     item.messagePending = true;
        //     return { ...item };
        //   }
        //   return item;
        // }),
        lastError: null,
      };

    case MESSAGE_FETCH_MESSAGE_SUCCESS:
      //console.log(action.extra.version);
      // if (action.extra.version < version) {
      //   return state;
      // }
      return {
        ...state,
        // messages: [...action.data.data.children, ...state.messages],
        fetchMessagePending: false,
        // fetchMessageAfter: action.data.data.after,

        chats: state.chats.map((item) => {
          if (item.id === action.id) {
            item.messagePending = false;
            // set unread count to zero if current read is the first read
            item.unreadCount =
              item.messages.length === 0 ? 0 : item.unreadCount;
            item.messages = [...item.messages, ...action.data.data.children];
            item.messageAfter = action.data.data.after;
            return { ...item };
          }
          return item;
        }),
        lastError: null,
      };

    case MESSAGE_FETCH_MESSAGE_FAILURE:
      return {
        ...state,
        fetchMessagePending: false,

        // chats: state.chats.map((item) => {
        //   if (item.id === action.id) {
        //     item.messagePending = false;
        //     return { ...item };
        //   }
        //   return item;
        // }),
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
