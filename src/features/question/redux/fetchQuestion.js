import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  QUESTION_FETCH_QUESTION_BEGIN,
  QUESTION_FETCH_QUESTION_SUCCESS,
  QUESTION_FETCH_QUESTION_FAILURE,
} from './constants';

export function fetchQuestion(id) {
  return getRequest(
    `/api/question/${id}`,
    QUESTION_FETCH_QUESTION_BEGIN,
    QUESTION_FETCH_QUESTION_SUCCESS,
    QUESTION_FETCH_QUESTION_FAILURE,
  );
}

export function useFetchQuestion() {
  const dispatch = useDispatch();
  const { question, fetchQuestionPending, error } = useSelector(
    (state) => ({
      question: state.question.question,
      fetchQuestionPending: state.question.fetchQuestionPending,
      error: state.question.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (id) => {
      dispatch(fetchQuestion(id));
    },
    [dispatch],
  );

  return {
    fetchQuestion: boundAction,
    question,
    fetchQuestionPending,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case QUESTION_FETCH_QUESTION_BEGIN:
      return {
        ...state,
        fetchQuestionPending: true,
        lastError: null,
      };

    case QUESTION_FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        question: action.data.data,
        fetchQuestionPending: false,
        lastError: null,
      };

    case QUESTION_FETCH_QUESTION_FAILURE:
      return {
        ...state,
        fetchQuestionPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
