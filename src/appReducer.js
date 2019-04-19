import createReducer from './utils/createReducer';
import { SET_TIMETABLES, SET_SELECTED_STATION } from './appActions';

export const timetables = createReducer([], {
  [SET_TIMETABLES](state, action) {
    return action.data;
  },
});

export const recentStations = createReducer([], {
  [SET_SELECTED_STATION](state, action) {
    const station = action.data;
    const index = state.findIndex(e => e.id === station.id);
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
    newState.unshift(station);
    return newState;
  },
});
