import { postRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  MESSAGE_SEND_MESSAGE_BEGIN,
  MESSAGE_SEND_MESSAGE_SUCCESS,
  MESSAGE_SEND_MESSAGE_FAILURE,
} from './constants';

export function sendMessages(withId, content) {
  let url = `/api/message/${withId}`;

  return postRequest(
    url,
    content,
    MESSAGE_SEND_MESSAGE_BEGIN,
    MESSAGE_SEND_MESSAGE_SUCCESS,
    MESSAGE_SEND_MESSAGE_FAILURE,
    withId,
  );
}

export function useSendMessage() {
  const dispatch = useDispatch();
  const { chats, sendMessagePending, error } = useSelector(
    (state) => ({
      chats: state.message.chats,
      sendMessagePending: state.message.sendMessagePending,
      error: state.message.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (withId, content) => {
      dispatch(sendMessages(withId, content));
    },
    [dispatch],
  );

  return {
    sendMessage: boundAction,
    chats,
    sendMessagePending,
    error,
  };
}

const mergeChat = (curChats, resChat) => {
  let chats = [];
  curChats.forEach((item) => {
    if (resChat.withId !== item.withId) {
      chats.push(item);
    } else {
      resChat.messages = [...resChat.messages, ...item.messages];
      resChat.unreadCount = item.unreadCount;
    }
  });

  return [resChat, ...chats];
};

export function reducer(state, action) {
  switch (action.type) {
    case MESSAGE_SEND_MESSAGE_BEGIN:
      return {
        ...state,
        sendMessagePending: true,
        lastError: null,
      };

    case MESSAGE_SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        chats: mergeChat(state.chats, action.data.data),
        sendMessagePending: false,
        lastError: null,
      };

    case MESSAGE_SEND_MESSAGE_FAILURE:
      return {
        ...state,
        sendMessagePending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
