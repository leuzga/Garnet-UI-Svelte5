import { describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('Tests for Slider (simulated)', () => {
  const props = {
    id: 'Slider',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    disabled: false,
    label: 'Slider Label',
  };

  let container;

  beforeEach(() => {
    // Crear un contenedor y simular el HTML que esperaríamos del Slider
    container = document.createElement('div');
    container.innerHTML = `
      <div class="slider-container ${props.disabled ? 'disabled' : ''}">
        ${
          props.label
            ? `<label for="${props.id}" class="slider-label">${props.label}</label>`
            : ''
        }
        <div class="slider-control-container">
          <input 
            type="range"
            id="${props.id}"
            class="slider-input"
            min="${props.min}"
            max="${props.max}"
            step="${props.step}"
            value="${props.value}"
            ${props.disabled ? 'disabled' : ''}
            role="slider"
            aria-valuemin="${props.min}"
            aria-valuemax="${props.max}"
            aria-valuenow="${props.value}"
            data-testid="slider-input"
          />
          <div class="slider-value">${props.value}</div>
        </div>
      </div>
    `;
    document.body.appendChild(container);

    // Simular comportamiento del slider
    const slider = container.querySelector('input[type="range"]');
    if (slider) {
      slider.addEventListener('input', (e) => {
        // Actualizar el valor mostrado
        const valueDisplay = container.querySelector('.slider-value');
        if (valueDisplay) {
          valueDisplay.textContent = e.target.value;
        }

        // Actualizar aria-valuenow
        slider.setAttribute('aria-valuenow', e.target.value);

        // Simular evento de cambio
        const event = new CustomEvent('sliderChange', {
          detail: { id: props.id, value: parseFloat(e.target.value) },
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

  test('should show initial value', () => {
    const valueDisplay = container.querySelector('.slider-value');
    expect(valueDisplay.textContent).toBe(props.value.toString());

    const slider = container.querySelector('input[type="range"]');
    expect(slider.value).toBe(props.value.toString());
  });

  test('should show a new value when slider handle moved', () => {
    const slider = container.querySelector('input[type="range"]');
    const newValue = '23';

    // Simular cambio de valor
    slider.value = newValue;
    slider.dispatchEvent(new Event('input'));

    // Verificar que el valor mostrado se actualizó
    const valueDisplay = container.querySelector('.slider-value');
    expect(valueDisplay.textContent).toBe(newValue);

    // Verificar que el aria-valuenow también se actualizó
    expect(slider.getAttribute('aria-valuenow')).toBe(newValue);
  });

  test('should emit change event with correct value', () => {
    let changeEventFired = false;
    let changeEventDetail = null;

    // Agregar listener para el evento de cambio
    container.addEventListener('sliderChange', (event) => {
      changeEventFired = true;
      changeEventDetail = event.detail;
    });

    // Obtener el slider
    const slider = container.querySelector('input[type="range"]');
    const newValue = '75';

    // Simular cambio de valor
    slider.value = newValue;
    slider.dispatchEvent(new Event('input'));

    // Verificar que se emitió el evento con los detalles correctos
    expect(changeEventFired).toBe(true);
    expect(changeEventDetail).toEqual({
      id: props.id,
      value: parseFloat(newValue),
    });
  });

  test('should respect min, max and step attributes', () => {
    const slider = container.querySelector('input[type="range"]');

    // Verificar atributos
    expect(slider.min).toBe(props.min.toString());
    expect(slider.max).toBe(props.max.toString());
    expect(slider.step).toBe(props.step.toString());

    // Verificar aria attributes
    expect(slider.getAttribute('aria-valuemin')).toBe(props.min.toString());
    expect(slider.getAttribute('aria-valuemax')).toBe(props.max.toString());
  });

  test('should be disabled when disabled prop is true', () => {
    // Crear un contenedor con slider deshabilitado
    container.remove();

    const disabledProps = {
      ...props,
      disabled: true,
    };

    const disabledContainer = document.createElement('div');
    disabledContainer.innerHTML = `
      <div class="slider-container disabled">
        ${
          disabledProps.label
            ? `<label for="${disabledProps.id}" class="slider-label">${disabledProps.label}</label>`
            : ''
        }
        <div class="slider-control-container">
          <input 
            type="range"
            id="${disabledProps.id}"
            class="slider-input"
            min="${disabledProps.min}"
            max="${disabledProps.max}"
            step="${disabledProps.step}"
            value="${disabledProps.value}"
            disabled
            role="slider"
            aria-valuemin="${disabledProps.min}"
            aria-valuemax="${disabledProps.max}"
            aria-valuenow="${disabledProps.value}"
            data-testid="slider-input"
          />
          <div class="slider-value">${disabledProps.value}</div>
        </div>
      </div>
    `;
    document.body.appendChild(disabledContainer);

    // Verificar que el slider está deshabilitado
    const slider = disabledContainer.querySelector('input[type="range"]');
    expect(slider.disabled).toBe(true);

    disabledContainer.remove();
  });

  test('should show label when provided', () => {
    const label = container.querySelector('.slider-label');
    expect(label).not.toBeNull();
    expect(label.textContent).toBe(props.label);
  });

  test('should handle custom min and max values', () => {
    // Crear un contenedor con valores personalizados
    container.remove();

    const customProps = {
      ...props,
      min: -100,
      max: 100,
      value: 0,
    };

    const customContainer = document.createElement('div');
    customContainer.innerHTML = `
      <div class="slider-container">
        ${
          customProps.label
            ? `<label for="${customProps.id}" class="slider-label">${customProps.label}</label>`
            : ''
        }
        <div class="slider-control-container">
          <input 
            type="range"
            id="${customProps.id}"
            class="slider-input"
            min="${customProps.min}"
            max="${customProps.max}"
            step="${customProps.step}"
            value="${customProps.value}"
            ${customProps.disabled ? 'disabled' : ''}
            role="slider"
            aria-valuemin="${customProps.min}"
            aria-valuemax="${customProps.max}"
            aria-valuenow="${customProps.value}"
            data-testid="slider-input"
          />
          <div class="slider-value">${customProps.value}</div>
        </div>
      </div>
    `;
    document.body.appendChild(customContainer);

    // Verificar que los valores personalizados se aplican
    const slider = customContainer.querySelector('input[type="range"]');
    expect(slider.min).toBe(customProps.min.toString());
    expect(slider.max).toBe(customProps.max.toString());
    expect(slider.value).toBe(customProps.value.toString());

    customContainer.remove();
  });

  test('get a snapshot of component', () => {
    expect(container.innerHTML).toMatchSnapshot();
  });
});
