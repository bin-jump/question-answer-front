import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  QUESTION_FETCH_ANSWER_BEGIN,
  QUESTION_FETCH_ANSWER_SUCCESS,
  QUESTION_FETCH_ANSWER_FAILURE,
} from './constants';

export function fetchAnswers(id, after) {
  let url = `/api/question/${id}/answer`;
  if (after) {
    url = `${url}?after=${after}`;
  }
  return getRequest(
    url,
    QUESTION_FETCH_ANSWER_BEGIN,
    QUESTION_FETCH_ANSWER_SUCCESS,
    QUESTION_FETCH_ANSWER_FAILURE,
  );
}

export function useFetchAnswers() {
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
    (id, after) => {
      dispatch(fetchAnswers(id, after));
    },
    [dispatch],
  );

  return {
    fetchAnswers: boundAction,
    answers,
    fetchAnswerAfter,
    fetchAnswerPending,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case QUESTION_FETCH_ANSWER_BEGIN:
      return {
        ...state,
        fetchAnswerPending: true,
        lastError: null,
      };

    case QUESTION_FETCH_ANSWER_SUCCESS:
      return {
        ...state,
        answers: [
          ...state.answers,
          ...action.data.data.children.map((item) => {
            item.comments = [];
            item.commentAfter = null;
            item.commentPending = false;
            item.showComment = false;
            item.addCommentPending = false;
            item.upvotePending = false;
            item.downvotePending = false;
            return item;
          }),
        ],
        fetchAnswerAfter: action.data.data.dist ? action.data.data.after : null,
        fetchAnswerPending: false,
        lastError: null,
      };

    case QUESTION_FETCH_ANSWER_FAILURE:
      return {
        ...state,
        fetchAnswerPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
