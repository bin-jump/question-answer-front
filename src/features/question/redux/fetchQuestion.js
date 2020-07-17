import { listFetch } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  QUESTION_FETCH_QUESTION_BEGIN,
  QUESTION_FETCH_QUESTION_SUCCESS,
  QUESTION_FETCH_QUESTION_FAILURE,
} from './constants';

export function fetchQuestion(id) {
  return listFetch(
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

  const boundAction = useCallback(() => {
    dispatch(fetchQuestion());
  }, [dispatch]);

  return {
    fetchQuestionList: boundAction,
    question,
    fetchQuestionPending,
    error,
  };
}
