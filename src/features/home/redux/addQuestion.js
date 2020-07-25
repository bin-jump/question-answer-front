import { postRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_ADD_QUESTION_BEGIN,
  HOME_ADD_QUESTION_SUCCESS,
  HOME_ADD_QUESTION_FAILURE,
} from './constants';

export function addQuestion(content) {
  let url = `/api/question`;
  if (!content.title) {
    return;
  }
  let data = content;
  return postRequest(
    url,
    data,
    HOME_ADD_QUESTION_BEGIN,
    HOME_ADD_QUESTION_SUCCESS,
    HOME_ADD_QUESTION_FAILURE,
  );
}

export function useAddQuestion() {
  const dispatch = useDispatch();
  const { addQuestionPending, error } = useSelector(
    (state) => ({
      addQuestionPending: state.home.addQuestionPending,
      error: state.home.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (content) => {
      dispatch(addQuestion(content));
    },
    [dispatch],
  );

  return {
    addQuestion: boundAction,
    addQuestionPending,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_ADD_QUESTION_BEGIN:
      return {
        ...state,
        addQuestionPending: true,
        lastError: null,
      };

    case HOME_ADD_QUESTION_SUCCESS:
      return {
        ...state,
        questionList: [action.data.data, ...state.questionList],
        addQuestionPending: false,
        lastError: null,
      };

    case HOME_ADD_QUESTION_FAILURE:
      return {
        ...state,
        addQuestionPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
