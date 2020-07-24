import { postRequest, deleteRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  PROFILE_FOLLOW_USER_BEGIN,
  PROFILE_FOLLOW_USER_SUCCESS,
  PROFILE_FOLLOW_USER_FAILURE,
} from './constants';

export function followUser(id, unfollow) {
  let url = `/api/user/${id}/follow`;

  if (unfollow) {
    return deleteRequest(
      url,
      PROFILE_FOLLOW_USER_BEGIN,
      PROFILE_FOLLOW_USER_SUCCESS,
      PROFILE_FOLLOW_USER_FAILURE,
    );
  }

  return postRequest(
    url,
    null,
    PROFILE_FOLLOW_USER_BEGIN,
    PROFILE_FOLLOW_USER_SUCCESS,
    PROFILE_FOLLOW_USER_FAILURE,
  );
}

export function useFollowUser() {
  const dispatch = useDispatch();
  const { user, followUserPending, lastError } = useSelector(
    (state) => ({
      user: state.profile.userInfo,
      followUserPending: state.profile.followUserPending,
      lastError: state.profile.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (id, unfollow) => {
      dispatch(followUser(id, unfollow));
    },
    [dispatch],
  );

  return {
    user,
    followUser: boundAction,
    followUserPending,
    lastError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PROFILE_FOLLOW_USER_BEGIN:
      return {
        ...state,
        followUserPending: true,
        lastError: null,
      };

    case PROFILE_FOLLOW_USER_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          following: action.data.data.follow > 0,
          followerCount: state.userInfo.followerCount + action.data.data.follow,
        },
        followUserPending: false,
        lastError: null,
      };

    case PROFILE_FOLLOW_USER_FAILURE:
      return {
        ...state,
        followUserPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
