/* eslint-disable */

const moment = require('moment');
const _ = require('lodash');

// export function getDepartTime(departTime) {
//   const now = moment.now();
//   // const hours = departTime.getHours();
//   // const minutes = departTime.getMinutes();
//   if (m.isBefore(now)) {
//     console.log('isBefore');
//   } else {
//     console.log('isAfter');
//   }
// }

export function formatDate(date, format = 'MM/DD/YYYY') {
  return moment(date).format(format);
}

export function get3UpcomingTimes(timetable, station, time = null) {
  const times = timetable.find(e => e.id === station.id);
  // const now = moment.now();
  const departTime = time === null ? moment.now() : moment(time);
  const array = [];
  for (const prop in times) {
    const property = _.trim(prop);
    if (!isNaN(property) && times.hasOwnProperty(property)) {
        if (times[property]) {
            let m = moment(times[property], "HH:mm");
            if (m.isValid()) {
              if (m.isBefore(departTime)) {
                m.add(1, 'd');
              }
              array.push({
                trainNo: Number(property),
                time: times[property],
                diff:  m.diff(departTime),
                m,
              });
            }
        }
    }
  }
  const upcomingTimes = array.sort((a, b) => a.diff - b.diff).slice(0, 3).map(({ time, m, trainNo}) => {
    // if (m.isBefore(now)) {
    //   m.add(1, 'd');
    // }
    return {
      trainNo,
      time,
      m,
      // fromNow: m.isBefore(now) ? '' : `(${m.fromNow()})`,
    }
  })
  return upcomingTimes;
}

export function searchByKeywords(string, keywords) {
  let result = true;
  _.words(keywords).forEach((word) => {
    if (result === true) {
      result = string.toLowerCase().indexOf(word.toLowerCase()) !== -1;
    }
  });
  return result;
}

export function getNearbyStations(lat, long, stations) {
  if (!lat || !long) {
    return [];
  }
  const array = stations.map(e => {
    const x = e.lat - lat;
    const y = e.long - long;
    const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return Object.assign({}, e, { distance });
  });
  return array.sort((a, b) => a.distance - b.distance).slice(0, 10);
}

export function getNextStations(stations, fromStation, toStation, num = 2) {
  let index = stations.findIndex(e => e.id === fromStation.id);
  const result = [];
  const direction = fromStation.order < toStation.order ? 1 : -1;
  while (result.length < num) {
    index += direction;
    if (index < 0 || index >= direction.length) {
      break;
    }
    const station = stations[index];
    if (station === undefined || station.id === toStation.id) {
      break;
    }
    result.push(station);
  }
  return result;
}
