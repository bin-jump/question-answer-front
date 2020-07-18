import { reducer as fetchQuestionReducer } from './fetchQuestion';
import { reducer as fetchCommentReducer } from './fetchComments';

const initialState = {
  question: null,
  questionComments: [],
  answers: [],
  answerComments: {},

  fetchQuestionPending: false,
  fetchAnswerPending: false,
  fetchAnswerAfter: null,

  fetchQuesionCommentPendiong: false,
  fetchAnswerCommentPending: {},
  fetchQuesionCommentAfter: null,
  fetchAnswerCommentAfter: {},

  addAnswerPending: false,
  addQuestionCommentPending: false,
  addAnswerCommentPending: {},

  questionThumbUpPending: false,
  answerVotePending: {},

  lastError: null,
};

const reducers = [fetchQuestionReducer, fetchCommentReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    default:
      newState = state;
      break;
  }

  return reducers.reduce((s, r) => r(s, action), newState);
}
