import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  myitems: itemReducer,
  myerrors: errorReducer,
  myauth: authReducer
});

export default rootReducer;
