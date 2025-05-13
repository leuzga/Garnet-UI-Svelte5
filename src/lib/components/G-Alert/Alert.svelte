<svelte:options customElement="garnet-alert" />

<script>
// @ts-nocheck
  import { onMount } from 'svelte';

  let {
    show = false,
    showIcon = true,
    type = "",
    title = "",
    description = "",
    showAnimation = true,
    iconSize = "1em",
    // this props is only true in mode dev
    docsMode = true
  } = $props();

  // SVG paths para diferentes tipos de alerta
  const svgIcons = {
    'info': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
    'warn': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M1 21h22L12 2L1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
    'error': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z"/></svg>',
    'success': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
    'dark': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z"/><path fill="currentColor" d="M11 11h2v6h-2zm0-4h2v2h-2z"/></svg>',
    'default': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>'
  };

  // Obtener el SVG correspondiente al tipo
  function getIconSVG() {
    return svgIcons[type] || svgIcons['default'];
  }

  // Event handler function
  function closeAlert() {
    show = false;
  }
</script>

<div class="garnet-alert">
  {#if show}
    <dialog 
      class="alert {showAnimation ? 'fade-in' : ''} {docsMode ? 'docs-mode' : ''}"
      style:background={type === 'info' ? '#d4e6f9' : type === 'warn' ? '#fff8d4' : type === 'error' ? '#fde2e2' : type === 'success' ? '#e2f3e5' : type === 'dark' ? '#e0e0e0' : '#f5f5f5'}
      style:color={type === 'info' ? '#1a5fb4' : type === 'warn' ? '#b7831a' : type === 'error' ? '#c01c1c' : type === 'success' ? '#2a7735' : type === 'dark' ? '#333333' : '#505050'}
      style:border={`1px solid ${type === 'info' ? '#1a5fb4' : type === 'warn' ? '#b7831a' : type === 'error' ? '#c01c1c' : type === 'success' ? '#2a7735' : type === 'dark' ? '#333333' : '#d0d0d0'}`}
      style:border-radius="4px"
      style:box-shadow="0 2px 4px rgba(0, 0, 0, 0.1)"
      style:padding="12px 16px"
      style:margin="8px auto"
      style:position={docsMode ? 'relative' : 'fixed'}
      style:z-index={docsMode ? 'auto' : '9999'}
      style:left={docsMode ? 'auto' : '50%'}
      style:transform={docsMode ? 'none' : 'translateX(-50%)'}
      role="alertdialog" 
      title="Alert Dialog">
      <div class="icon" style="display: flex; align-items: center;">
        {#if showIcon}
          {@html getIconSVG()}
        {/if}
      </div>
      <div class="message">
        <strong>
          {title}
        </strong>
        <span>{description}</span>
      </div>
      <div>
        <button onclick={closeAlert}>&#x2716;</button>
      </div>
    </dialog>
  {/if}
</div>

<style>
  dialog.alert {
    min-width: 300px;
    max-width: 80%;
    display: flex;
    justify-content: center;
    font-family: Arial, Helvetica, sans-serif;
  }

  /* Nuevo estilo para modo documentación */
  dialog.docs-mode {
    position: relative !important;
    transform: none !important;
    left: auto !important;
    margin: 0 auto !important;
    width: 100% !important;
  }

  button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  button:hover {
    opacity: 1;
  }

  .icon {
    margin-right: 12px;
    display: flex;
    align-items: center;
  }

  .message {
    display: flex;
    flex-direction: column;
    line-height: 1.5;
    flex-grow: 1;
  }

  .message strong {
    margin-bottom: 2px;
    font-weight: 600;
  }

  .fade-in {
    animation: fade-in 500ms ease-out both;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-8px) translateX(-50%);
    }
    to {
      opacity: 1;
      transform: translateY(0) translateX(-50%);
    }
  }

  /* Animación modificada para modo documentación */
  .docs-mode.fade-in {
    animation: fade-in-docs 500ms ease-out both;
  }

  @keyframes fade-in-docs {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>