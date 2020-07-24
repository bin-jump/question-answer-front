import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  PROFILE_FETCH_USER_INFO_BEGIN,
  PROFILE_FETCH_USER_INFO_SUCCESS,
  PROFILE_FETCH_USER_INFO_FAILURE,
} from './constants';

export function fetchUserInfo(id) {
  let url = `/api/user/${id}`;
  return getRequest(
    url,
    PROFILE_FETCH_USER_INFO_BEGIN,
    PROFILE_FETCH_USER_INFO_SUCCESS,
    PROFILE_FETCH_USER_INFO_FAILURE,
  );
}

export function useFetchUserInfo() {
  const dispatch = useDispatch();
  const { user, fetchUserInfoPending, lastError } = useSelector(
    (state) => ({
      user: state.profile.userInfo,
      fetchUserInfoPending: state.profile.fetchUserInfoPending,
      lastError: state.profile.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (id) => {
      dispatch(fetchUserInfo(id));
    },
    [dispatch],
  );

  return {
    user,
    fetchUserInfo: boundAction,
    fetchUserInfoPending,
    lastError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PROFILE_FETCH_USER_INFO_BEGIN:
      return {
        ...state,
        fetchUserInfoPending: true,
        lastError: null,
      };

    case PROFILE_FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.data.data,
        fetchUserInfoPending: false,
        lastError: null,
      };

    case PROFILE_FETCH_USER_INFO_FAILURE:
      return {
        ...state,
        fetchUserInfoPending: false,
        lastError: action.data.error,
      };
    default:
      return state;
  }
}
