<script lang="ts">
  import { intlFormat, getDate, getDay } from 'date-fns';
  import { config } from '../config/store';
  import LectureEventChip from '../event/lecture-event-chip.svelte';
  import type { UniversityLectureEvent } from '../event';

  export let date: Date;

  // TODO: 고정 시간대 데이터 일반화
  export let timeTable: UniversityLectureEvent[];

  const dayName = intlFormat(date, { weekday: 'short' }, { locale: $config.locale });
  const dayDate = getDate(date);

  $: timeTableForThisDay = timeTable.filter((lecture) => lecture.day === getDay(date));
</script>

<section>
  <header>
    <span class="name">
      {dayName}
    </span>
    <span class="date">
      {dayDate}
    </span>
  </header>
  <main>
    {#each timeTableForThisDay as subject}
      <LectureEventChip lecture={subject} />
    {/each}
  </main>
</section>

<style>
  section:not(:last-child) {
    border-right: 1px solid var(--gray-4);
  }

  header {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .date {
    font-size: 2rem;
    font-weight: bold;
  }

  main {
    position: relative;
  }
</style>
