import { postRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  AUTH_SIGNOUT_BEGIN,
  AUTH_SIGNOUT_SUCCESS,
  AUTH_SIGNOUT_FAILURE,
} from './constants';

export function signout() {
  let url = '/signout';

  return postRequest(
    url,
    null,
    AUTH_SIGNOUT_BEGIN,
    AUTH_SIGNOUT_SUCCESS,
    AUTH_SIGNOUT_FAILURE,
  );
}

export function useSignout() {
  const dispatch = useDispatch();
  const { signoutPending, user, error } = useSelector(
    (state) => ({
      user: state.auth.user,
      signoutPending: state.auth.signoutPending,
      error: state.auth.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    dispatch(signout());
  }, [dispatch]);

  return {
    signout: boundAction,
    user,
    signoutPending,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_SIGNOUT_BEGIN:
      return {
        ...state,
        signoutPending: true,
      };
    case AUTH_SIGNOUT_SUCCESS:
      return {
        ...state,
        user: null,
        signoutPending: false,
      };

    case AUTH_SIGNOUT_FAILURE:
      return {
        ...state,
        signoutPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
