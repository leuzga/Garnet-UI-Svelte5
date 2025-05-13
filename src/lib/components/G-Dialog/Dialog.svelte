
<svelte:options customElement="garnet-dialog" />

<script>
  // @ts-nocheck

  import CloseIcon from "./Close.svelte";
  
  let {
    showDialog = true,
    showBackground = false,
    modalTitle = "Modal title",
    modalText = "Click on the X to close me"
  } = $props();
  
  let dialogElement = $state(null);
  let closeButton = $state(null);
  let triggerButton = $state(null);
  let focusableElements = $state([]);
  let lastFocusedElement = $state(null);
  
  function toggleDialog() {
    showDialog = !showDialog;
  }
  
  function closeDialog() {
    showDialog = false;
  }
  
  $effect(() => {
    if (showDialog) {
      lastFocusedElement = document.activeElement;
      
      // Move focus to close button after render
      setTimeout(() => {
        if (closeButton) closeButton.focus();
      }, 50);
    } else if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  });
  
  function handleKeydown(event) {
    const { key, shiftKey } = event;
    
    // Handle Escape key
    if (key === 'Escape') {
      closeDialog();
      event.preventDefault();
      return;
    }
    
    // Only handle Tab key for focus trapping
    if (key !== 'Tab') return;
    
    // Get all focusable elements in dialog
    const elements = dialogElement 
      ? Array.from(dialogElement.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ))
      : [];
      
    focusableElements = elements;
    
    if (elements.length === 0) return;
    
    const firstElement = elements[0];
    const lastElement = elements[elements.length - 1];
    const currentElement = document.activeElement;
    const currentIndex = elements.indexOf(currentElement);
    
    const isFirstElement = currentIndex === 0;
    const isLastElement = currentIndex === elements.length - 1;
    const isOutsideDialog = currentIndex === -1;
    
    // Determine if we need to wrap focus
    const shouldWrapBackward = shiftKey && (isFirstElement || isOutsideDialog);
    const shouldWrapForward = !shiftKey && isLastElement;
    
    // Apply focus wrapping
    if (shouldWrapBackward) {
      lastElement.focus();
      event.preventDefault();
    } else if (shouldWrapForward) {
      firstElement.focus();
      event.preventDefault();
    }
  }
</script>

<button
  data-testid="buttonDialog"
  onclick={toggleDialog}
  bind:this={triggerButton}
  aria-haspopup="dialog"
  aria-expanded={showDialog}
>
  Show dialog
</button>

{#if showDialog}
  <div
    class="garnet-dialog"
    bind:this={dialogElement}
    role="dialog"
    aria-modal="true"
    aria-labelledby="dialog-title"
    aria-describedby="dialog-content"
    onkeydown={handleKeydown}
  >
    {#if showBackground}
      <div id="background" aria-hidden="true" />
    {/if}
    <div data-testid="modal" id="modal">
      <div class="header">
        <h3 id="dialog-title">{modalTitle}</h3>
        <button
          type="button"
          class="close"
          data-testid="close-button"
          title="close button"
          aria-label="Close dialog"
          onclick={closeDialog}
          bind:this={closeButton}
        >
          <CloseIcon />
        </button>
      </div>
      <div id="dialog-content">
        <p>{modalText}</p>
      </div>
    </div>
  </div>
{/if}

<style>
  .garnet-dialog {
    font-family: Arial, Helvetica, sans-serif;
  }

  @keyframes fadein {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  #background {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    animation: fadein 1s;
  }

  #modal {
    position: fixed;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 10px;
    width: 400px;
    height: 250px;
    border: 1px solid #c4c4c4;
    box-shadow: 2.5px 5.0px 5.0px hsl(0deg 0% 0% / 0.42);
  }

  .header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #c4c4c4;
  }

  button {
    background-color: #733635;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;  
  }

 button.close {
    background-color: #ffffff;
    padding: 10px 0 10px 0;    
  }

  button.close:hover {
    color: #d19c9b;
  }
</style>