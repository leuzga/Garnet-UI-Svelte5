<svelte:options customElement="garnet-selectbox" />

<!-- SelectBox.svelte -->
<script>
  // @ts-nocheck
  
  // Definición de props con $props()
  const { 
    selectOptions = [], 
    displayText = (a) => a.value, 
    index: initialIndex = 1, 
    disabled = false, 
    label = "Test dropdown:" 
  } = $props();

  // Estado local con $state()
  let index = $state(initialIndex);
  
  // Valor derivado con $derived() - sintaxis correcta
  let selected = $derived(selectOptions.find((o) => o.id === index) || {});
  
  // Referencia al elemento principal
  let garnetElement;
  
  // Función para manejar cambios
  function handleChange() {
    const changeEvent = new CustomEvent('change', {
      detail: { text: selected },
      bubbles: true,
      composed: true
    });
    
    // Disparar el evento desde el elemento garnet
    if (garnetElement) {
      garnetElement.dispatchEvent(changeEvent);
    }
  }
</script>

<div class="garnet" bind:this={garnetElement}>
  <label for="garnet-selectbox">{label}</label>
  <select 
    value={index} 
    onchange={(e) => {
      index = Number(e.target.value);
      handleChange();
    }} 
    name="garnet-selectbox"
    disabled={disabled} 
  >
    {#each selectOptions as option, i}
      <option value={option.id}>
        {displayText(option)}
      </option>
    {/each}
  </select>
</div>

<style>
  .garnet {
    display: flex;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
  }

  label {
    padding-right: 10px;
  }

  select {
    padding: 5px 100px 5px 5px; 
    font-size: 16px;
    border: 1px solid #733635;
    height: 34px;
    border-radius: 10px;
  }
  
  select:disabled {
    background-color: #f2f2f2;
    cursor: not-allowed;
    opacity: 0.7;
    border-color: #cccccc;
  }
  option:disabled {
    cursor: not-allowed;
  }
</style>