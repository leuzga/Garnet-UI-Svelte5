<svelte:options customElement="garnet-accordionitem" />
<script>
// @ts-nocheck
  let { title, initialState = false } = $props();
  
  // Inicializar el estado con el valor de initialState
  let isOpen = $state(initialState);

  function toggleAccordion() {
    isOpen = !isOpen;
  }
</script>

<div class="accordion-item {isOpen ? 'active' : ''}">
  <button 
    type="button"
    class="accordion-header" 
    onclick={toggleAccordion}
    aria-expanded={isOpen}
    aria-controls={`accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
  >
    <span class="accordion-title">{title}</span>
    <span class="accordion-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
  </button>
  
  {#if isOpen}
    <div 
      class="accordion-body"
      id={`accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <slot />
    </div>
  {/if}
</div>

<style>
  .accordion-item {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background-color: #ffffff;
    overflow: hidden;
    transition: box-shadow 0.3s ease, transform 0.2s ease;
    margin-bottom: 8px;
  }

  .accordion-item.active {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    z-index: 1;
  }

  .accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 16px;
    cursor: pointer;
    background-color: #f9f9f9;
    border: none;
    border-bottom: 1px solid transparent;
    text-align: left;
    font-family: inherit;
    transition: background-color 0.2s ease;
    margin: 0; 
    box-sizing: border-box; 
  }

  .accordion-item.active .accordion-header {
    border-bottom-color: #e0e0e0;
  }

  .accordion-header:hover {
    background-color: #f0f0f0;
  }

  .accordion-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    flex: 1; 
  }

  .accordion-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    font-size: 18px;
    font-weight: 300;
    color: #666;
    flex-shrink: 0;
  }

  .accordion-body {
    background-color: white;
    padding: 12px;
  }
</style>