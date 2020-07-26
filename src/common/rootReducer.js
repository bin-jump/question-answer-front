import { combineReducers } from 'redux';
import homeReducer from '../features/home/redux/reducer';
import authReducer from '../features/auth/redux/reducer';
import questionReducer from '../features/question/redux/reducer';
import profileReducer from '../features/profile/redux/reducer';
import messageReducer from '../features/message/redux/reducer';

const rootReducer = combineReducers({
  home: homeReducer,
  auth: authReducer,
  question: questionReducer,
  profile: profileReducer,
  message: messageReducer,
});

export default rootReducer;
