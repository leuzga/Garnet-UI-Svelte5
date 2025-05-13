<svelte:options customElement="garnet-checkbox" />
<script>
  // Usando la runa $props() para definir las propiedades del componente
  const { label = 'Checkbox', disabled = false, inputName = "", fieldID = "" } = $props();
  
  // Usando la runa $state() para el estado interno que puede cambiar
  let checked = $state(false);
  
  function updateStatus() {
    // Creamos y despachamos el evento personalizado
    const statusEvent = new CustomEvent('checkbox-status-change', {
      detail: { 
        status: disabled ? 'disabled' : (checked ? 'checked' : 'unchecked') 
      },
      bubbles: true
    });
    
    document.dispatchEvent(statusEvent);
  }

  // Usando $effect() en lugar de $: para reacciones
  $effect(() => {
    if (disabled || checked !== undefined) {
      updateStatus();
    }
  });
  
  function handleChange(event) {
    // Actualizamos el estado interno
    checked = event.target.checked;
    
    const customEvent = new CustomEvent('change', {
      detail: { checked: event.target.checked },
      bubbles: true,
      composed: true
    });
    event.target.dispatchEvent(customEvent);
  }
</script>

<div class="garnet-checkbox">
  <input type="checkbox" {checked} {disabled} name={inputName} id={fieldID} onchange={handleChange} />
  <label for={fieldID}>{label}</label>
</div>

<style>
  .garnet-checkbox {
    display: flex;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
  }
  input[type="checkbox"] {
    appearance: none;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
  }
  input[type="checkbox"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em #733635;
    background-color: CanvasText;
  }
  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }
  input[type="checkbox"]:disabled {
    color: #959495;
    cursor: not-allowed;
    opacity: 0.4;
  }
  label {
    margin-left: 0.5rem;
    user-select: none;
  }
</style>