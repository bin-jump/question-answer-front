import { combineReducers } from 'redux';
import { reducer as homeReducer } from '../features/home/redux/reducer';

const reducer = combineReducers({
  home: homeReducer,
});

export default reducer;
