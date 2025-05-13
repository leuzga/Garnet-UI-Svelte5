<svelte:options customElement="garnet-switch" />

<script>
  // En Svelte 5, usamos $props() en lugar de export let
  let { 
    id = "",
    label = "",
    css = "",
    size = "",
    isChecked = false,
    disabled = false,
    onchange = () => {},
    oninput = () => {}
  } = $props();

  const switchContainer = $derived([
    "switch-container",
    css ? css : "",
    disabled ? "disabled" : ""
  ].filter(c => c).join(" "));
  
  const classes = $derived(["switch", size ? `switch-${size}` : ""].join(" "));

  function handleChange(event) {
    onchange(event);
  }

  function handleInput(event) {
    oninput(event);
  }
</script>

<label class={switchContainer} for={id}>
  <input
    type="checkbox"
    class="switch-input"
    id={id}
    bind:checked={isChecked}
    disabled={disabled}
    onchange={handleChange}
    oninput={handleInput}
    role="switch"
  />
  <span class={classes}></span>
  <span class="switch-label">{label}</span>
</label>

<style>
  .switch-container {
    display: flex;
    min-height: 36px;
    width: 100%;
    padding: 8px;
    position: relative;
    align-items: center;
    gap: 12px; /* Añadimos espacio entre elementos */
  }
  
  .switch-container:hover {
    cursor: pointer;
  }
  
  .switch::before,
  .switch::after {
    border: 1px solid #ccc;
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  
  /* Estilos para el tamaño normal */
  .switch::after {
    background: #fff;
    border-radius: 100%;
    width: 22.4px;
    height: 22.4px;
    right: 22.4px;
    transition: right 200ms ease-in-out;
  }
  
  .switch::before {
    background: #eee;
    border-radius: 28px;
    width: 44px;
    height: 28px;
    right: 4px;
    transition: background 300ms ease-in-out;
  }
  
  /* Estilos específicos para el tamaño pequeño */
  .switch-small::after {
    width: 16px;
    height: 16px;
    right: 16px;
  }
  
  .switch-small::before {
    width: 32px;
    height: 20px;
    right: 4px;
  }
  
  /* Ajustamos la posición del circulo cuando está marcado */
  .switch-input:checked + .switch::after {
    right: 6.4px;
  }
  
  .switch-input:checked + .switch-small::after {
    right: 4px;
  }
  
  /* Estilos específicos para el tamaño grande */
  .switch-large::after {
    width: 28px;
    height: 28px;
    right: 28px;
  }
  
  .switch-large::before {
    width: 56px;
    height: 36px;
    right: 4px;
  }
  
  .switch-input:checked + .switch-large::after {
    right: 8px;
  }

  .switch-input {
    margin: 0;
    opacity: 0.01%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  
  .switch-input:focus + .switch::before {
    box-shadow: 0 0 0 3px rgb(55 149 225 / 50%);
  }
  
  .switch-input:checked + .switch:not(.switch-border)::before {
    background: #733635;
  }

  .switch-input[disabled] + .switch,
  .switch-input[disabled] + .switch-label,
  .switch-container.disabled {
    color:#717171;
    appearance: none;
    box-shadow: none;
    cursor: not-allowed;
    opacity: 80%;
  }
  
  /* Mejoramos el espaciado y estilo de la etiqueta */
  .switch-label {
    margin-left: 8px; /* Espacio adicional a la izquierda de la etiqueta */
    font-family: Arial, sans-serif;
    font-size: 14px;
  }
  
  .switch {
    position: relative;
    display: inline-block;
    min-width: 44px; /* Aseguramos un ancho mínimo */
  }
  
  .switch-small {
    min-width: 32px;
  }
  
  .switch-large {
    min-width: 56px;
  }
</style>