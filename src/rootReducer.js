import { combineReducers } from 'redux';
import _get from 'lodash/get';
import * as App from './appReducer';
import * as Persist from './persist/persistReducer';
// import { UPDATE } from './persist/persistTypes';

import { APP_VERSION } from './appConstants';

const appReducer = combineReducers(Object.assign({},
  App,
  Persist,
));

const initialState = appReducer({ appVersion: APP_VERSION, timetables: [] }, {});

const RootReducer = (state, action) => {
  if (action.type === 'persist/REHYDRATE' && _get(action, 'payload.appVersion', null) !== APP_VERSION) {
    console.log('dadada');
    return initialState;
  }
  const newState = Object.assign({}, state);
  return appReducer(newState, action);
};

export default RootReducer;
