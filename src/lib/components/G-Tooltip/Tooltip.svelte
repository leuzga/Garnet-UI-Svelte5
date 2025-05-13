<svelte:options customElement="garnet-tooltip" />

<script>
  import { fade } from "svelte/transition";

  export let id = "tooltip";
  export let label = "Información adicional";
  export let tip;
  export let buttonText = "?";
  export let buttonAriaLabel = "Mostrar información adicional";
  export let timeout = "400";
  export let showHTML = false;
  export let position = "bottom";

  let active = false;
  let enterTrigger = null;
  let leaveTrigger = null;

  let tooltipId = `${id || `tooltip-${Math.random().toString(36).substring(2, 9)}`}`;

  function handleKeydown(event) {
    if (event.key === "Escape") {
      active = false;
      event.target.blur();
    }
  }

  function handleMouseEnter() {
    enterTrigger = setTimeout(() => {
      active = true;
    }, parseInt(timeout, 0));
  }

  function handleMouseLeave() {
    if (enterTrigger) {
      clearTimeout(enterTrigger);
      enterTrigger = null;
    }
    leaveTrigger = setTimeout(() => {
      active = false;
    }, parseInt(timeout, 0));
  }

  function handleInteraction() {
    if (leaveTrigger) {
      clearTimeout(leaveTrigger);
      leaveTrigger = null;
    }
  }

  function toggleTooltip() {
    active = !active;
  }

  function handleClickOutside(event) {
    if (active) {
      const tooltipElement = document.getElementById(tooltipId);
      const triggerElement = document.querySelector('.trigger');

      if (tooltipElement && !tooltipElement.contains(event.target) && triggerElement && !triggerElement.contains(event.target)) {
        active = false;
      }
    }
  }

  $: {
    if (active) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 10);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
  }
</script>

<div class="tooltip">
  <div>
    <button
      aria-describedby={tooltipId}
      type="button"
      class="trigger"
      aria-expanded={active}
      aria-label={buttonAriaLabel}
      onclick={toggleTooltip}
      onkeydown={handleKeydown}
      onmouseenter={handleMouseEnter}
      onmouseleave={handleMouseLeave}
      onfocus={handleMouseEnter}
      onblur={handleMouseLeave}
    >
      {buttonText}
    </button>

    <div 
      aria-hidden={!active} 
      id={tooltipId} 
      role="tooltip" 
      aria-label={label}
      class={`tooltip-container ${active ? 'active' : ''} position-${position}`}
    >
      {#if active}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          transition:fade={{ duration: 150 }}
          class="content"
          onmouseenter={handleInteraction}
          onmouseleave={handleMouseLeave}
        >
          {#if showHTML}
            {@html tip}
          {:else}
            {tip}
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
.tooltip {
  position: relative;
  z-index: 2;
  display: inline-block;
  /* Estos estilos ayudan con el centrado en Storybook */
  align-self: center;
  justify-self: center;
  margin: 0 auto;
}

/* Asegurar que el contenedor del tooltip se ajusta correctamente */
.tooltip-container {
  position: absolute;
  z-index: 10;
  width: 300px;
  visibility: hidden;
  opacity: 0;
  /* La transición suaviza la aparición/desaparición */
  transition: visibility 0s, opacity 0.2s;
}

.tooltip-container.active {
  visibility: visible;
  opacity: 1;
}

/* Asegurar que la posición bottom funciona correctamente */
.position-bottom {
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  margin-top: 10px;
}
  .trigger {
    padding: 0;
    margin: 0;
    width: 19px;
    height: 19px;
    line-height: 15px;
    font-size: 17px;
    text-align: center;
    background-color: transparent;
    border-radius: 50%;
    border: 3px solid #666666;
    color: #999999;
    cursor: pointer;
    font-weight: bold;
  }

  .trigger:focus {
    outline: 2px solid #000000;
    outline-offset: 2px;
  }
  
  .trigger:focus:not(:focus-visible) {
    outline: none;
  }
  
  .trigger:focus-visible {
    outline: 2px solid #000000;
    outline-offset: 2px;
  }

  .tooltip-container {
    position: absolute;
    z-index: 10;
    width: 300px;
    visibility: hidden;
    opacity: 0;
  }
  
  .tooltip-container.active {
    visibility: visible;
    opacity: 1;
  }
  

  
  .position-top {
    left: 50%;
    transform: translateX(-50%);
    bottom: 100%;
    margin-bottom: 10px;
  }
  
  .position-left {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 10px;
  }
  
  .position-right {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 10px;
  }

  .content {
    all: initial;
    position: relative;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    color: #333333;
    background-color: #ffffff;
    border: 1px solid #dddddd;
  }
  
  .position-bottom .content::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 6px 6px;
    border-style: solid;
    border-color: transparent transparent #ffffff;
  }
  
  .position-top .content::before {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px 6px 0;
    border-style: solid;
    border-color: #ffffff transparent transparent;
  }
  
  .position-left .content::before {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 6px 0 6px 6px;
    border-style: solid;
    border-color: transparent transparent transparent #ffffff;
  }
  
  .position-right .content::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 6px 6px 6px 0;
    border-style: solid;
    border-color: transparent #ffffff transparent transparent;
  }

  [role="tooltip"]:empty {
    display: none;
  }
  
  @media (prefers-color-scheme: dark) {
    .content {
      background-color: #333333;
      color: #ffffff;
      border-color: #555555;
    }
    
    .position-bottom .content::before,
    .position-top .content::before,
    .position-left .content::before,
    .position-right .content::before {
      border-color: #333333;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .content {
      transition: none !important;
    }
  }
</style>