import { reducer as fetchItemReducer } from './fetchItems';
import { PROFILE_RESET, PROFILE_ITEM_RESET } from './constants';

const initialState = {
  user: null,
  items: [],
  fetchItemPending: false,
  fetchItemAfter: null,
  lastError: null,
};

const reducers = [fetchItemReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case PROFILE_RESET:
      return initialState;
    case PROFILE_ITEM_RESET:
      return {
        ...state,
        items: [],
        fetchItemPending: false,
        fetchItemAfter: null,
      };
    default:
      newState = state;
      break;
  }

  return reducers.reduce((s, r) => r(s, action), newState);
}
