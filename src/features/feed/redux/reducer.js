import { reducer as fetchFeedsReducer } from './fetchFeeds';
import { FEED_RESET } from './constants';

const initialState = {
  feeds: [],
  fetchFeedsPending: false,
  feedAfter: null,
  lastError: null,
};

const reducers = [fetchFeedsReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case FEED_RESET:
      return initialState;
    default:
      newState = state;
      break;
  }

  return reducers.reduce((s, r) => r(s, action), newState);
}
