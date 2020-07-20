import { postRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  QUESTION_ADD_QUESTION_COMMENT_BEGIN,
  QUESTION_ADD_QUESTION_COMMENT_SUCCESS,
  QUESTION_ADD_QUESTION_COMMENT_FAILURE,
} from './constants';

export function addQuestionComment(id, comment) {
  let url = `/api/question/${id}/comment`;
  let data = { body: comment };
  return postRequest(
    url,
    data,
    QUESTION_ADD_QUESTION_COMMENT_BEGIN,
    QUESTION_ADD_QUESTION_COMMENT_SUCCESS,
    QUESTION_ADD_QUESTION_COMMENT_FAILURE,
    id,
  );
}

export function useAddQuestionComment() {
  const dispatch = useDispatch();
  const { addQuestionCommentPending, error } = useSelector(
    (state) => ({
      addQuestionCommentPending: state.question.addQuestionCommentPending,
      error: state.question.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (id, comment) => {
      dispatch(addQuestionComment(id, comment));
    },
    [dispatch],
  );

  return {
    addQuestionComment: boundAction,
    addQuestionCommentPending,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    // add question comments
    case QUESTION_ADD_QUESTION_COMMENT_BEGIN:
      return {
        ...state,
        addQuestionCommentPending: true,
        lastError: null,
      };
    case QUESTION_ADD_QUESTION_COMMENT_SUCCESS:
      return {
        ...state,
        questionComments: [action.data.data, ...state.questionComments],
        addQuestionCommentPending: false,
        lastError: null,
      };

    case QUESTION_ADD_QUESTION_COMMENT_FAILURE:
      return {
        ...state,
        addQuestionCommentPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
