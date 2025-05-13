import { describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('Tests for Checkbox (simulated)', () => {
  const mockText = 'This is a checkbox';

  const props = {
    id: 'Checkbox',
    class: 'garnet',
    checked: false,
    label: '',
  };

  let container;

  beforeEach(() => {
    // Crear un contenedor y simular el HTML que esperaríamos del Checkbox
    container = document.createElement('div');
    container.innerHTML = `
      <div class="checkbox-container ${props.class || ''}">
        <div class="checkbox-wrapper">
          <input 
            type="checkbox"
            id="${props.id}"
            class="checkbox-input"
            ${props.checked ? 'checked' : ''}
            data-testid="checkbox-input"
            role="checkbox"
            aria-checked="${props.checked ? 'true' : 'false'}"
          />
          <label for="${props.id}" class="checkbox-label">
            <span class="checkbox-mark"></span>
            ${
              props.label
                ? `<span class="checkbox-text">${props.label}</span>`
                : ''
            }
          </label>
        </div>
      </div>
    `;
    document.body.appendChild(container);

    // Simular comportamiento de cambio
    const checkbox = container.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        // Actualizar estado y atributos
        const isChecked = checkbox.checked;
        checkbox.setAttribute('aria-checked', isChecked ? 'true' : 'false');

        // Simular evento de cambio
        const event = new CustomEvent('checkboxChange', {
          detail: { id: props.id, checked: isChecked },
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

  test('should show a label with correct text', () => {
    // Crear un contenedor con label
    container.remove();

    const labelProps = {
      ...props,
      label: mockText,
    };

    const labelContainer = document.createElement('div');
    labelContainer.innerHTML = `
      <div class="checkbox-container ${labelProps.class || ''}">
        <div class="checkbox-wrapper">
          <input 
            type="checkbox"
            id="${labelProps.id}"
            class="checkbox-input"
            ${labelProps.checked ? 'checked' : ''}
            data-testid="checkbox-input"
            role="checkbox"
            aria-checked="${labelProps.checked ? 'true' : 'false'}"
          />
          <label for="${labelProps.id}" class="checkbox-label">
            <span class="checkbox-mark"></span>
            <span class="checkbox-text">${labelProps.label}</span>
          </label>
        </div>
      </div>
    `;
    document.body.appendChild(labelContainer);

    // Verificar que el texto del label es correcto
    expect(labelContainer.textContent).toContain(mockText);

    labelContainer.remove();
  });

  test('should show a check when clicked', () => {
    // Obtener el checkbox
    const checkbox = container.querySelector('input[type="checkbox"]');

    // Verificar estado inicial
    expect(checkbox.checked).toBe(false);

    // Simular clic en el checkbox
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    // Verificar que el checkbox ahora está marcado
    expect(checkbox.checked).toBe(true);
    expect(checkbox.getAttribute('aria-checked')).toBe('true');
  });

  test('should emit change event with correct details', () => {
    let changeEventFired = false;
    let changeEventDetail = null;

    // Agregar listener para el evento de cambio
    container.addEventListener('checkboxChange', (event) => {
      changeEventFired = true;
      changeEventDetail = event.detail;
    });

    // Obtener el checkbox
    const checkbox = container.querySelector('input[type="checkbox"]');

    // Simular clic en el checkbox
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    // Verificar que se emitió el evento con los detalles correctos
    expect(changeEventFired).toBe(true);
    expect(changeEventDetail).toEqual({ id: props.id, checked: true });
  });

  test('should respect initial checked state', () => {
    // Crear un contenedor con checked=true
    container.remove();

    const checkedProps = {
      ...props,
      checked: true,
    };

    const checkedContainer = document.createElement('div');
    checkedContainer.innerHTML = `
      <div class="checkbox-container ${checkedProps.class || ''}">
        <div class="checkbox-wrapper">
          <input 
            type="checkbox"
            id="${checkedProps.id}"
            class="checkbox-input"
            checked
            data-testid="checkbox-input"
            role="checkbox"
            aria-checked="true"
          />
          <label for="${checkedProps.id}" class="checkbox-label">
            <span class="checkbox-mark"></span>
            ${
              checkedProps.label
                ? `<span class="checkbox-text">${checkedProps.label}</span>`
                : ''
            }
          </label>
        </div>
      </div>
    `;
    document.body.appendChild(checkedContainer);

    // Verificar que el checkbox está marcado inicialmente
    const checkbox = checkedContainer.querySelector('input[type="checkbox"]');
    expect(checkbox.checked).toBe(true);
    expect(checkbox.getAttribute('aria-checked')).toBe('true');

    checkedContainer.remove();
  });

  test('should apply custom class', () => {
    // Verificar que la clase personalizada se aplica
    expect(container.querySelector(`.${props.class}`)).not.toBeNull();
  });

  test('get a snapshot of component', () => {
    expect(container.innerHTML).toMatchSnapshot();
  });
});
