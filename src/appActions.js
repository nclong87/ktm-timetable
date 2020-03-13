
// import { timetable1 as t11, timetable2 as t12 } from './data/line1';
// import { timetable1 as t21, timetable2 as t22 } from './data/line2';
import Api from './utils/api';
import { getStations } from './data/stations';

export const SET_METADATA = 'SET_METADATA';
export const SET_TIMETABLES = 'SET_TIMETABLES';
export const ADD_RECENT_SEARCH = 'ADD_RECENT_SEARCH';
export const CHANGE_ADVANCED_SEARCH_STATE = 'CHANGE_ADVANCED_SEARCH_STATE';
export const SET_STATIONS = 'SET_STATIONS';

export function fetchTimeTables() {
  return (dispatch) => {
    const api = new Api();
    return Promise.all([
      api.get('https://raw.githubusercontent.com/ktmtimetable/ktmtimetable.github.io/master/data/line11.json'),
      api.get('https://raw.githubusercontent.com/ktmtimetable/ktmtimetable.github.io/master/data/line12.json'),
      api.get('https://raw.githubusercontent.com/ktmtimetable/ktmtimetable.github.io/master/data/line21.json'),
      api.get('https://raw.githubusercontent.com/ktmtimetable/ktmtimetable.github.io/master/data/line22.json'),
      api.get('https://raw.githubusercontent.com/ktmtimetable/ktmtimetable.github.io/master/data/line31.json'),
      api.get('https://raw.githubusercontent.com/ktmtimetable/ktmtimetable.github.io/master/data/line32.json'),
      api.get('https://raw.githubusercontent.com/ktmtimetable/ktmtimetable.github.io/master/data/line41.json'),
      api.get('https://raw.githubusercontent.com/ktmtimetable/ktmtimetable.github.io/master/data/line42.json'),
    ]).then(([t11, t12, t21, t22, t31, t32, t41, t42]) => {
      // const t11 = t12.splice(0, Math.round(t12.length / 2));
      // const t21 = t22.splice(0, Math.round(t22.length / 2));
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
          {
            lineNum: 3,
            timetable1: t31,
            timetable2: t32,
          },
          {
            lineNum: 4,
            timetable1: t41,
            timetable2: t42,
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

export function getListStations() {
  return (dispatch, getState) => {
    let stations = getState().stations;
    if (stations.length > 0) {
      return stations;
    }
    stations = getStations();
    dispatch({
      type: SET_STATIONS,
      data: stations,
    });
    return stations;
  };
}
