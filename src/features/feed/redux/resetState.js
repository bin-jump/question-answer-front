import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { FEED_RESET } from './constants';

export function useReset() {
  const dispatch = useDispatch();
  const boundAction = useCallback(() => {
    dispatch({ type: FEED_RESET });
  }, [dispatch]);

  return { resetState: boundAction };
}
