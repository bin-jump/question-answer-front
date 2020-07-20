import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  QUESTION_FETCH_QUESTION_COMMENT_BEGIN,
  QUESTION_FETCH_QUESTION_COMMENT_SUCCESS,
  QUESTION_FETCH_QUESTION_COMMENT_FAILURE,
  QUESTION_FETCH_ANSWER_COMMENT_BEGIN,
  QUESTION_FETCH_ANSWER_COMMENT_SUCCESS,
  QUESTION_FETCH_ANSWER_COMMENT_FAILURE,
} from './constants';

export function fetchQuestionComment(id, after) {
  let url = `/api/question/${id}/comment`;
  if (after) {
    url = `${url}?after=${after}`;
  }
  return getRequest(
    url,
    QUESTION_FETCH_QUESTION_COMMENT_BEGIN,
    QUESTION_FETCH_QUESTION_COMMENT_SUCCESS,
    QUESTION_FETCH_QUESTION_COMMENT_FAILURE,
    id,
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

export function fetchAnswerComment(id, after) {
  let url = `/api/answer/${id}/comment`;
  if (after) {
    url = `${url}?after=${after}`;
  }
  return getRequest(
    url,
    QUESTION_FETCH_ANSWER_COMMENT_BEGIN,
    QUESTION_FETCH_ANSWER_COMMENT_SUCCESS,
    QUESTION_FETCH_ANSWER_COMMENT_FAILURE,
    id,
  );
}

export function useFetchAnswerComment() {
  const dispatch = useDispatch();
  // const {
  //   answerComments,
  //   answerCommentAfter,
  //   fetchAnswerCommentPending,
  //   error,
  // } = useSelector(
  //   (state) => ({
  //     answerComments: state.question.answerComments,
  //     fetchAnswerCommentAfter: state.question.fetchAnswerCommentAfter,
  //     fetchAnswerCommentPending: state.question.fetchAnswerCommentPending,
  //     error: state.question.lastError,
  //   }),
  //   shallowEqual,
  // );

  const boundAction = useCallback(
    (id, after) => {
      dispatch(fetchAnswerComment(id, after));
    },
    [dispatch],
  );

  return {
    fetchAnswerComment: boundAction,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    // question comments
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

    // answer comments
    case QUESTION_FETCH_ANSWER_COMMENT_BEGIN:
      return {
        ...state,
        answers: state.answers.map((item, i) => {
          if (item.id === action.id) {
            item.commentPending = true;
          }
          return { ...item };
        }),
        lastError: null,
      };

    case QUESTION_FETCH_ANSWER_COMMENT_SUCCESS:
      return {
        ...state,
        answers: state.answers.map((item, i) => {
          if (item.id === action.id) {
            item.commentPending = false;
            item.comments = [...item.comments, ...action.data.data.children];
            item.showComment = true;
            item.commentAfter = action.data.data.dist
              ? action.data.data.after
              : null;
          }
          return { ...item };
        }),
        lastError: null,
      };

    case QUESTION_FETCH_ANSWER_COMMENT_FAILURE:
      return {
        ...state,
        answers: state.answers.map((item, i) => {
          if (item.id === action.id) {
            item.commentPending = false;
          }
          return { ...item };
        }),
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
