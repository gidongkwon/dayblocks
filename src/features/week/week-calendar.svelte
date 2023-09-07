<script lang="ts">
  import type { UniversityLectureEvent } from '../event';
  import WeekDay from './week-day.svelte';
  import { startOfWeek, addDays } from 'date-fns';

  export let timeTable: UniversityLectureEvent[];

  let startOfWeekDate = startOfWeek(new Date());
  const weekDates = [...Array(7)].map((_, index) => addDays(startOfWeekDate, index));
</script>

<main>
  {#each weekDates as date}
    <WeekDay {timeTable} {date} />
  {/each}
</main>

<style>
  main {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    flex: 1;
  }
</style>
