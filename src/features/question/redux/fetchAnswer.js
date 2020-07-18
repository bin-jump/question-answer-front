import { listFetch } from '../../common/helper';
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
  return listFetch(
    url,
    QUESTION_FETCH_ANSWER_BEGIN,
    QUESTION_FETCH_ANSWER_SUCCESS,
    QUESTION_FETCH_ANSWER_FAILURE,
  );
}

export function useFetchAnswers() {
  const dispatch = useDispatch();
  const { answers, answerAfter, fetchAnswerPending, error } = useSelector(
    (state) => ({
      answers: state.question.answers,
      answerAfter: state.question.fetchAnswerAfter,
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
    answerAfter,
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
            return item;
          }),
        ],
        answerAfter: action.data.data.dist ? action.data.data.after : null,
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
