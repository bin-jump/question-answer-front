import { reducer as fetchQuestionsReducer } from './fetchQuestionList';
import { HOME_RESET } from './constants';

const initialState = {
  questionAfter: null,
  questionList: [],
  fetchQuestionListPending: false,
  fetchQuestionListError: null,
};

const reducers = [fetchQuestionsReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case HOME_RESET:
      return initialState;
    default:
      newState = state;
      break;
  }

  return reducers.reduce((s, r) => r(s, action), newState);
}
