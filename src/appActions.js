
import { timetable1 as t11, timetable2 as t12 } from './data/line1';
import { timetable1 as t21, timetable2 as t22 } from './data/line2';

export const SET_TIMETABLES = 'SET_TIMETABLES';
export const ADD_RECENT_SEARCH = 'ADD_RECENT_SEARCH';

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
