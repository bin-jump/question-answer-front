import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { QUESTION_RESET } from './constants';

export function useReset() {
  const dispatch = useDispatch();
  const boundAction = useCallback(() => {
    dispatch({ type: QUESTION_RESET });
  }, [dispatch]);

  return { resetState: boundAction };
}
