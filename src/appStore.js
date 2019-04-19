/* global __LOCAL__:true */
/* eslint no-underscore-dangle: 0 */

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';
import * as persistActionCreators from './persist/persistActions';

function configureStore(initialState) {
  const loggerMiddleware = createLogger({
    predicate: () => __LOCAL__,
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    autoRehydrate(),
  );
  const store = createStore(rootReducer, initialState, enhancer, composeEnhancers);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./appReducer', () => {
      const nextRootReducer = rootReducer;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

const store = configureStore({});

export const persistor = persistStore(store, { blacklist: [] }, () => {
  store.dispatch(persistActionCreators.update({ isHydrated: true }));
}); // .purge();

export default store;
