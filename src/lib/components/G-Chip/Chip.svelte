<svelte:options customElement="garnet-chip" />
<script>
// @ts-nocheck
  import DeleteIcon from './DeleteIcon.svelte';
  import Icon from '@iconify/svelte';

  let {
    active = $bindable(true),
    close = false,
    chipContent = "",
    selected = false,
    outline = false,
    onclose,

    iconFamily = undefined,  
    iconName = undefined,    
    iconSize = "1em"        
  } = $props();

  let internalActive = $state(active);

  function onClose(e) {
    internalActive = false;
    active = false;
    onclose?.(e);
  }

  // Watchers en Svelte 5
  $effect(() => {
    internalActive = active;
  });
</script>

<div class="garnet-chip">
  {#if internalActive}
    <div
      class="chip"
      class:selected
      class:outline
      data-testid="chip"
      role="group"
      aria-label={`Chip: ${chipContent}`}
      >

      {#if iconFamily && iconName}
        <span class="icon-wrapper">
          <Icon 
            icon={`${iconFamily}:${iconName}`} 
            height={iconSize}
            style="margin-right: 6px;"
          />
        </span>
      {/if}
      
      <span aria-hidden="false">{chipContent}</span>
      
      {#if close}
        <button 
          class="close" 
          onclick={onClose}
          type="button"
          aria-label={`Remove ${chipContent} chip`}
          title={`Remove ${chipContent}`}
          >
          <DeleteIcon aria-hidden="true" />
        </button>
      {/if}
      </div>
  {/if}
</div>

<style>
  .garnet-chip {
    display: flex;
    font-family: Arial, Helvetica, sans-serif;
  }
  
  .chip {
    color: #4c237f;
    align-items: center;
    cursor: default;
    display: inline-flex;
    line-height: 20px;
    max-width: 100%;
    outline: none;
    overflow: hidden;
    padding: 0 12px;
    position: relative;
    text-decoration: none;
    vertical-align: middle;
    white-space: nowrap;
    border-radius: 25px;
    padding: 10px;
    background-color: #c5edfb;
  }

  .icon-wrapper {
    display: inline-flex;
    align-items: center;
  }

  .close {
    cursor: pointer;
    margin-left: 6px;
    margin-right: -6px;
    display: flex;
    width: 24px;           
    height: 24px;          
    border-radius: 50%;    
    align-items: center;   
    justify-content: center; 
    border: none;          
    background: transparent; 
    padding: 0;
  }

  .close:focus, .close:hover, .close:active {
    opacity: 0.72;
  }

  .close :global(svg) {
    width: 16px;
    height: 16px;
  }

  .outline {
    background-color: #ffffff;
    border: 1px solid #c5edfb;
  }
</style>