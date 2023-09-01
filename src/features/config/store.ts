import { writable } from "svelte/store";

export const config = writable({
  startOfWeek: 1,
  startHour: 6,
  endHour: 23,
  locale: 'ko-KR',
});