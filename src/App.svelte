<script lang="ts">
  import WeekCalendar from './features/week/week-calendar.svelte';
  import Modal from './features/common/modal.svelte';
  import type { UniversityLectureEvent } from './features/event';
  import { parseEverytimeXML } from './features/importer/everytime';
  import TodoList from './features/todo/todo-list.svelte';

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

<div class="container">
  <header>
    <button on:click={openImpoter}>가져오기</button>
    <button on:click={toggleTheme}>테마 토글</button>
  </header>
  <main>
    <WeekCalendar {timeTable} />
  </main>
  <aside>
    <h2>할 일</h2>
    <TodoList />
    <button class="add-button">추가</button>
  </aside>
  {#if showImporterModal}
    <Modal bind:showModal={showImporterModal}>
      <span slot="title">에브리타임 시간표</span>
      <form class="everytime-form" on:submit|preventDefault={handleEverytimeSubmit}>
        <textarea bind:value={timeTableXMLText}></textarea>
        <button type="submit">가져오기</button>
      </form>
    </Modal>
  {/if}
</div>

<style>
  .container {
    flex: 1 1 0;
    display: grid;
    grid-template: 
    'header   header' auto
    'calendar todo'   1fr
    / 1fr     20rem;
  }
  header {
    grid-area: header;
    padding: 1em;
  }

  main {
    grid-area: calendar;
    display: flex;
    justify-content: stretch;
  }
  
  aside {
    grid-area: todo;
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    margin-right: var(--space-3);
    border-radius: var(--radius-1);
    align-content: stretch;
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
