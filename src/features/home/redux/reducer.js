import { reducer as fetchQuestionReducer } from './fetchQuestionList';

const initialState = {
  questionAfter: null,
  questionList: [],
  fetchQuestionListPending: false,
  fetchQuestionListError: null,
};

const reducers = [fetchQuestionReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    default:
      newState = state;
      break;
  }

  return reducers.reduce((s, r) => r(s, action), newState);
}
