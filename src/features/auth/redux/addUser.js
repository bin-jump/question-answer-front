import { postRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  AUTH_SIGNUP_BEGIN,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE,
  AUTH_SIGNUP_MESSAGE_RESET,
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
  const { signupPending, signupMessage, error } = useSelector(
    (state) => ({
      signupPending: state.auth.signupPending,
      signupMessage: state.auth.signupMessage,
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

  const boundActionReset = useCallback(() => {
    dispatch({ type: AUTH_SIGNUP_MESSAGE_RESET });
  }, [dispatch]);

  return {
    addUser: boundAction,
    resetMessage: boundActionReset,
    signupMessage,
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
        signupPending: false,
      };

    case AUTH_SIGNUP_FAILURE:
      return {
        ...state,
        signupPending: false,
        lastError: action.data.error,
      };

    case AUTH_SIGNUP_MESSAGE_RESET:
      return {
        ...state,
        signupMessage: '',
      };

    default:
      return state;
  }
}
