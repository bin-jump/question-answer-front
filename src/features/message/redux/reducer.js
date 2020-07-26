import { reducer as fetchChatReducer } from './fetchChats';
import { MESSAGE_RESET } from './constants';

const initialState = {
  chats: [],
  fetchChatPending: false,
  fetchChatAfter: null,
  lastError: null,
};

const reducers = [fetchChatReducer];

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
