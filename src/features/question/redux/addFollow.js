import { postRequest, deleteRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  QUESTION_FOLLOW_BEGIN,
  QUESTION_FOLLOW_SUCCESS,
  QUESTION_FOLLOW_FAILURE,
} from './constants';

export function followQuestion(id, unfollow) {
  let url = `/api/question/${id}/follow`;
  if (unfollow) {
    return deleteRequest(
      url,
      QUESTION_FOLLOW_BEGIN,
      QUESTION_FOLLOW_SUCCESS,
      QUESTION_FOLLOW_FAILURE,
    );
  }
  return postRequest(
    url,
    null,
    QUESTION_FOLLOW_BEGIN,
    QUESTION_FOLLOW_SUCCESS,
    QUESTION_FOLLOW_FAILURE,
  );
}

export function useFollowQuestion() {
  const dispatch = useDispatch();
  const { questionFollowPending, error } = useSelector(
    (state) => ({
      questionFollowPending: state.question.questionFollowPending,
      error: state.question.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (id, unfollow) => {
      dispatch(followQuestion(id, unfollow));
    },
    [dispatch],
  );

  return {
    followQuestion: boundAction,
    questionFollowPending,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case QUESTION_FOLLOW_BEGIN:
      return {
        ...state,
        questionFollowPending: true,
        lastError: null,
      };
    case QUESTION_FOLLOW_SUCCESS:
      return {
        ...state,
        question: {
          ...state.question,
          following: action.data.data.follow === 1 ? true : false,
          followCount: (state.question.followCount += action.data.data.follow),
        },
        questionFollowPending: false,
        lastError: null,
      };

    case QUESTION_FOLLOW_FAILURE:
      return {
        ...state,
        questionVotePending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
