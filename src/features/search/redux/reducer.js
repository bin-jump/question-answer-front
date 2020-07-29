import { reducer as fetchSearchResultReducer } from './fetchSearchResult';
import { SEARCH_RESET } from './constants';

const initialState = {
  searchResult: [],
  searchPending: false,
  searchAfter: null,
  lastError: null,
};

const reducers = [fetchSearchResultReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SEARCH_RESET:
      return initialState;
    default:
      newState = state;
      break;
  }

  return reducers.reduce((s, r) => r(s, action), newState);
}
