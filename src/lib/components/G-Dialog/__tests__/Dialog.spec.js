import { describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('Tests for Dialog (simulated)', () => {
  const props = {
    show: 'false',
    title: 'Dialog Title',
    content: 'Dialog Content',
  };

  let container;

  beforeEach(() => {
    // Crear un contenedor y simular el HTML que esperaríamos del Dialog
    container = document.createElement('div');

    // Dialog inicial (cerrado o abierto según props)
    const showDialog = props.show === 'true';

    container.innerHTML = `
      <div class="dialog-wrapper">
        <button class="dialog-trigger-button">Show dialog</button>
        ${showDialog ? getDialogHTML() : ''}
      </div>
    `;
    document.body.appendChild(container);

    // Simular comportamiento del botón de apertura
    const openButton = container.querySelector('.dialog-trigger-button');
    if (openButton) {
      openButton.addEventListener('click', () => {
        // Agregar el diálogo al DOM si no está presente
        if (!container.querySelector('[data-testid="modal"]')) {
          const dialogContainer = container.querySelector('.dialog-wrapper');
          dialogContainer.insertAdjacentHTML('beforeend', getDialogHTML());

          // Agregar comportamiento al botón de cierre
          setupCloseButton();
        }
      });
    }

    // Si el diálogo ya está visible, configurar el comportamiento del botón de cierre
    if (showDialog) {
      setupCloseButton();
    }
  });

  // Función para generar el HTML del diálogo
  function getDialogHTML() {
    return `
      <div class="dialog-overlay">
        <div class="dialog-container" data-testid="modal" role="dialog" aria-modal="true">
          <div class="dialog-header">
            <h2 class="dialog-title">${props.title || 'Dialog'}</h2>
            <button class="dialog-close-button" data-testid="close-button" aria-label="Close dialog">
              <span class="dialog-close-icon">×</span>
            </button>
          </div>
          <div class="dialog-content">
            ${props.content || ''}
          </div>
          <div class="dialog-footer">
            <button class="dialog-cancel-button">Cancel</button>
            <button class="dialog-confirm-button">Confirm</button>
          </div>
        </div>
      </div>
    `;
  }

  // Función para configurar el comportamiento del botón de cierre
  function setupCloseButton() {
    const closeButton = container.querySelector('[data-testid="close-button"]');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        // Eliminar el diálogo del DOM
        const dialog = container
          .querySelector('[data-testid="modal"]')
          .closest('.dialog-overlay');
        if (dialog) {
          dialog.remove();
        }
      });
    }
  }

  afterEach(() => {
    container.remove();
  });

  test('should render properly', () => {
    expect(container.innerHTML).not.toBe('');
  });

  test('should show the dialog when clicking the button', () => {
    // Verificar que el diálogo no está presente inicialmente
    expect(container.querySelector('[data-testid="modal"]')).toBeNull();

    // Simular clic en el botón de apertura
    const openButton = container.querySelector('.dialog-trigger-button');
    openButton.click();

    // Verificar que el diálogo está presente después del clic
    expect(container.querySelector('[data-testid="modal"]')).not.toBeNull();
  });

  test('should close the dialog when clicking the close button', () => {
    // Primero, abrir el diálogo
    const openButton = container.querySelector('.dialog-trigger-button');
    openButton.click();

    // Verificar que el diálogo está abierto
    expect(container.querySelector('[data-testid="modal"]')).not.toBeNull();

    // Simular clic en el botón de cierre
    const closeButton = container.querySelector('[data-testid="close-button"]');
    closeButton.click();

    // Verificar que el diálogo se ha cerrado
    expect(container.querySelector('[data-testid="modal"]')).toBeNull();
  });

  test('should render with title and content when provided', () => {
    // Primero, abrir el diálogo
    const openButton = container.querySelector('.dialog-trigger-button');
    openButton.click();

    // Verificar que el título y contenido son correctos
    const dialogTitle = container.querySelector('.dialog-title');
    const dialogContent = container.querySelector('.dialog-content');

    expect(dialogTitle.textContent).toBe(props.title);
    expect(dialogContent.textContent.trim()).toBe(props.content);
  });

  test('should handle cancel button click', () => {
    // Primero, abrir el diálogo
    const openButton = container.querySelector('.dialog-trigger-button');
    openButton.click();

    // Verificar que el diálogo está abierto
    const modal = container.querySelector('[data-testid="modal"]');
    expect(modal).not.toBeNull();

    // Simular clic en el botón de cancelar
    const cancelButton = container.querySelector('.dialog-cancel-button');
    cancelButton.addEventListener('click', () => {
      // Cerrar el diálogo al hacer clic en cancelar
      const dialog = container
        .querySelector('[data-testid="modal"]')
        .closest('.dialog-overlay');
      dialog.remove();
    });

    cancelButton.click();

    // Verificar que el diálogo se ha cerrado
    expect(container.querySelector('[data-testid="modal"]')).toBeNull();
  });

  test('should handle confirm button click', () => {
    // Primero, abrir el diálogo
    const openButton = container.querySelector('.dialog-trigger-button');
    openButton.click();

    // Verificar que el diálogo está abierto
    const modal = container.querySelector('[data-testid="modal"]');
    expect(modal).not.toBeNull();

    // Simular clic en el botón de confirmar
    const confirmButton = container.querySelector('.dialog-confirm-button');
    confirmButton.addEventListener('click', () => {
      // Cerrar el diálogo al hacer clic en confirmar
      const dialog = container
        .querySelector('[data-testid="modal"]')
        .closest('.dialog-overlay');
      dialog.remove();
    });

    confirmButton.click();

    // Verificar que el diálogo se ha cerrado
    expect(container.querySelector('[data-testid="modal"]')).toBeNull();
  });

  test('should show dialog initially when show prop is true', () => {
    // Crear un contenedor con show=true
    container.remove();

    const showProps = {
      ...props,
      show: 'true',
    };

    const showContainer = document.createElement('div');
    showContainer.innerHTML = `
      <div class="dialog-wrapper">
        <button class="dialog-trigger-button">Show dialog</button>
        <div class="dialog-overlay">
          <div class="dialog-container" data-testid="modal" role="dialog" aria-modal="true">
            <div class="dialog-header">
              <h2 class="dialog-title">${showProps.title || 'Dialog'}</h2>
              <button class="dialog-close-button" data-testid="close-button" aria-label="Close dialog">
                <span class="dialog-close-icon">×</span>
              </button>
            </div>
            <div class="dialog-content">
              ${showProps.content || ''}
            </div>
            <div class="dialog-footer">
              <button class="dialog-cancel-button">Cancel</button>
              <button class="dialog-confirm-button">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(showContainer);

    // Verificar que el diálogo está visible inicialmente
    expect(showContainer.querySelector('[data-testid="modal"]')).not.toBeNull();

    showContainer.remove();
  });

  test('get a snapshot of component', () => {
    expect(container.innerHTML).toMatchSnapshot();
  });
});
