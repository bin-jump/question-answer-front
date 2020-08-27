import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  ANSWER_FETCH_QUESTION_BEGIN,
  ANSWER_FETCH_QUESTION_SUCCESS,
  ANSWER_FETCH_QUESTION_FAILURE,
  ANSWER_RESET,
} from './constants';

export function fetchQuestions(offset) {
  let url = `/api/question/toanswer?size=${10}`;
  if (offset) {
    url = `${url}&offset=${offset}`;
  }

  return getRequest(
    url,
    ANSWER_FETCH_QUESTION_BEGIN,
    ANSWER_FETCH_QUESTION_SUCCESS,
    ANSWER_FETCH_QUESTION_FAILURE,
    null,
    { size: 10 },
  );
}

export function useFetchQuestions() {
  const dispatch = useDispatch();
  const { questions, hasMore, fetchQuestionsPending, lastError } = useSelector(
    (state) => ({
      questions: state.answer.questions,
      hasMore: state.answer.hasMore,
      fetchQuestionsPending: state.answer.fetchQuestionsPending,
      lastError: state.answer.lastError,
    }),
    shallowEqual,
  );

  const resetAction = useCallback(() => {
    dispatch({ type: ANSWER_RESET });
  }, [dispatch]);

  const boundAction = useCallback(
    (offset) => {
      dispatch(fetchQuestions(offset));
    },
    [dispatch],
  );

  return {
    questions,
    hasMore,
    reset: resetAction,
    fetchQuestion: boundAction,
    fetchQuestionsPending,
    lastError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ANSWER_FETCH_QUESTION_BEGIN:
      return {
        ...state,
        fetchQuestionsPending: true,
        lastError: null,
      };

    case ANSWER_FETCH_QUESTION_SUCCESS:
      console.log(action.data.data.length, action.extra.size);
      return {
        ...state,
        questions: [...action.data.data],
        hasMore: action.data.data.length === action.extra.size,
        fetchQuestionsPending: false,
        lastError: null,
      };

    case ANSWER_FETCH_QUESTION_FAILURE:
      return {
        ...state,
        fetchQuestionsPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
