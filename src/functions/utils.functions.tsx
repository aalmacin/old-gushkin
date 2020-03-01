import { MICRO_AMOUNT } from "./global.constants";

export function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000);
}

export function displayNormalMoney(amt: number) {
  return (amt / MICRO_AMOUNT).toFixed(2);
}