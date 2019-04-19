
import { timetable1, timetable2 } from './data/timetables';

export const SET_TIMETABLES = 'SET_TIMETABLES';
export const SET_SELECTED_STATION = 'SET_SELECTED_STATION';

export function fetchTimeTables() {
  return {
    type: SET_TIMETABLES,
    data: [{
      lineNum: 1,
      timetable1,
      timetable2,
    }],
  };
}

export function setSelectedStation(station) {
  return {
    type: SET_SELECTED_STATION,
    data: station,
  };
}
