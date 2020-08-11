import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  MESSAGE_FETCH_CHAT_BEGIN,
  MESSAGE_FETCH_CHAT_SUCCESS,
  MESSAGE_FETCH_CHAT_FAILURE,
} from './constants';

export function fetchChats(after) {
  let url = '/api/message';
  if (after) {
    url = `${url}?after=${after}`;
  }
  return getRequest(
    url,
    MESSAGE_FETCH_CHAT_BEGIN,
    MESSAGE_FETCH_CHAT_SUCCESS,
    MESSAGE_FETCH_CHAT_FAILURE,
  );
}

export function useFetchChats() {
  const dispatch = useDispatch();
  const { chats, fetchChatPending, fetchChatAfter, error } = useSelector(
    (state) => ({
      chats: state.message.chats,
      fetchChatPending: state.message.fetchChatPending,
      fetchChatAfter: state.message.fetchChatAfter,
      error: state.message.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (after) => {
      dispatch(fetchChats(after));
    },
    [dispatch],
  );

  return {
    fetchChats: boundAction,
    chats,
    fetchChatAfter,
    fetchChatPending,
    error,
  };
}

// in case another chat list update occurred,
// before fetch success happened
const mergeChat = (curChats, newChats) => {
  let ids = {};
  curChats.forEach((item) => {
    ids[item.id] = item;
  });
  let news = [];
  newChats.forEach((item) => {
    if (!ids[item.id]) {
      news.push(item);
    }
  });

  let chats = [...curChats, ...news].sort((a, b) =>
    a.lastTime > b.lastTime ? 1 : -1,
  );
  return chats;
};

export function reducer(state, action) {
  switch (action.type) {
    case MESSAGE_FETCH_CHAT_BEGIN:
      return {
        ...state,
        fetchChatPending: true,
        lastError: null,
      };

    case MESSAGE_FETCH_CHAT_SUCCESS:
      let res = action.data.data.children.map((item) => {
        item.messages = [];
        item.messagePending = false;
        item.messageAfter = null;
        return item;
      });
      res = mergeChat(state.chats, res);
      return {
        ...state,
        chats: res,
        fetchChatAfter: action.data.data.after,
        fetchChatPending: false,
        lastError: null,
      };

    case MESSAGE_FETCH_CHAT_FAILURE:
      return {
        ...state,
        fetchChatPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
