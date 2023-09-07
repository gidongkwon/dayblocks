<script lang="ts">
  export let showModal: boolean;

  let dialog: HTMLDialogElement;

  $: if (dialog && showModal) {
    dialog.showModal();
  }

  $: console.log(showModal);
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
  on:keydown={(e) => {
    if (e.key !== 'Escape') return;
    dialog.close();
  }}
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click|stopPropagation role="none">
    <header>
      <h2>
        <slot name="title" />
      </h2>
      <button on:click={() => dialog.close()}> X </button>
    </header>
    <slot />
  </div>
</dialog>

<style>
  dialog {
    color: var(--slate-12);
    width: 300px;
    border: none;
    border-radius: 0.8rem;
    background-color: var(--panel-background);
  }
  dialog::backdrop {
    background-color: var(--black-a4);
  }
  dialog > div {
    padding: 1em;
  }

  header {
    display: flex;
    place-items: center;
    /* height: fit-content; */
  }
  header > h2 {
    margin: 0;
  }
  header > button {
    margin-left: auto;
  }
</style>
