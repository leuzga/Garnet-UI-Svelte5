<!-- SelectBoxDecorator.svelte -->
<script>
  import { onMount } from 'svelte';

  // En Svelte 5 con runas
  let messageText = $state("SelectBox value is (not selected)");
  
  // Usamos un ID único para cada instancia del decorador
  const decoratorId = "decorator-" + Math.random().toString(36).substring(2, 9);
  
  onMount(() => {
    // Escuchar eventos a nivel de documento
    const handleChange = (event) => {
      // Verificar si el evento es relevante para este decorador
      const decoratorElem = document.getElementById(decoratorId);
      if (!decoratorElem) return;
      
      // Comprobar si el evento proviene de un hijo de este decorador
      if (decoratorElem.contains(event.target) || event.composedPath().includes(decoratorElem)) {
        // @ts-ignore
        if (event.detail && event.detail.text) {
          // @ts-ignore
          messageText = `SelectBox value is "${event.detail.text.value}"`;
        }
      }
    };
    
    // Escuchar a nivel de documento para capturar todos los eventos
    document.addEventListener('change', handleChange);
    
    return () => {
      document.removeEventListener('change', handleChange);
    };
  });
</script>

<div id={decoratorId} class="decorator-container">
  <slot />
  <div id="message4">{messageText}</div>
</div>

<style>
  .decorator-container {
    margin-top: 10px;
  }

  #message4 {
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 10px;
  }
</style>