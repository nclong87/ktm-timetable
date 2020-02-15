import createReducer from './utils/createReducer';
import { SET_TIMETABLES, ADD_RECENT_SEARCH, CHANGE_ADVANCED_SEARCH_STATE, SET_METADATA } from './appActions';

// export const newtimetables = createReducer([], {
//   [SET_TIMETABLES](state, action) {
//     return action.data;
//   },
// });

function convertTimetable(timetable) {
  const result = {};
  timetable.forEach((row) => {
    const stationId = row.id;
    Object.keys(row).forEach((trainId) => {
      if (trainId === 'id') {
        return;
      }
      if (!Object.prototype.hasOwnProperty.call(result, trainId)) {
        result[trainId] = {
          trainId,
          times: {},
        };
      }
      let time = row[trainId];
      if (time !== '' && row[trainId].length < 5) {
        time = `0${time}`;
      }
      result[trainId].times[stationId] = time;
    });
  });
  return Object.values(result);
}

export const newtimetables = createReducer([], {
  [SET_TIMETABLES](state, action) {
    const newState = [];
    action.data.forEach((line) => {
      newState.push({
        lineNum: line.lineNum,
        timetable1: convertTimetable(line.timetable1),
        timetable2: convertTimetable(line.timetable2),
      });
    });
    return newState;
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
    const newState = state.slice(0, 10);
    newState.unshift(action.data);
    return newState;
  },
});

export const advancedSearchEnabled = createReducer(false, {
  [CHANGE_ADVANCED_SEARCH_STATE](state, action) {
    return action.data;
  },
});
