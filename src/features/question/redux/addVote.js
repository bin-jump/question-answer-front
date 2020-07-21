import { postRequest, deleteRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  QUESTION_VOTE_BEGIN,
  QUESTION_VOTE_SUCCESS,
  QUESTION_VOTE_FAILURE,
} from './constants';

export function voteQuestion(id, voteType, neutral) {
  let url = `/api/question/${id}/vote`;
  let data = { voteType: voteType };
  if (neutral) {
    return deleteRequest(
      url,
      QUESTION_VOTE_BEGIN,
      QUESTION_VOTE_SUCCESS,
      QUESTION_VOTE_FAILURE,
    );
  }
  return postRequest(
    url,
    data,
    QUESTION_VOTE_BEGIN,
    QUESTION_VOTE_SUCCESS,
    QUESTION_VOTE_FAILURE,
  );
}

export function useVoteQuestion() {
  const dispatch = useDispatch();
  const { questionVotePending, error } = useSelector(
    (state) => ({
      questionVotePending: state.question.questionVotePending,
      error: state.question.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (id, voteType, neutral) => {
      dispatch(voteQuestion(id, voteType, neutral));
    },
    [dispatch],
  );

  return {
    voteQuestion: boundAction,
    questionVotePending,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case QUESTION_VOTE_BEGIN:
      return {
        ...state,
        questionVotePending: true,
        lastError: null,
      };
    case QUESTION_VOTE_SUCCESS:
      return {
        ...state,
        question: {
          ...state.question,
          voteupCount: state.question.voteupCount + action.data.data.vote,
          upvoted:
            action.data.data.vote === 1 &&
            action.data.data.voteType === 'UPVOTE'
              ? true
              : false,
        },
        questionVotePending: false,
        lastError: null,
      };

    case QUESTION_VOTE_FAILURE:
      return {
        ...state,
        questionVotePending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
