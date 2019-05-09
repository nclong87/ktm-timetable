
import { timetable1 as t11, timetable2 as t12 } from './data/line1_ramadan';
import { timetable1 as t21, timetable2 as t22 } from './data/line2_ramadan';

export const SET_TIMETABLES = 'SET_TIMETABLES';
export const ADD_RECENT_SEARCH = 'ADD_RECENT_SEARCH';
export const CHANGE_ADVANCED_SEARCH_STATE = 'CHANGE_ADVANCED_SEARCH_STATE';

export function fetchTimeTables() {
  return {
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
