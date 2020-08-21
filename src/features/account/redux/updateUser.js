import { putRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  ACCOUNT_UPDATE_BEGIN,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_FAILURE,
  ACCOUNT_RESET,
} from './constants';

export function editUser(data) {
  let url = `/api/user`;
  return putRequest(
    url,
    data,
    ACCOUNT_UPDATE_BEGIN,
    ACCOUNT_UPDATE_SUCCESS,
    ACCOUNT_UPDATE_FAILURE,
  );
}

export function changePassword(oldPassword, newPassword) {
  let url = `/api/user/password`;
  let data = { oldPassword, newPassword };
  return putRequest(
    url,
    data,
    ACCOUNT_UPDATE_BEGIN,
    ACCOUNT_UPDATE_SUCCESS,
    ACCOUNT_UPDATE_FAILURE,
  );
}

export function useEditUser() {
  const dispatch = useDispatch();
  const { updatePending, error } = useSelector(
    (state) => ({
      updatePending: state.account.updatePending,
      error: state.account.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (data) => {
      dispatch(editUser(data));
    },
    [dispatch],
  );

  const boundPasswordAction = useCallback(
    (oldPassword, newPassword) => {
      dispatch(changePassword(oldPassword, newPassword));
    },
    [dispatch],
  );

  const boundActionResetAdd = useCallback(() => {
    dispatch({ type: ACCOUNT_RESET });
  }, [dispatch]);

  return {
    editUser: boundAction,
    changePassword: boundPasswordAction,
    resetState: boundActionResetAdd,
    updatePending,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNT_UPDATE_BEGIN:
      return {
        ...state,
        updatePending: true,
      };
    case ACCOUNT_UPDATE_SUCCESS:
      return {
        ...state,
        updatePending: false,
      };

    case ACCOUNT_UPDATE_FAILURE:
      return {
        ...state,
        updatePending: false,
        lastError: action.data.error,
      };

    case ACCOUNT_RESET:
      return {
        ...state,
        updatePending: false,
        lastError: null,
      };

    default:
      return state;
  }
}
