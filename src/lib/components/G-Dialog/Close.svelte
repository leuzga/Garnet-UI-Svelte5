<svelte:options customElement="garnet-close" />

<script>
  // @ts-nocheck

  let {
    size = "",
    isFaux = false,
    color = "inherit"
  } = $props();
  
  const closeButtonClasses = $derived([
    "close-button",
    size ? `close-button-${size}` : "",
  ]
    .filter((c) => c)
    .join(" "));
</script>

{#if isFaux}
  <div class={closeButtonClasses}>
    <svg class="close" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M.439 21.44a1.5 1.5 0 0 0 2.122 2.121l9.262-9.261a.25.25 0 0 1 .354 0l9.262 9.263a1.5 1.5 0 1 0 2.122-2.121L14.3 12.177a.25.25 0 0 1 0-.354l9.263-9.262A1.5 1.5 0 0 0 21.439.44L12.177 9.7a.25.25 0 0 1-.354 0L2.561.44A1.5 1.5 0 0 0 .439 2.561L9.7 11.823a.25.25 0 0 1 0 .354Z"
      />
    </svg>
  </div>
{:else}
  <button class={closeButtonClasses} aria-label="Close">
    <svg class="close" style:color={color} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M.439 21.44a1.5 1.5 0 0 0 2.122 2.121l9.262-9.261a.25.25 0 0 1 .354 0l9.262 9.263a1.5 1.5 0 1 0 2.122-2.121L14.3 12.177a.25.25 0 0 1 0-.354l9.263-9.262A1.5 1.5 0 0 0 21.439.44L12.177 9.7a.25.25 0 0 1-.354 0L2.561.44A1.5 1.5 0 0 0 .439 2.561L9.7 11.823a.25.25 0 0 1 0 .354Z"
      />
    </svg>
  </button>
{/if}

<style>
  .close-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    width: 36px;
    height: 26px;
  }
</style>