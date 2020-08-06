import { postRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  AUTH_SIGNIN_BEGIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAILURE,
} from './constants';

export function signin(userName, password, rememberMe) {
  let url = '/signin';
  //let data = { name: userName, password, rememberMe };
  let data = new FormData();
  data.set('username', userName);
  data.set('password', password);
  data.set('rememberme', rememberMe);
  return postRequest(
    url,
    data,
    AUTH_SIGNIN_BEGIN,
    AUTH_SIGNIN_SUCCESS,
    AUTH_SIGNIN_FAILURE,
  );
}

export function useSignin() {
  const dispatch = useDispatch();
  const { signinPending, user, error } = useSelector(
    (state) => ({
      user: state.auth.user,
      signinPending: state.auth.signinPending,
      error: state.auth.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (userName, password, rememberMe) => {
      dispatch(signin(userName, password, rememberMe));
    },
    [dispatch],
  );

  return {
    signin: boundAction,
    user,
    signinPending,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_SIGNIN_BEGIN:
      return {
        ...state,
        signinPending: true,
      };
    case AUTH_SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.data.data,
        signinPending: false,
      };

    case AUTH_SIGNIN_FAILURE:
      return {
        ...state,
        signinPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
