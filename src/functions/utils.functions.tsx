import { MICRO_AMOUNT } from "./global.constants";
import moment from 'moment-timezone';

export function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000);
}

export function convertEpochToHour(epoch: number) {
  return moment.unix(epoch).tz('gmt').format('HH:mm')
}

export function getNumberFromMicroAmount(amt: number) {
  return (amt / MICRO_AMOUNT);
}

export function displayNormalMoney(amt: number) {
  return getNumberFromMicroAmount(amt).toFixed(2);
}

export function getDateFromEpoch(epoch: number) {
  return moment.unix(epoch).tz('gmt').format('D-M-YYYY')
}

export function getLast14Days() {
  const currentTime = getCurrentTimestamp();
  return (new Array(13)).fill(null)
    .reduce((acc, _, i) => [...acc, moment.unix(currentTime).tz('gmt').subtract(i + 1, 'day').format('D-M-YYYY')], [moment.unix(currentTime).format('D-M-YYYY')])

}