import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { HOME_RESET } from './constants';

export function useReset() {
  const dispatch = useDispatch();
  const boundAction = useCallback(() => {
    dispatch({ type: HOME_RESET });
  }, [dispatch]);

  return { resetState: boundAction };
}
