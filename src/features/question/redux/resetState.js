import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { QUESTION_RESET, QUESTION_ANSWERS_RESET } from './constants';

export function useReset() {
  const dispatch = useDispatch();
  const boundAction = useCallback(() => {
    dispatch({ type: QUESTION_RESET });
  }, [dispatch]);

  return { resetState: boundAction };
}

export function useResetAnswers() {
  const dispatch = useDispatch();
  const boundAction = useCallback(() => {
    dispatch({ type: QUESTION_ANSWERS_RESET });
  }, [dispatch]);

  return { resetAnswers: boundAction };
}
