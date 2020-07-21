import { postRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  QUESTION_ADD_ANSWER_BEGIN,
  QUESTION_ADD_ANSWER_SUCCESS,
  QUESTION_ADD_ANSWER_FAILURE,
} from './constants';

export function addAnswer(id, content) {
  let url = `/api/question/${id}/answer`;
  let data = { body: content };
  return postRequest(
    url,
    data,
    QUESTION_ADD_ANSWER_BEGIN,
    QUESTION_ADD_ANSWER_SUCCESS,
    QUESTION_ADD_ANSWER_FAILURE,
  );
}

export function useAddAnswer() {
  const dispatch = useDispatch();
  const { addAnswerPending, error } = useSelector(
    (state) => ({
      addAnswerPending: state.question.addAnswerPending,
      error: state.question.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (id, content) => {
      dispatch(addAnswer(id, content));
    },
    [dispatch],
  );

  return {
    addAnswer: boundAction,
    addAnswerPending,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case QUESTION_ADD_ANSWER_BEGIN:
      return {
        ...state,
        addAnswerPending: true,
        lastError: null,
      };
    case QUESTION_ADD_ANSWER_SUCCESS:
      return {
        ...state,
        question: {
          ...state.question,
          answerCount: state.question.answerCount + 1,
        },
        answers: [
          {
            ...action.data.data,
            comments: [],
            commentAfter: null,
            commentPending: false,
            showComment: false,
            addCommentPending: false,
            votePending: false,
          },
          ...state.answers,
        ],
        addAnswerPending: false,
        lastError: null,
      };

    case QUESTION_ADD_ANSWER_FAILURE:
      return {
        ...state,
        addAnswerPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
