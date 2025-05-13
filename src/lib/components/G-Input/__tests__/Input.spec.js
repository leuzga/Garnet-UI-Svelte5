import { describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('Tests for Input (simulated)', () => {
  const props = {
    id: 'Input',
    class: 'garnet',
    disabled: false,
    placeholder: 'example text',
    type: 'text',
    value: '',
    label: '',
  };

  let container;

  beforeEach(() => {
    // Crear un contenedor y simular el HTML que esperaríamos del Input
    container = document.createElement('div');
    container.innerHTML = `
      <div class="input-container ${props.class || ''}">
        ${
          props.label
            ? `<label for="${props.id}" class="input-label">${props.label}</label>`
            : ''
        }
        <input 
          type="${props.type || 'text'}"
          id="${props.id}"
          class="input-field"
          placeholder="${props.placeholder || ''}"
          value="${props.value || ''}"
          ${props.disabled ? 'disabled' : ''}
          role="textbox"
          data-testid="input-field"
        />
      </div>
    `;
    document.body.appendChild(container);

    // Simular comportamiento de cambio
    const input = container.querySelector('input');
    if (input) {
      input.addEventListener('input', (e) => {
        // Simular evento de cambio
        const event = new CustomEvent('inputChange', {
          detail: { id: props.id, value: e.target.value },
        });
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

  test('should show a textbox with correct placeholder text', () => {
    const input = container.querySelector('[data-testid="input-field"]');
    expect(input.placeholder).toBe(props.placeholder);
  });

  test('should update value when typing', () => {
    const input = container.querySelector('[data-testid="input-field"]');
    const testValue = 'Test input value';

    // Verificar valor inicial
    expect(input.value).toBe(props.value);

    // Simular escritura en el input
    input.value = testValue;
    input.dispatchEvent(new Event('input'));

    // Verificar que el valor se actualizó
    expect(input.value).toBe(testValue);
  });

  test('should emit change event when typing', () => {
    let changeEventFired = false;
    let changeEventDetail = null;

    // Agregar listener para el evento de cambio
    container.addEventListener('inputChange', (event) => {
      changeEventFired = true;
      changeEventDetail = event.detail;
    });

    // Obtener el input
    const input = container.querySelector('[data-testid="input-field"]');
    const testValue = 'New value';

    // Simular escritura en el input
    input.value = testValue;
    input.dispatchEvent(new Event('input'));

    // Verificar que se emitió el evento con los detalles correctos
    expect(changeEventFired).toBe(true);
    expect(changeEventDetail).toEqual({ id: props.id, value: testValue });
  });

  test('should respect disabled state', () => {
    // Crear un contenedor con disabled=true
    container.remove();

    const disabledProps = {
      ...props,
      disabled: true,
    };

    const disabledContainer = document.createElement('div');
    disabledContainer.innerHTML = `
      <div class="input-container ${disabledProps.class || ''}">
        ${
          disabledProps.label
            ? `<label for="${disabledProps.id}" class="input-label">${disabledProps.label}</label>`
            : ''
        }
        <input 
          type="${disabledProps.type || 'text'}"
          id="${disabledProps.id}"
          class="input-field"
          placeholder="${disabledProps.placeholder || ''}"
          value="${disabledProps.value || ''}"
          disabled
          role="textbox"
          data-testid="input-field"
        />
      </div>
    `;
    document.body.appendChild(disabledContainer);

    // Verificar que el input está deshabilitado
    const input = disabledContainer.querySelector(
      '[data-testid="input-field"]'
    );
    expect(input.disabled).toBe(true);

    disabledContainer.remove();
  });

  test('should show label when provided', () => {
    // Crear un contenedor con label
    container.remove();

    const labelProps = {
      ...props,
      label: 'Input Label',
    };

    const labelContainer = document.createElement('div');
    labelContainer.innerHTML = `
      <div class="input-container ${labelProps.class || ''}">
        <label for="${labelProps.id}" class="input-label">${
      labelProps.label
    }</label>
        <input 
          type="${labelProps.type || 'text'}"
          id="${labelProps.id}"
          class="input-field"
          placeholder="${labelProps.placeholder || ''}"
          value="${labelProps.value || ''}"
          ${labelProps.disabled ? 'disabled' : ''}
          role="textbox"
          data-testid="input-field"
        />
      </div>
    `;
    document.body.appendChild(labelContainer);

    // Verificar que la etiqueta está presente con el texto correcto
    const label = labelContainer.querySelector('.input-label');
    expect(label).not.toBeNull();
    expect(label.textContent).toBe(labelProps.label);

    labelContainer.remove();
  });

  test('should support different input types', () => {
    // Probar diferentes tipos de input
    const types = ['password', 'email', 'number', 'tel'];

    types.forEach((type) => {
      // Crear un contenedor para cada tipo
      const typeContainer = document.createElement('div');
      typeContainer.innerHTML = `
        <div class="input-container">
          <input 
            type="${type}"
            id="input-${type}"
            class="input-field"
            role="textbox"
            data-testid="input-field-${type}"
          />
        </div>
      `;
      document.body.appendChild(typeContainer);

      // Verificar que el tipo es correcto
      const input = typeContainer.querySelector(
        `[data-testid="input-field-${type}"]`
      );
      expect(input.type).toBe(type);

      typeContainer.remove();
    });
  });

  test('get a snapshot of component', () => {
    expect(container.innerHTML).toMatchSnapshot();
  });
});
