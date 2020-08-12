import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { COMMON_SHOW_SUCCESS, COMMON_CLOSE_SUCCESS } from './constants';

export function useShowSuccess() {
  const dispatch = useDispatch();

  const { successMessage, displaySuccess } = useSelector(
    (state) => ({
      successMessage: state.common.successMessage,
      displaySuccess: state.common.displaySuccess,
    }),
    shallowEqual,
  );

  const boundActionShow = useCallback(
    (message) => {
      dispatch({ type: COMMON_SHOW_SUCCESS, message });
    },
    [dispatch],
  );

  const boundActionClose = useCallback(() => {
    dispatch({ type: COMMON_CLOSE_SUCCESS });
  }, [dispatch]);

  return {
    showSuccess: boundActionShow,
    closeSuccess: boundActionClose,
    successMessage,
    displaySuccess,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SHOW_SUCCESS:
      return {
        ...state,
        successMessage: action.message,
        displaySuccess: true,
      };

    case COMMON_CLOSE_SUCCESS:
      return {
        ...state,
        successMessage: '',
        displaySuccess: false,
      };

    default:
      return state;
  }
}
