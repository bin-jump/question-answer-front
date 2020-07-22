import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { PROFILE_RESET, PROFILE_ITEM_RESET } from './constants';

export function useReset() {
  const dispatch = useDispatch();
  const boundAction = useCallback(() => {
    dispatch({ type: PROFILE_RESET });
  }, [dispatch]);

  return { resetState: boundAction };
}

export function useResetItem() {
  const dispatch = useDispatch();
  const boundAction = useCallback(() => {
    dispatch({ type: PROFILE_ITEM_RESET });
  }, [dispatch]);

  return { resetItem: boundAction };
}
