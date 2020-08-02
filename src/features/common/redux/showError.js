import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { COMMON_SHOW_ERROR, COMMON_CLOSE_ERROR } from './constants';

export function useShowError() {
  const dispatch = useDispatch();

  const { errorMessage, displayError } = useSelector(
    (state) => ({
      errorMessage: state.common.errorMessage,
      displayError: state.common.displayError,
    }),
    shallowEqual,
  );

  const boundActionShow = useCallback(
    (message) => {
      dispatch({ type: COMMON_SHOW_ERROR, message });
    },
    [dispatch],
  );

  const boundActionClose = useCallback(() => {
    dispatch({ type: COMMON_CLOSE_ERROR });
  }, [dispatch]);

  return {
    showError: boundActionShow,
    closeError: boundActionClose,
    errorMessage,
    displayError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SHOW_ERROR:
      return {
        ...state,
        errorMessage: action.message,
        displayError: true,
      };

    case COMMON_CLOSE_ERROR:
      return {
        ...state,
        errorMessage: '',
        displayError: false,
      };

    default:
      return state;
  }
}
