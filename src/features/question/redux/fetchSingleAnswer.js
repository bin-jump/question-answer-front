import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  QUESTION_FETCH_SINGLE_ANSWER_BEGIN,
  QUESTION_FETCH_SINGLE_ANSWER_SUCCESS,
  QUESTION_FETCH_SINGLE_ANSWER_FAILURE,
} from './constants';

export function fetchSingleAnswer(id, questionId) {
  let url = `/api/answer/${id}`;
  if (questionId) {
    url = `${url}?questionId=${questionId}`;
  }
  return getRequest(
    url,
    QUESTION_FETCH_SINGLE_ANSWER_BEGIN,
    QUESTION_FETCH_SINGLE_ANSWER_SUCCESS,
    QUESTION_FETCH_SINGLE_ANSWER_FAILURE,
  );
}

export function useFetchSingleAnswer() {
  const dispatch = useDispatch();
  const { answers, fetchAnswerAfter, fetchAnswerPending, error } = useSelector(
    (state) => ({
      answers: state.question.answers,
      fetchAnswerAfter: state.question.fetchAnswerAfter,
      fetchAnswerPending: state.question.fetchAnswerPending,
      error: state.question.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (id, questionId) => {
      dispatch(fetchSingleAnswer(id, questionId));
    },
    [dispatch],
  );

  return {
    fetchSingleAnswer: boundAction,
    answers,
    fetchAnswerAfter,
    fetchAnswerPending,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case QUESTION_FETCH_SINGLE_ANSWER_BEGIN:
      return {
        ...state,
        fetchAnswerPending: true,
        lastError: null,
      };

    case QUESTION_FETCH_SINGLE_ANSWER_SUCCESS:
      let answer = {
        ...action.data.data,
        comments: [],
        commentAfter: null,
        commentPending: false,
        showComment: false,
        addCommentPending: false,
        votePending: false,
      };

      return {
        ...state,
        answers: [answer],
        //fetchAnswerAfter: action.data.data.dist ? action.data.data.after : null,
        fetchAnswerPending: false,
        lastError: null,
      };

    case QUESTION_FETCH_SINGLE_ANSWER_FAILURE:
      return {
        ...state,
        fetchAnswerPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
