import { reducer as fetchChatReducer } from './fetchChats';
import { reducer as fetchMessageReducer } from './fetchMessages';
import { MESSAGE_RESET } from './constants';

const initialState = {
  chats: [],
  fetchChatPending: false,
  fetchChatAfter: null,

  messages: [],
  fetchMessagePending: false,
  fetchMessageAfter: null,

  lastError: null,
};

const reducers = [fetchChatReducer, fetchMessageReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case MESSAGE_RESET:
      return initialState;
    default:
      newState = state;
      break;
  }

  return reducers.reduce((s, r) => r(s, action), newState);
}
