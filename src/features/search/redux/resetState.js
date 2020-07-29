import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { SEARCH_RESET } from './constants';

export function useReset() {
  const dispatch = useDispatch();
  const boundAction = useCallback(() => {
    dispatch({ type: SEARCH_RESET });
  }, [dispatch]);

  return { resetState: boundAction };
}
