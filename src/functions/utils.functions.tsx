import { MICRO_AMOUNT } from "./global.constants";
import moment from 'moment';

export function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000);
}

export function convertEpochToHour(epoch: number) {
  return moment.unix(epoch).format('HH:mm')
}

export function getNumberFromMicroAmount(amt: number) {
  return (amt / MICRO_AMOUNT);
}

export function displayNormalMoney(amt: number) {
  return getNumberFromMicroAmount(amt).toFixed(2);
}