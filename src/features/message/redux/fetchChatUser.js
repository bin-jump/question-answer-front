import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  MESSAGE_FETCH_CHAT_USER_BEGIN,
  MESSAGE_FETCH_CHAT_USER_SUCCESS,
  MESSAGE_FETCH_CHAT_USER_FAILURE,
  MESSAGE_CHAT_USER_RESET,
} from './constants';

let version = 0;
export function fetchChatUser(name) {
  let url = `/api/user?name=${name}`;
  version += 1;
  return getRequest(
    url,
    MESSAGE_FETCH_CHAT_USER_BEGIN,
    MESSAGE_FETCH_CHAT_USER_SUCCESS,
    MESSAGE_FETCH_CHAT_USER_FAILURE,
    null,
    { version },
  );
}

export function useFetchChatUser() {
  const dispatch = useDispatch();
  const { users, fetchUserPending, error } = useSelector(
    (state) => ({
      users: state.message.users,
      fetchUserPending: state.message.fetchUserPending,
      error: state.message.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (name) => {
      dispatch(fetchChatUser(name));
    },
    [dispatch],
  );

  return {
    fetchChatUser: boundAction,
    users,
    fetchUserPending,
    error,
  };
}

export function useChatUserReset() {
  const dispatch = useDispatch();
  const boundAction = useCallback(() => {
    dispatch({ type: MESSAGE_CHAT_USER_RESET });
  }, [dispatch]);

  return { resetChatUser: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case MESSAGE_FETCH_CHAT_USER_BEGIN:
      return {
        ...state,
        fetchUserPending: true,
        lastError: null,
      };

    case MESSAGE_FETCH_CHAT_USER_SUCCESS:
      if (action.extra.version < version) {
        return state;
      }
      return {
        ...state,
        users: [action.data.data],
        fetchUserPending: true,
      };

    case MESSAGE_FETCH_CHAT_USER_FAILURE:
      return {
        ...state,
        fetchUserPending: false,
        lastError: action.data.error,
      };

    case MESSAGE_CHAT_USER_RESET:
      version += 1;
      return {
        ...state,
        users: [],
      };

    default:
      return state;
  }
}
