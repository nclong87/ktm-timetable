
// import { timetable1 as t11, timetable2 as t12 } from './data/line1';
// import { timetable1 as t21, timetable2 as t22 } from './data/line2';
import Api from './utils/api';

export const SET_METADATA = 'SET_METADATA';
export const SET_TIMETABLES = 'SET_TIMETABLES';
export const ADD_RECENT_SEARCH = 'ADD_RECENT_SEARCH';
export const CHANGE_ADVANCED_SEARCH_STATE = 'CHANGE_ADVANCED_SEARCH_STATE';

export function fetchTimeTables() {
  return (dispatch) => {
    const api = new Api();
    return Promise.all([
      api.get('https://raw.githubusercontent.com/ktmtimetable/ktmtimetable.github.io/master/data/line1.json'),
      api.get('https://raw.githubusercontent.com/ktmtimetable/ktmtimetable.github.io/master/data/line2.json'),
    ]).then(([t12, t22]) => {
      const t11 = t12.splice(0, Math.round(t12.length / 2));
      const t21 = t22.splice(0, Math.round(t22.length / 2));
      // console.log(t11, t12);
      // console.log(t21, t22);
      dispatch({
        type: SET_TIMETABLES,
        data: [
          {
            lineNum: 1,
            timetable1: t11,
            timetable2: t12,
          },
          {
            lineNum: 2,
            timetable1: t21,
            timetable2: t22,
          },
        ],
      });
    }).catch((error) => {
      console.log('ERROR', error);
    });
  };
}

export function addRecentSearch(fromStation, toStation) {
  return {
    type: ADD_RECENT_SEARCH,
    data: { fromStation, toStation },
  };
}

export function onChangeAdvancedSearchState(isEnabled) {
  return {
    type: CHANGE_ADVANCED_SEARCH_STATE,
    data: isEnabled,
  };
}

export function fetchMetadata() {
  return (dispatch) => {
    const api = new Api();
    return api.get('https://raw.githubusercontent.com/ktmtimetable/ktmtimetable.github.io/master/data/metadata.json').then((data) => {
      console.log(data);
      dispatch({
        type: SET_METADATA,
        data,
      });
    }).catch((error) => {
      console.log('ERROR', error);
      return null;
    });
  };
}
