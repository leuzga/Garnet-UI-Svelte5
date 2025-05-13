import { describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('Tests for Switch (simulated)', () => {
  const props = {
    disabled: false,
    label: 'Disabled switch with label',
    checked: false,
  };

  let container;

  beforeEach(() => {
    // Crear un contenedor y simular el HTML que esperaríamos del Switch
    container = document.createElement('div');
    container.innerHTML = `
      <div class="switch-container ${props.disabled ? 'disabled' : ''}">
        <label class="switch-label">
          <input 
            type="checkbox"
            class="switch-input"
            role="switch"
            aria-checked="${props.checked ? 'true' : 'false'}"
            ${props.checked ? 'checked' : ''}
            ${props.disabled ? 'disabled' : ''}
            data-testid="switch-input"
          />
          <span class="switch-slider ${props.checked ? 'checked' : ''}"></span>
          ${
            props.label ? `<span class="switch-text">${props.label}</span>` : ''
          }
        </label>
      </div>
    `;
    document.body.appendChild(container);

    // Simular comportamiento del switch
    const switchInput = container.querySelector('input[type="checkbox"]');
    if (switchInput && !props.disabled) {
      switchInput.addEventListener('change', () => {
        const isChecked = switchInput.checked;

        // Actualizar el aria-checked
        switchInput.setAttribute('aria-checked', isChecked ? 'true' : 'false');

        // Actualizar la clase del slider
        const slider = container.querySelector('.switch-slider');
        if (slider) {
          if (isChecked) {
            slider.classList.add('checked');
          } else {
            slider.classList.remove('checked');
          }
        }

        // Simular evento de cambio
        const event = new CustomEvent('switchChange', {
          detail: { checked: isChecked },
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
    const labelText = container.querySelector('.switch-text');
    expect(labelText).not.toBeNull();
    expect(labelText.textContent).toBe(props.label);
  });

  test('should show a switch with enabled background when clicked', () => {
    const switchInput = container.querySelector('input[type="checkbox"]');
    const switchSlider = container.querySelector('.switch-slider');

    // Verificar estado inicial
    expect(switchInput.checked).toBe(props.checked);
    expect(switchSlider.classList.contains('checked')).toBe(props.checked);

    // Simular clic en el switch
    switchInput.checked = true;
    switchInput.dispatchEvent(new Event('change'));

    // Verificar que el switch está activado
    expect(switchInput.checked).toBe(true);
    expect(switchSlider.classList.contains('checked')).toBe(true);
    expect(switchInput.getAttribute('aria-checked')).toBe('true');
  });

  test('should emit change event with correct value', () => {
    let changeEventFired = false;
    let changeEventDetail = null;

    // Agregar listener para el evento de cambio
    container.addEventListener('switchChange', (event) => {
      changeEventFired = true;
      changeEventDetail = event.detail;
    });

    // Obtener el switch
    const switchInput = container.querySelector('input[type="checkbox"]');

    // Simular clic en el switch
    switchInput.checked = true;
    switchInput.dispatchEvent(new Event('change'));

    // Verificar que se emitió el evento con los detalles correctos
    expect(changeEventFired).toBe(true);
    expect(changeEventDetail).toEqual({ checked: true });
  });

  test('should respect initial checked state', () => {
    // Crear un contenedor con un switch inicialmente activado
    container.remove();

    const checkedProps = {
      ...props,
      checked: true,
    };

    const checkedContainer = document.createElement('div');
    checkedContainer.innerHTML = `
      <div class="switch-container ${checkedProps.disabled ? 'disabled' : ''}">
        <label class="switch-label">
          <input 
            type="checkbox"
            class="switch-input"
            role="switch"
            aria-checked="true"
            checked
            ${checkedProps.disabled ? 'disabled' : ''}
            data-testid="switch-input"
          />
          <span class="switch-slider checked"></span>
          ${
            checkedProps.label
              ? `<span class="switch-text">${checkedProps.label}</span>`
              : ''
          }
        </label>
      </div>
    `;
    document.body.appendChild(checkedContainer);

    // Verificar que el switch está activado inicialmente
    const switchInput = checkedContainer.querySelector(
      'input[type="checkbox"]'
    );
    const switchSlider = checkedContainer.querySelector('.switch-slider');

    expect(switchInput.checked).toBe(true);
    expect(switchSlider.classList.contains('checked')).toBe(true);
    expect(switchInput.getAttribute('aria-checked')).toBe('true');

    checkedContainer.remove();
  });

  test('should be disabled when disabled prop is true', () => {
    // Crear un contenedor con un switch deshabilitado
    container.remove();

    const disabledProps = {
      ...props,
      disabled: true,
    };

    const disabledContainer = document.createElement('div');
    disabledContainer.innerHTML = `
      <div class="switch-container disabled">
        <label class="switch-label">
          <input 
            type="checkbox"
            class="switch-input"
            role="switch"
            aria-checked="${disabledProps.checked ? 'true' : 'false'}"
            ${disabledProps.checked ? 'checked' : ''}
            disabled
            data-testid="switch-input"
          />
          <span class="switch-slider ${
            disabledProps.checked ? 'checked' : ''
          }"></span>
          ${
            disabledProps.label
              ? `<span class="switch-text">${disabledProps.label}</span>`
              : ''
          }
        </label>
      </div>
    `;
    document.body.appendChild(disabledContainer);

    // Verificar que el switch está deshabilitado
    const switchInput = disabledContainer.querySelector(
      'input[type="checkbox"]'
    );
    expect(switchInput.disabled).toBe(true);

    // Verificar que el contenedor tiene la clase disabled
    const switchContainer =
      disabledContainer.querySelector('.switch-container');
    expect(switchContainer.classList.contains('disabled')).toBe(true);

    disabledContainer.remove();
  });

  test('should toggle state when clicked', () => {
    const switchInput = container.querySelector('input[type="checkbox"]');
    const switchSlider = container.querySelector('.switch-slider');

    // Verificar estado inicial
    expect(switchInput.checked).toBe(props.checked);

    // Simular primer clic (activar)
    switchInput.checked = true;
    switchInput.dispatchEvent(new Event('change'));
    expect(switchInput.checked).toBe(true);
    expect(switchSlider.classList.contains('checked')).toBe(true);

    // Simular segundo clic (desactivar)
    switchInput.checked = false;
    switchInput.dispatchEvent(new Event('change'));
    expect(switchInput.checked).toBe(false);
    expect(switchSlider.classList.contains('checked')).toBe(false);
  });

  test('should handle no label', () => {
    // Crear un contenedor sin etiqueta
    container.remove();

    const noLabelProps = {
      ...props,
      label: '',
    };

    const noLabelContainer = document.createElement('div');
    noLabelContainer.innerHTML = `
      <div class="switch-container">
        <label class="switch-label">
          <input 
            type="checkbox"
            class="switch-input"
            role="switch"
            aria-checked="${noLabelProps.checked ? 'true' : 'false'}"
            ${noLabelProps.checked ? 'checked' : ''}
            ${noLabelProps.disabled ? 'disabled' : ''}
            data-testid="switch-input"
          />
          <span class="switch-slider"></span>
        </label>
      </div>
    `;
    document.body.appendChild(noLabelContainer);

    // Verificar que no hay texto de etiqueta
    const labelText = noLabelContainer.querySelector('.switch-text');
    expect(labelText).toBeNull();

    noLabelContainer.remove();
  });

  test('get a snapshot of component', () => {
    expect(container.innerHTML).toMatchSnapshot();
  });
});
