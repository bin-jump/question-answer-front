import { putRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  MESSAGE_FETCH_UNREAD_MESSAGE_BEGIN,
  MESSAGE_FETCH_UNREAD_MESSAGE_SUCCESS,
  MESSAGE_FETCH_UNREAD_MESSAGE_FAILURE,
} from './constants';

export function fetchUnreadMessages(chatId, lastId) {
  let url = `/api/message/${chatId}/read?lastId=${lastId}`;
  return putRequest(
    url,
    null,
    MESSAGE_FETCH_UNREAD_MESSAGE_BEGIN,
    MESSAGE_FETCH_UNREAD_MESSAGE_SUCCESS,
    MESSAGE_FETCH_UNREAD_MESSAGE_FAILURE,
    chatId,
  );
}

export function useFetchUnreadMessages() {
  const dispatch = useDispatch();
  const { chats, error } = useSelector(
    (state) => ({
      chats: state.message.chats,
      error: state.message.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (withId, lastId) => {
      dispatch(fetchUnreadMessages(withId, lastId));
    },
    [dispatch],
  );

  return {
    fetchUnreadMessages: boundAction,
    chats,
    error,
  };
}

const getCoverText = (messages) => {
  let cover = messages.slice(-1)[0];
  if (cover) {
    return cover.body;
  }
  return '';
};

export function reducer(state, action) {
  switch (action.type) {
    case MESSAGE_FETCH_UNREAD_MESSAGE_BEGIN:
      return {
        ...state,
        chats: state.chats.map((item) => {
          if (item.id === action.id) {
            item.unreadMessagePending = true;
            return { ...item };
          }
          return item;
        }),
        lastError: null,
      };

    case MESSAGE_FETCH_UNREAD_MESSAGE_SUCCESS:
      return {
        ...state,
        chats: state.chats.map((item) => {
          if (item.id === action.id) {
            item.unreadMessagePending = false;
            item.unreadCount = 0;
            if (action.data.data.children.legth > 0) {
              item.lastTime = action.data.data.children.slice(-1)[0].lastTime;
              item.coverId = action.data.data.children.slice(-1)[0].coverId;
              item.coverText = getCoverText(action.data.data.children);
            }
            item.messages = [...action.data.data.children, ...item.messages];
            return { ...item };
          }
          return item;
        }),
        lastError: null,
      };

    case MESSAGE_FETCH_UNREAD_MESSAGE_FAILURE:
      return {
        ...state,
        chats: state.chats.map((item) => {
          if (item.id === action.id) {
            item.unreadMessagePending = false;
            return { ...item };
          }
          return item;
        }),
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
