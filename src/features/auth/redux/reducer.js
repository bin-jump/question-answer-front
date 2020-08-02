import { reducer as pinUserReducer } from './pinUser';
import { reducer as addUserReducer } from './addUser';

const initialState = {
  id: 111,
  user: null,
  pinUserPending: false,
  userAlreadyPin: false,

  signinPending: false,
  signinMessage: '',
  signupPending: false,
  signupMessage: '',

  lastError: null,
};

const reducers = [pinUserReducer, addUserReducer];

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
