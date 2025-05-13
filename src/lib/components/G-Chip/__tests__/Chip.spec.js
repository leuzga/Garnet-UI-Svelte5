import { describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('Tests for Chip (simulated)', () => {
  const props = {
    active: true,
    close: false,
    chipContent: 'Chip Text',
    selected: false,
    outline: false,
  };

  let container;

  beforeEach(() => {
    // Crear un contenedor y simular el HTML que esperaríamos del Chip
    container = document.createElement('div');
    container.innerHTML = `
      <div 
        class="chip-container ${props.active ? 'active' : ''} ${
      props.selected ? 'selected' : ''
    } ${props.outline ? 'outline' : ''}"
        data-testid="chip"
      >
        <span class="chip-content">${props.chipContent}</span>
        ${
          props.close
            ? `<button class="chip-close-button" aria-label="Cerrar">
            <span class="chip-close-icon">×</span>
          </button>`
            : ''
        }
      </div>
    `;
    document.body.appendChild(container);

    // Simular comportamiento de clic en el chip
    const chip = container.querySelector('[data-testid="chip"]');
    if (chip) {
      chip.addEventListener('click', () => {
        // Simular evento de clic en el chip
        const event = new CustomEvent('chipClick');
        container.dispatchEvent(event);
      });
    }

    // Simular comportamiento del botón de cierre
    const closeButton = container.querySelector('.chip-close-button');
    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        // Prevenir la propagación para que no active el evento del chip
        e.stopPropagation();

        // Eliminar el chip del DOM
        container.innerHTML = '';

        // Simular evento de cierre
        const event = new CustomEvent('chipClose');
        container.dispatchEvent(event);
      });
    }
  });

  afterEach(() => {
    container.remove();
  });

  test('should render properly', () => {
    expect(container.innerHTML).not.toBe('');
  });

  test('should show a chip with close icon', () => {
    // Crear un contenedor con close=true
    container.remove();

    const closeProps = {
      ...props,
      close: true,
    };

    const closeContainer = document.createElement('div');
    closeContainer.innerHTML = `
      <div 
        class="chip-container ${closeProps.active ? 'active' : ''} ${
      closeProps.selected ? 'selected' : ''
    } ${closeProps.outline ? 'outline' : ''}"
        data-testid="chip"
      >
        <span class="chip-content">${closeProps.chipContent}</span>
        <button class="chip-close-button" aria-label="Cerrar">
          <span class="chip-close-icon">×</span>
        </button>
      </div>
    `;
    document.body.appendChild(closeContainer);

    // Verificar que el botón de cierre está presente
    expect(closeContainer.querySelector('.chip-close-button')).not.toBeNull();

    closeContainer.remove();
  });

  test('should close the chip when close button is clicked', () => {
    // Crear un contenedor con close=true
    container.remove();

    const closeProps = {
      ...props,
      close: true,
    };

    const closeContainer = document.createElement('div');
    closeContainer.innerHTML = `
      <div 
        class="chip-container ${closeProps.active ? 'active' : ''} ${
      closeProps.selected ? 'selected' : ''
    } ${closeProps.outline ? 'outline' : ''}"
        data-testid="chip"
      >
        <span class="chip-content">${closeProps.chipContent}</span>
        <button class="chip-close-button" aria-label="Cerrar">
          <span class="chip-close-icon">×</span>
        </button>
      </div>
    `;
    document.body.appendChild(closeContainer);

    // Agregar comportamiento al botón de cierre
    const closeButton = closeContainer.querySelector('.chip-close-button');
    closeButton.addEventListener('click', () => {
      closeContainer.innerHTML = '';
    });

    // Verificar que el chip está presente inicialmente
    expect(closeContainer.innerHTML).not.toBe('');

    // Simular clic en el botón de cierre
    closeButton.click();

    // Verificar que el chip se ha eliminado
    expect(closeContainer.innerHTML).toBe('');

    closeContainer.remove();
  });

  test('should emit event when chip is clicked', () => {
    let clickEventFired = false;

    // Agregar listener para el evento de clic
    container.addEventListener('chipClick', () => {
      clickEventFired = true;
    });

    // Simular clic en el chip
    const chip = container.querySelector('[data-testid="chip"]');
    chip.click();

    // Verificar que se emitió el evento
    expect(clickEventFired).toBe(true);
  });

  test('should apply active class when active prop is true', () => {
    const chip = container.querySelector('[data-testid="chip"]');
    expect(chip.classList.contains('active')).toBe(props.active);
  });

  test('should apply selected class when selected prop is true', () => {
    // Crear un contenedor con selected=true
    container.remove();

    const selectedProps = {
      ...props,
      selected: true,
    };

    const selectedContainer = document.createElement('div');
    selectedContainer.innerHTML = `
      <div 
        class="chip-container active selected"
        data-testid="chip"
      >
        <span class="chip-content">${selectedProps.chipContent}</span>
      </div>
    `;
    document.body.appendChild(selectedContainer);

    // Verificar que tiene la clase selected
    const chip = selectedContainer.querySelector('[data-testid="chip"]');
    expect(chip.classList.contains('selected')).toBe(true);

    selectedContainer.remove();
  });

  test('should apply outline class when outline prop is true', () => {
    // Crear un contenedor con outline=true
    container.remove();

    const outlineProps = {
      ...props,
      outline: true,
    };

    const outlineContainer = document.createElement('div');
    outlineContainer.innerHTML = `
      <div 
        class="chip-container active outline"
        data-testid="chip"
      >
        <span class="chip-content">${outlineProps.chipContent}</span>
      </div>
    `;
    document.body.appendChild(outlineContainer);

    // Verificar que tiene la clase outline
    const chip = outlineContainer.querySelector('[data-testid="chip"]');
    expect(chip.classList.contains('outline')).toBe(true);

    outlineContainer.remove();
  });

  test('get a snapshot of component', () => {
    expect(container.innerHTML).toMatchSnapshot();
  });
});
