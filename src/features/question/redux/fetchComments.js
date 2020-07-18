import { listFetch } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  QUESTION_FETCH_QUESTION_COMMENT_BEGIN,
  QUESTION_FETCH_QUESTION_COMMENT_SUCCESS,
  QUESTION_FETCH_QUESTION_COMMENT_FAILURE,
} from './constants';

export function fetchQuestionComment(id) {
  return listFetch(
    `/api/question/${id}/comment`,
    QUESTION_FETCH_QUESTION_COMMENT_BEGIN,
    QUESTION_FETCH_QUESTION_COMMENT_SUCCESS,
    QUESTION_FETCH_QUESTION_COMMENT_FAILURE,
  );
}

export function useFetchQuestionComment() {
  const dispatch = useDispatch();
  const {
    questionComments,
    quesionCommentAfter,
    fetchQuestionCommentPending,
    error,
  } = useSelector(
    (state) => ({
      questionComments: state.question.questionComments,
      quesionCommentAfter: state.question.fetchQuesionCommentAfter,
      fetchQuestionCommentPending: state.question.fetchQuesionCommentPendiong,
      error: state.question.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (id) => {
      dispatch(fetchQuestionComment(id));
    },
    [dispatch],
  );

  return {
    fetchQuestionComment: boundAction,
    questionComments,
    quesionCommentAfter,
    fetchQuestionCommentPending,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case QUESTION_FETCH_QUESTION_COMMENT_BEGIN:
      return {
        ...state,
        fetchQuesionCommentPendiong: true,
        lastError: null,
      };

    case QUESTION_FETCH_QUESTION_COMMENT_SUCCESS:
      return {
        ...state,
        questionComments: [
          ...state.questionComments,
          ...action.data.data.children,
        ],
        fetchQuesionCommentAfter: action.data.data.dist
          ? action.data.data.after
          : null,
        fetchQuesionCommentPendiong: false,
        lastError: null,
      };

    case QUESTION_FETCH_QUESTION_COMMENT_FAILURE:
      return {
        ...state,
        fetchQuesionCommentPendiong: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
