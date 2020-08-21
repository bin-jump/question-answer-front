import { postRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  ACCOUNT_UPDATE_AVATAR_BEGIN,
  ACCOUNT_UPDATE_AVATAR_SUCCESS,
  ACCOUNT_UPDATE_AVATAR_FAILURE,
} from './constants';

export function updateAvatar(file) {
  let url = `/api/user/avatar`;
  const formData = new FormData();
  formData.append('image', file);
  return postRequest(
    url,
    formData,
    ACCOUNT_UPDATE_AVATAR_BEGIN,
    ACCOUNT_UPDATE_AVATAR_SUCCESS,
    ACCOUNT_UPDATE_AVATAR_FAILURE,
  );
}

export function useUpdateAvatar() {
  const dispatch = useDispatch();
  const { updateAvatarPending, error } = useSelector(
    (state) => ({
      updateAvatarPending: state.account.updateAvatarPending,
      error: state.account.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (file) => {
      dispatch(updateAvatar(file));
    },
    [dispatch],
  );

  return {
    updateAvatar: boundAction,
    updateAvatarPending,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNT_UPDATE_AVATAR_BEGIN:
      return {
        ...state,
        updateAvatarPending: true,
      };
    case ACCOUNT_UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        updateAvatarPending: false,
      };
    case ACCOUNT_UPDATE_AVATAR_FAILURE:
      return {
        ...state,
        updateAvatarPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
