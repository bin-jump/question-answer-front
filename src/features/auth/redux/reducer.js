import { reducer as pinUserReducer } from './pinUser';
import { reducer as addUserReducer } from './addUser';
import { reducer as signinReducer } from './signin';
import { reducer as signoutReducer } from './signout';

const initialState = {
  user: null,
  pinUserPending: false,
  userAlreadyPin: false,

  signinPending: false,
  signoutPending: false,
  signupPending: false,

  lastError: null,
};

const reducers = [
  pinUserReducer,
  addUserReducer,
  signinReducer,
  signoutReducer,
];

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
