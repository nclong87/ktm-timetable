/* eslint-disable */

const moment = require('moment');
const _ = require('lodash');

export function get3UpcomingTimes(timetable, station) {
  const times = timetable.find(e => e.id === station.id);
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
        }
    }
  }
  const upcomingTimes = array.sort((a, b) => a.diff - b.diff).slice(0, 15).map(({ time, m}) => {
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
    if (station.id === toStation.id) {
      break;
    }
    result.push(station);
  }
  return result;
}
