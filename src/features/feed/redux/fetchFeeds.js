import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  FEED_FETCH_FEED_BEGIN,
  FEED_FETCH_FEED_SUCCESS,
  FEED_FETCH_FEED_FAILURE,
} from './constants';

export function fetchFeeds(after) {
  let url = '/api/feed';
  if (after) {
    url = `${url}?after=${after}`;
  }
  return getRequest(
    url,
    FEED_FETCH_FEED_BEGIN,
    FEED_FETCH_FEED_SUCCESS,
    FEED_FETCH_FEED_FAILURE,
  );
}

export function useFetchFeeds() {
  const dispatch = useDispatch();
  const { feeds, fetchFeedsPending, feedAfter, error } = useSelector(
    (state) => ({
      feeds: state.feed.feeds,
      fetchFeedsPending: state.feed.fetchFeedsPending,
      feedAfter: state.feed.feedAfter,
      error: state.feed.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (after) => {
      dispatch(fetchFeeds(after));
    },
    [dispatch],
  );

  return {
    fetchFeed: boundAction,
    feeds,
    fetchFeedsPending,
    feedAfter,
    error,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FEED_FETCH_FEED_BEGIN:
      return {
        ...state,
        fetchFeedsPending: true,
        lastError: null,
      };

    case FEED_FETCH_FEED_SUCCESS:
      return {
        ...state,
        feeds: [...state.feeds, ...action.data.data.children],
        feedAfter: action.data.data.dist ? action.data.data.after : null,
        fetchFeedsPending: false,
        lastError: null,
      };

    case FEED_FETCH_FEED_FAILURE:
      return {
        ...state,
        fetchFeedsPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
