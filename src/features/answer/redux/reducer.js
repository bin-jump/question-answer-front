import { reducer as fetchQuestionsReducer } from './fetchQuestions';
import { ANSWER_RESET } from './constants';

const initialState = {
  questions: [],
  hasMore: false,
  fetchQuestionsPending: false,
  lastError: null,
};

const reducers = [fetchQuestionsReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case ANSWER_RESET:
      return initialState;
    default:
      newState = state;
      break;
  }

  return reducers.reduce((s, r) => r(s, action), newState);
}
