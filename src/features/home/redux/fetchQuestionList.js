import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_FETCH_QUESTION_LIST_BEGIN,
  HOME_FETCH_QUESTION_LIST_SUCCESS,
  HOME_FETCH_QUESTION_LIST_FAILURE,
} from './constants';

export function fetchQuestionList(after) {
  let url = '/api/question';
  if (after) {
    url = `${url}?after=${after}`;
  }
  return getRequest(
    url,
    HOME_FETCH_QUESTION_LIST_BEGIN,
    HOME_FETCH_QUESTION_LIST_SUCCESS,
    HOME_FETCH_QUESTION_LIST_FAILURE,
  );
}

export function useFetchQuestionList() {
  const dispatch = useDispatch();
  const {
    questionList,
    questionAfter,
    fetchQuestionListPending,
    fetchQuestionListError,
  } = useSelector(
    (state) => ({
      questionList: state.home.questionList,
      questionAfter: state.home.questionAfter,
      fetchQuestionListPending: state.home.fetchQuestionListPending,
      fetchQuestionListError: state.home.fetchQuestionListError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (questionAfter) => {
      dispatch(fetchQuestionList(questionAfter));
    },
    [dispatch],
  );

  return {
    questionList,
    fetchQuestionList: boundAction,
    fetchQuestionListPending,
    fetchQuestionListError,
    questionAfter,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_FETCH_QUESTION_LIST_BEGIN:
      return {
        ...state,
        fetchQuestionListPending: true,
        fetchQuestionListError: null,
      };

    case HOME_FETCH_QUESTION_LIST_SUCCESS:
      return {
        ...state,
        questionList: [...state.questionList, ...action.data.data.children],
        questionAfter: action.data.data.dist ? action.data.data.after : null,
        fetchQuestionListPending: false,
        fetchQuestionListError: null,
      };

    case HOME_FETCH_QUESTION_LIST_FAILURE:
      return {
        ...state,
        fetchQuestionListPending: false,
        fetchQuestionListError: action.data.error,
      };

    default:
      return state;
  }
}
