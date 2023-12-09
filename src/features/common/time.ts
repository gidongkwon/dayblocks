import type { Config } from "../config/store";
import type { TaskPlacement } from "../event";
import { orderBy } from "../utils/array";

export type HourRange = [number, number];

function pushIfLargerThanMinBlockSize(target: HourRange[], config: Config, range: HourRange) {
  if (Math.abs(range[1] - range[0]) > config.minimumBlockSize) {
    target.push(range);
  }
}

export function calculateFreeBlocks(config: Config, dayEvents: TaskPlacement[]) {
  const sortedEvents = dayEvents.sort(orderBy(v => v.startHour));
  const freeBlocks: HourRange[] = [];

  if (dayEvents.length > 0) {
    pushIfLargerThanMinBlockSize(freeBlocks, config, [config.dayRange[0], dayEvents[0].startHour]);
  }

  for (let i = 1; i < sortedEvents.length; i++) {
    const prev = sortedEvents[i - 1];
    const current = sortedEvents[i];
    pushIfLargerThanMinBlockSize(freeBlocks, config, [prev.endHour, current.startHour]);
  }

  const last = sortedEvents.at(-1);
  if (last !== undefined) {
    pushIfLargerThanMinBlockSize(freeBlocks, config, [last.endHour, config.dayRange[1]]);
  }

  return freeBlocks;
}