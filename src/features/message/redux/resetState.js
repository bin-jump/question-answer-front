import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { MESSAGE_CHAT_LIST_RESET } from './constants';

export function useChatReset() {
  const dispatch = useDispatch();
  const boundAction = useCallback(() => {
    dispatch({ type: MESSAGE_CHAT_LIST_RESET });
  }, [dispatch]);

  return { resetChat: boundAction };
}
