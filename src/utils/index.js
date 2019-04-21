/* eslint-disable */

const moment = require('moment');
const _ = require('lodash');

export function get3UpcomingTimes(timetable, station) {
  const times = timetable.find(e => e.id === station.id);
  console.log(times);
  const now = moment.now();
  const array = [];
  for (const property in times) {
    if (_.startsWith(property, 'value') && times.hasOwnProperty(property)) {
        if (times[property]) {
            let m = moment(times[property], "HH:mm");
            if (m.isValid()) {
              if (m.isBefore(now)) {
                m.add(1, 'd');
              }
              array.push({
                time: times[property],
                diff:  m.diff(now),
                m,
              });
            }
            // if (moment1.isBefore(now)) {
            //   moment1.add(1, 'd');
            // }
            // var fromNow = moment1.fromNow();
            // if (moment1.isValid() && fromNow.indexOf("ago") < 0) {
            //     upcomingTimes.push({
            //       time: times[property],
            //       fromNow,
            //     });
            // }
        }
    }
  }
  // console.log(array);
  const upcomingTimes = array.sort((a, b) => a.diff - b.diff).slice(0, 3).map(({ time, m}) => {
    return {
      time,
      fromNow: m.fromNow(),
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
