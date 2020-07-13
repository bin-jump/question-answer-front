import { reducer as pinUser } from './pinUser';

const initialState = {
  id: 111,
  user: null,
};

const reducers = [pinUser];

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
