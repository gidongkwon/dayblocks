<script lang="ts">
  import { intlFormat, getDate, getDay } from 'date-fns';
  import { config } from '../config/store';
  import LectureEventChip from '../event/lecture-event-chip.svelte';
  import type { UniversityLectureEvent } from '../event';
  import { calculateFreeBlocks } from '../common/time';

  export let date: Date;

  // TODO: 고정 시간대 데이터 일반화
  export let timeTable: UniversityLectureEvent[];

  const dayName = intlFormat(date, { weekday: 'short' }, { locale: $config.locale });
  const dayDate = getDate(date);

  $: timeTableForThisDay = timeTable.filter((lecture) => lecture.day === getDay(date));
  $: freeSlots = calculateFreeBlocks($config, timeTableForThisDay);
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
    {#each freeSlots as [startHour, endHour]}
      <button class="free-slot"
        style:top={`${(startHour - 8) * 40}px`}
        style:height={`calc(${(endHour - startHour) * 40}px - 1.6rem - 1px)`}
      >
        여유시간
      </button>
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
  
  .free-slot {
    position: absolute;
    width: calc(100% - 1.6rem - 2px);
    padding: 0.8rem;
  }

  main {
    position: relative;
    width: 100%;
  }
</style>
