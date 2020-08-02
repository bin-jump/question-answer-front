import { reducer as showErrorReducer } from './showError';

const initialState = {
  errorMessage: '',
  displayError: false,
};

const reducers = [showErrorReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    default:
      newState = state;
      break;
  }

  return reducers.reduce((s, r) => r(s, action), newState);
}
