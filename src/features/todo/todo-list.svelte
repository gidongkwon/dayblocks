<script>
  import { range } from "../utils/array";
  import TodoItem from "./todo-item.svelte";
</script>

<div class="todo-list">
  {#each range(0, 10) as i}
    <TodoItem />
  {/each}
</div>

<style>
  .todo-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }
</style>
