import { writable } from "svelte/store";
import type { HourRange } from "../common/time";

export interface Config {
  startOfWeek: number,
  dayRange: HourRange,
  lunchRange: HourRange,
  dinnerRange: HourRange,
  timeBlockBoundary: HourRange[],
  minimumBlockSize: number,
  locale: string,
}

export const config = writable<Config>({
  startOfWeek: 1,
  dayRange: [8, 23],
  lunchRange: [12, 13],
  dinnerRange: [17, 18],
  timeBlockBoundary: [[8, 10], [10, 12], [13, 15], [15, 17], [18, 20], [20, 23]],
  minimumBlockSize: 0.5,
  // useSameBlockSize: true,
  locale: 'ko-KR',
});
