import { reducer as fetchQuestionReducer } from './fetchQuestion';
import { reducer as fetchCommentReducer } from './fetchComments';
import { reducer as fetchAnswerReducer } from './fetchAnswer';
import { reducer as addCommentReducer } from './addComment';
import { QUESTION_RESET } from './constants';

const initialState = {
  question: null,
  questionComments: [],
  answers: [],

  fetchQuestionPending: false,
  fetchAnswerPending: false,
  fetchAnswerAfter: null,

  fetchQuesionCommentPending: false,
  fetchQuesionCommentAfter: null,

  addAnswerPending: false,
  addQuestionCommentPending: false,

  questionThumbUpPending: false,

  lastError: null,
};

const reducers = [
  fetchQuestionReducer,
  fetchCommentReducer,
  fetchAnswerReducer,
  addCommentReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case QUESTION_RESET:
      return initialState;
    default:
      newState = state;
      break;
  }

  return reducers.reduce((s, r) => r(s, action), newState);
}
