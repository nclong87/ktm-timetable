import createReducer from './utils/createReducer';
import { SET_TIMETABLES, ADD_RECENT_SEARCH, CHANGE_ADVANCED_SEARCH_STATE, SET_METADATA } from './appActions';

export const newtimetables = createReducer([], {
  [SET_TIMETABLES](state, action) {
    return action.data;
  },
});

export const appMetadata = createReducer({
  version: '',
  news: [],
}, {
  [SET_METADATA](state, action) {
    if (!action.data) {
      return state;
    }
    return action.data;
  },
});

export const recentSearchsNew = createReducer([], {
  [ADD_RECENT_SEARCH](state, action) {
    const { fromStation, toStation } = action.data;
    const index = state.findIndex(e => e.fromStation.id === fromStation.id && e.toStation.id === toStation.id);
    if (index >= 0) {
      return state;
    }
    // else if (index > 0) {
    //   const newState = state.slice();
    //   newState.splice(index, 1);
    //   newState.unshift(station);
    //   return newState;
    // }
    const newState = state.slice(0, 2);
    newState.unshift(action.data);
    return newState;
  },
});

export const advancedSearchEnabled = createReducer(false, {
  [CHANGE_ADVANCED_SEARCH_STATE](state, action) {
    return action.data;
  },
});
