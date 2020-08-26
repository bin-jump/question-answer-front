import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_FETCH_HOT_QUESTION_BEGIN,
  HOME_FETCH_HOT_QUESTION_SUCCESS,
  HOME_FETCH_HOT_QUESTION_FAILURE,
} from './constants';

export function fetchHotQuestion() {
  let url = `/api/question/hot`;

  return getRequest(
    url,
    HOME_FETCH_HOT_QUESTION_BEGIN,
    HOME_FETCH_HOT_QUESTION_SUCCESS,
    HOME_FETCH_HOT_QUESTION_FAILURE,
  );
}

export function useFetchHotQuestion() {
  const dispatch = useDispatch();
  const { hotQuestions, fetchHotQuestionsPending, lastError } = useSelector(
    (state) => ({
      hotQuestions: state.home.hotQuestions,
      fetchHotQuestionsPending: state.home.fetchHotQuestionsPending,
      lastError: state.home.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    dispatch(fetchHotQuestion());
  }, [dispatch]);

  return {
    hotQuestions,
    fetchHotQuestion: boundAction,
    fetchHotQuestionsPending,
    lastError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_FETCH_HOT_QUESTION_BEGIN:
      return {
        ...state,
        fetchHotQuestionsPending: true,
        lastError: null,
      };

    case HOME_FETCH_HOT_QUESTION_SUCCESS:
      return {
        ...state,
        hotQuestions: [...action.data.data],
        fetchHotQuestionsPending: false,
        lastError: null,
      };

    case HOME_FETCH_HOT_QUESTION_FAILURE:
      return {
        ...state,
        fetchHotQuestionsPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
