<svelte:options customElement="garnet-input" />

<script>
  export let label = 'Label:';
  export let placeholder = 'default placeholder';
  export let disabled = false;
  export let inputName = "";
  export let fieldID = "";
  export let value = undefined;
  

  function onInput(e) {
    const customEvent = new CustomEvent('input', {
      detail: { text: e.target.value },
      bubbles: true,
      composed: true
    });
    e.target.dispatchEvent(customEvent);
  }
</script>

<div class="garnet-input">
  {#if label}
    <label for={fieldID}>{label}</label>
  {/if}
  <input 
    type="text" 
    {placeholder} 
    {disabled} 
    name={inputName} 
    id={fieldID} 
    bind:value
    on:input={onInput} 
  />
</div>

<style>
  .garnet-input {
    display: flex;
    flex-direction: row;
    font-family: Arial, Helvetica, sans-serif;
  }
  input[type="text"] {
    width: 200px;
    border-radius: 4px;
    border-color: #733635;
    height: 30px;
    outline: none;
  }
  label {
    padding-right: 10px;
    display: flex;
    align-self: center;
  }
  input:disabled {
    cursor: not-allowed;
  }
</style>