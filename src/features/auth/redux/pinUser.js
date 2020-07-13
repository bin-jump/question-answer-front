import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_UPDATE_SIGNIN } from './constants';

export function pinUser() {
  return (dispatch) => {
    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get('/api/user');
      doRequest.then(
        (res) => {
          dispatch({
            type: AUTH_UPDATE_SIGNIN,
            data: res.data,
          });
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function usePinUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const boundAction = useCallback(() => {
    dispatch(pinUser());
  }, [dispatch]);

  return { user, pinUser: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_UPDATE_SIGNIN:
      return {
        ...state,
        user: action.data.data,
      };

    default:
      return state;
  }
}
