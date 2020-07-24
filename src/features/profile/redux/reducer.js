import { reducer as fetchItemReducer } from './fetchItems';
import { reducer as fetchUserInfoReducer } from './fetchUserInfo';
import { reducer as followReducer } from './followUser';
import { PROFILE_RESET, PROFILE_ITEM_RESET } from './constants';

const initialState = {
  userInfo: null,
  fetchUserInfoPending: false,
  followUserPending: false,

  items: [],
  fetchItemPending: false,
  fetchItemAfter: null,
  // use separate list for use,
  // as redux do not gurantee the state clear of component unmount
  // happend before new component rendering
  users: [],
  fetchUserPending: false,
  fetchUserAfter: null,

  lastError: null,
};

const reducers = [fetchItemReducer, fetchUserInfoReducer, followReducer];

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

        users: [],
        fetchUserPending: false,
        fetchUserAfter: null,
      };
    default:
      newState = state;
      break;
  }

  return reducers.reduce((s, r) => r(s, action), newState);
}
