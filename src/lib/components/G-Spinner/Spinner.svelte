<!-- Spinner.svelte -->
<svelte:options customElement="garnet-spinner" />

<script>
  const { 
    color = "#733635", 
    duration = "0.75s", 
    size = "60", 
    unit = 'px',
    pause = false,
    variant = "circle", // Add variant prop to control which type of spinner to show
    className = ""
  } = $props();
  
  // Valores derivados
  const durationUnit = $derived(duration.match(/[a-zA-Z]/)?.[0] ?? 's');
  const durationNum = $derived(duration.replace(/[a-zA-Z]/, ''));
</script>

<div class="garnet-spinner {className}" 
     style="--size: {size}{unit}; --color: {color}; --duration: {duration}; 
            --motion-one: -12px; --motion-two: 15px; --motion-three: -12px;"
     class:pause-animation={pause}>
     
  {#if variant === "circle"}
    <div class="circle"></div>
  {:else if variant === "jumper"}
    <div class="jumper" style="animation-delay: 0s;"></div>
    <div class="jumper" style="animation-delay: 0.33s;"></div>
    <div class="jumper" style="animation-delay: 0.66s;"></div>
  {:else if variant === "jellyfish"}
    {#each Array(6) as _, i}
      <div class="ring" 
           style="animation-delay: {i * 0.1}s; width: {i * 10}px; height: {i * 5}px;"></div>
    {/each}
  {/if}
  
  <slot></slot>
</div>

<style>
  .garnet-spinner {
    display: flex;
    position: relative;
  }
  
  /* circle spinner */
  .circle {
    height: var(--size);
    width: var(--size);
    border-color: var(--color) transparent var(--color) var(--color);
    border-width: calc(var(--size) / 12);
    border-style: solid;
    border-radius: 50%;
    animation: var(--duration) linear 0s infinite normal none running rotateCircle;
  }
  
  @keyframes rotateCircle {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  /* jumper spinner */
  .jumper {
    height: var(--size);
    width: var(--size);
    border-radius: 100%;
    animation-fill-mode: both;
    position: absolute;
    opacity: 0;
    background-color: var(--color);
    animation: bounce var(--duration) linear infinite;
  }
  
  @keyframes bounce {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    5% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }
  
  /* jellyfish spinner */
  .ring {
    position: absolute;
    border: 2px solid var(--color);
    border-radius: 50%;
    background-color: transparent;
    animation: motion var(--duration) ease infinite;
  }
  
  .pause-animation :global(*) {
    animation-play-state: paused !important;
  }
  
  @keyframes motion {
    0% {
      transform: translateY(var(--motion-one));
    }
    50% {
      transform: translateY(var(--motion-two));
    }
    100% {
      transform: translateY(var(--motion-three));
    }
  }
</style>