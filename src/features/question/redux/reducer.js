import { reducer as fetchQuestionReducer } from './fetchQuestion';

const initialState = {
  question: null,
  answers: [],
  fetchQuestionPending: false,
  fetchAnswerPending: false,
  fetchAnswerAfter: null,

  addAnswerPending: false,
  addQuestionCommentPending: false,
  addAnswerCommentPending: {},

  fetchQuesionCommentPendiong: false,
  fetchAnswerCommentPending: {},
  fetchQuesionCommentAfter: null,
  fetchAnswerCommentAfter: {},

  questionThumbUpPending: false,
  answerVotePending: {},

  lastError: null,
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
