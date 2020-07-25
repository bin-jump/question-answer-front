import { reducer as fetchQuestionsReducer } from './fetchQuestionList';
import { reducer as addQuestionReducer } from './addQuestion';
import { HOME_RESET } from './constants';

const initialState = {
  questionAfter: null,
  questionList: [],
  fetchQuestionListPending: false,
  addQuestionPending: false,
  lastError: null,
};

const reducers = [fetchQuestionsReducer, addQuestionReducer];

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
