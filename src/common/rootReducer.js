import { combineReducers } from 'redux';
import homeReducer from '../features/home/redux/reducer';
import authReducer from '../features/auth/redux/reducer';

const rootReducer = combineReducers({
  home: homeReducer,
  auth: authReducer,
});

export default rootReducer;
