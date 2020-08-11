import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  MESSAGE_FETCH_UNREAD_CHAT_BEGIN,
  MESSAGE_FETCH_UNREAD_CHAT_SUCCESS,
  MESSAGE_FETCH_UNREAD_CHAT_FAILURE,
} from './constants';

export function fetchUnreadChats() {
  let url = '/api/message/read';

  return getRequest(
    url,
    MESSAGE_FETCH_UNREAD_CHAT_BEGIN,
    MESSAGE_FETCH_UNREAD_CHAT_SUCCESS,
    MESSAGE_FETCH_UNREAD_CHAT_FAILURE,
  );
}

export function useFetchUnreadChats() {
  const dispatch = useDispatch();
  const { chats, fetchUnreadChatPending, error } = useSelector(
    (state) => ({
      chats: state.message.chats,
      fetchUnreadChatPending: state.message.fetchUnreadChatPending,
      error: state.message.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    dispatch(fetchUnreadChats());
  }, [dispatch]);

  return {
    fetchUnreadChats: boundAction,
    chats,
    fetchUnreadChatPending,
    error,
  };
}

const mergeChats = (unreadChats, curChats) => {
  let oldItems = {};
  curChats.forEach((item) => {
    oldItems[item.id] = item;
  });

  let ids = {};
  unreadChats.forEach((item) => {
    ids[item.id] = true;
    item.messages = [];
    item.messagePending = false;
    item.messageAfter = null;
    if (oldItems[item.id]) {
      item.messages = oldItems[item.id].messages;
      item.messagePending = oldItems[item.id].messagePending;
      item.messageAfter = oldItems[item.id].messageAfter;
    }
  });

  let old = [];
  curChats.forEach((item) => {
    if (!ids[item.id]) {
      old.push(item);
    }
  });

  return [...unreadChats, ...old];
};

export function reducer(state, action) {
  switch (action.type) {
    case MESSAGE_FETCH_UNREAD_CHAT_BEGIN:
      return {
        ...state,
        fetchUnreadChatPending: true,
        lastError: null,
      };

    case MESSAGE_FETCH_UNREAD_CHAT_SUCCESS:
      let newChats = mergeChats(action.data.data.children, state.chats);
      //let last = newChats.slice(-1)[0];
      return {
        ...state,

        chats: newChats,
        fetchUnreadChatPending: false,
        fetchChatAfter: action.data.data.after,
        lastError: null,
      };

    case MESSAGE_FETCH_UNREAD_CHAT_FAILURE:
      return {
        ...state,
        fetchUnreadChatPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
