<script lang="ts">
  import WeekCalendar from './features/week/week-calendar.svelte';
  import Modal from './features/common/modal.svelte';
  import type { UniversityLectureEvent } from './features/event';
  import { parseEverytimeXML } from './features/importer/everytime';

  let showImporterModal = false;
  function openImpoter() {
    showImporterModal = true;
  }

  function toggleTheme() {
    window.document.body.classList.toggle('dark');
  }

  let timeTableXMLText: string;
  let timeTable: UniversityLectureEvent[] = [];
  function handleEverytimeSubmit() {
    timeTable = parseEverytimeXML(timeTableXMLText);
    showImporterModal = false;
  }
</script>

<header>
  <button on:click={openImpoter}>가져오기</button>
  <button on:click={toggleTheme}>테마 토글</button>
</header>
<main>
  <WeekCalendar {timeTable} />
</main>
{#if showImporterModal}
  <Modal bind:showModal={showImporterModal}>
    <span slot="title">에브리타임 시간표</span>
    <form class="everytime-form" on:submit|preventDefault={handleEverytimeSubmit}>
      <textarea bind:value={timeTableXMLText}></textarea>
      <button type="submit">가져오기</button>
    </form>
  </Modal>
{/if}

<style>
  header {
    padding: 1em;
  }

  main {
    display: flex;
    flex: 1 1 0;
    justify-content: stretch;
  }

  .everytime-form {
    margin-top: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
  .everytime-form textarea {
    color: var(--slate-12);
    background-color: var(--slate-1);
    border-radius: 0.8rem;
    width: 100%;
    min-height: 8em;
  }
</style>
