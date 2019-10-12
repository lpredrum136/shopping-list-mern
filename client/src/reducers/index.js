import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

const rootReducer = combineReducers({
  myitems: itemReducer
});

export default rootReducer;
