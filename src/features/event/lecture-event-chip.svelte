<script lang="ts">
  import type { UniversityLectureEvent } from '.';

  export let lecture: UniversityLectureEvent;
  const hourHeight = 40;
</script>

<div
  class="chip"
  style:top={`${(lecture.startHour - 8) * hourHeight}px`}
  style:height={`calc(${(lecture.endHour - lecture.startHour) * hourHeight}px - 1.6rem - 1px)`}
>
  <span class="name">{lecture.name}</span>
  <span class="place">{lecture.place}</span>
  <span class="description">{lecture.description}</span>
</div>

<style>
  .chip {
    position: absolute;
    width: calc(100% - 1.6rem - 2px);
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    border-radius: 8px;
    color: var(--orange-12);
    background: var(--orange-6);
    padding: 0.8rem;
  }

  .name {
    font-size: 1.2rem;
    font-weight: bold;
  }
</style>
