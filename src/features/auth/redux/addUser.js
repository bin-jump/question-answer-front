import { postRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  AUTH_SIGNUP_BEGIN,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE,
  AUTH_SIGNUP_RESET,
} from './constants';

export function addUser(userName, password, email) {
  let url = '/api/user';
  let data = { name: userName, password: password, email: email };
  return postRequest(
    url,
    data,
    AUTH_SIGNUP_BEGIN,
    AUTH_SIGNUP_SUCCESS,
    AUTH_SIGNUP_FAILURE,
  );
}

export function useAddUser() {
  const dispatch = useDispatch();
  const { signupPending, user, userAdded, error } = useSelector(
    (state) => ({
      user: state.auth.user,
      signupPending: state.auth.signupPending,
      userAdded: state.auth.userAdded,
      error: state.auth.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (userName, password, email) => {
      dispatch(addUser(userName, password, email));
    },
    [dispatch],
  );

  const boundActionResetAdd = useCallback(() => {
    dispatch({ type: AUTH_SIGNUP_RESET });
  }, [dispatch]);

  return {
    addUser: boundAction,
    resetAddUser: boundActionResetAdd,
    user,
    userAdded,
    signupPending,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_SIGNUP_BEGIN:
      return {
        ...state,
        signupPending: true,
      };
    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        signupMessage: action.data.msg,
        userAdded: action.data.status === 'SUCCESS' ? true : false,
        signupPending: false,
      };

    case AUTH_SIGNUP_FAILURE:
      return {
        ...state,
        signupPending: false,
        lastError: action.data.error,
      };

    case AUTH_SIGNUP_RESET:
      return {
        ...state,
        userAdded: false,
        lastError: null,
      };

    default:
      return state;
  }
}
