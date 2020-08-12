import { reducer as updateReducer } from './updateUser';

const initialState = {
  updatePending: false,
  lastError: null,
};

const reducers = [updateReducer];

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
