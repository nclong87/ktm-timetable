/* global __LOCAL__:true */
/* eslint no-underscore-dangle: 0 */

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';
import { update } from './persist/persistActions';

export default function configureStore(initialState) {
  return new Promise((resolve, reject) => {
    try {
      const logger = createLogger({
        predicate: () => __LOCAL__,
      });
      const enhancer = compose(applyMiddleware(thunkMiddleware, logger));
      const persistConfig = {
        key: 'root',
        storage,
        blacklist: [],
      };
      const persistedReducer = persistReducer(persistConfig, rootReducer);
      const store = createStore(persistedReducer, initialState, enhancer);

      const persistor = persistStore(store, () => {
        store.dispatch(update({ isHydrated: true }));
      });
      return resolve({ store, persistor });
    } catch (e) {
      return reject(e);
    }
  });
}
