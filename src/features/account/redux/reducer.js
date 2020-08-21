import { reducer as updateReducer } from './updateUser';
import { reducer as updateAvatarReducer } from './updateAvatar';

const initialState = {
  updatePending: false,
  updateAvatarPending: false,
  lastError: null,
};

const reducers = [updateReducer, updateAvatarReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
