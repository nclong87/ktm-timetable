import { combineReducers } from 'redux';
import * as App from './appReducer';
import * as Persist from './persist/persistReducer';

const appReducer = combineReducers(Object.assign({},
  App,
  Persist,
));

const RootReducer = (state, action) => {
  const newState = Object.assign({}, state);
  return appReducer(newState, action);
};

export default RootReducer;
