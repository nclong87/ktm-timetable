import createReducer from './utils/createReducer';
import { SET_TIMETABLES, ADD_RECENT_SEARCH, CHANGE_ADVANCED_SEARCH_STATE } from './appActions';

export const timetables = createReducer([], {
  [SET_TIMETABLES](state, action) {
    return action.data;
  },
});

export const appVersion = createReducer(null, {
});

export const recentSearchs = createReducer([], {
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
