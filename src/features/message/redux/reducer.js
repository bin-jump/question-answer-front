import { reducer as fetchChatReducer } from './fetchChats';
import { reducer as fetchMessageReducer } from './fetchMessages';
import { reducer as fetchUnreadChatReducer } from './fetchUnreadChats';
import { reducer as fetchUnreadMessageReducer } from './fetchUnreadMessage';
import { reducer as sendMessageReducer } from './sendMessage';
import { reducer as fetchChatUserReducer } from './fetchChatUser';

import { MESSAGE_RESET, MESSAGE_CHAT_LIST_RESET } from './constants';

const initialState = {
  chats: [],
  fetchChatPending: false,
  fetchChatAfter: null,

  sendMessagePending: false,

  users: [],
  fetchUserPending: false,

  // fetchUnreadChatPending: false,
  // messages: [],

  fetchMessagePending: false,
  // fetchMessageAfter: null,

  lastError: null,
};

const reducers = [
  fetchChatReducer,
  fetchMessageReducer,
  fetchUnreadChatReducer,
  fetchUnreadMessageReducer,
  sendMessageReducer,
  fetchChatUserReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case MESSAGE_RESET:
      return initialState;
    case MESSAGE_CHAT_LIST_RESET:
      return { ...state, messages: [], fetchMessageAfter: null };

    default:
      newState = state;
      break;
  }

  return reducers.reduce((s, r) => r(s, action), newState);
}
