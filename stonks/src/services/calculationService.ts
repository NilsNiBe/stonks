import { ChartResult } from "../apis/yahooV8/interfaces";

export function getTimeStampInSeconds(timeStamp: number): number {
  return Math.floor(timeStamp / 1000);
}

export function getIndexOfFirstValueSmallerOrEqual(
  array: number[],
  value: number
): number {
  for (let i = array.length; i >= 0; i--) {
    if (array[i] <= value) {
      return i;
    }
  }
  return 0;
}

export function getPriceForTimeStamp(timeStamp: number, result: ChartResult) {
  const index = getIndexOfFirstValueSmallerOrEqual(
    result.timestamp,
    timeStamp / 1000
  );
  return result.indicators.quote[0].close[index];
}
