import { reducer as showErrorReducer } from './showError';
import { reducer as showSuccessReducer } from './showSuccess';

const initialState = {
  errorMessage: '',
  displayError: false,

  successMessage: '',
  displaySuccess: false,
};

const reducers = [showErrorReducer, showSuccessReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    default:
      newState = state;
      break;
  }

  return reducers.reduce((s, r) => r(s, action), newState);
}
