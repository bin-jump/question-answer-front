import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  AUTH_UPDATE_SIGNIN_BEGIN,
  AUTH_UPDATE_SIGNIN_SUCCESS,
  AUTH_UPDATE_SIGNIN_FAILURE,
} from './constants';

export function pinUser() {
  let url = '/api/user';

  return getRequest(
    url,
    AUTH_UPDATE_SIGNIN_BEGIN,
    AUTH_UPDATE_SIGNIN_SUCCESS,
    AUTH_UPDATE_SIGNIN_FAILURE,
  );
}

export function usePinUser() {
  const dispatch = useDispatch();
  const { user, pinUserPending, error } = useSelector(
    (state) => ({
      user: state.auth.user,
      pinUserPending: state.auth.pinUserPending,
      error: state.auth.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    dispatch(pinUser());
  }, [dispatch]);

  return { user, pinUser: boundAction, pinUserPending, error };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_UPDATE_SIGNIN_BEGIN:
      return {
        ...state,
        pinUserPending: true,
      };
    case AUTH_UPDATE_SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.data.data,
        pinUserPending: false,
      };

    case AUTH_UPDATE_SIGNIN_FAILURE:
      return {
        ...state,
        pinUserPending: false,
        fetchQuestionListError: action.data.error,
      };

    default:
      return state;
  }
}
