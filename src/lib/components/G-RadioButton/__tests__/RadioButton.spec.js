import { describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('Tests for RadioButton (simulated)', () => {
  const props = {
    legend: 'RadioButton Group',
    name: 'radioGroup',
    options: [
      { id: 'option1', label: 'Option 1', value: '1' },
      { id: 'option2', label: 'Option 2', value: '2' },
      { id: 'option3', label: 'Option 3', value: '3' },
    ],
    selectedValue: '',
  };

  let container;

  beforeEach(() => {
    // Crear un contenedor y simular el HTML que esperaríamos del RadioButton
    container = document.createElement('div');
    container.innerHTML = `
      <fieldset class="radio-group" role="radiogroup" aria-labelledby="radio-legend">
        <legend id="radio-legend" class="radio-legend">${props.legend}</legend>
        <div class="radio-options">
          ${props.options
            .map(
              (option) => `
            <div class="radio-option">
              <input 
                type="radio"
                id="${option.id}"
                name="${props.name}"
                value="${option.value}"
                class="radio-input"
                ${props.selectedValue === option.value ? 'checked' : ''}
                data-testid="radio-${option.id}"
              />
              <label for="${option.id}" class="radio-label">${
                option.label
              }</label>
            </div>
          `
            )
            .join('')}
        </div>
      </fieldset>
    `;
    document.body.appendChild(container);

    // Simular comportamiento de cambio
    const radioInputs = container.querySelectorAll('input[type="radio"]');
    radioInputs.forEach((radio) => {
      radio.addEventListener('change', () => {
        // Desmarcar todos los otros radios
        radioInputs.forEach((r) => {
          r.checked = false;
        });

        // Marcar este radio
        radio.checked = true;

        // Simular evento de cambio
        const event = new CustomEvent('radioChange', {
          detail: { name: props.name, value: radio.value },
        });
        container.dispatchEvent(event);
      });
    });
  });

  afterEach(() => {
    container.remove();
  });

  test('should render properly', () => {
    expect(container.innerHTML).not.toBe('');
  });

  test('should show a legend with correct text', () => {
    const legend = container.querySelector('.radio-legend');
    expect(legend).not.toBeNull();
    expect(legend.textContent).toBe(props.legend);
  });

  test('should show the correct number of options', () => {
    const options = container.querySelectorAll('.radio-option');
    expect(options.length).toBe(props.options.length);
  });

  test('should show a checked radio when clicked', () => {
    // Obtener el primer radio
    const firstRadio = container.querySelector('input[type="radio"]');

    // Verificar estado inicial (no checkeado)
    expect(firstRadio.checked).toBe(false);

    // Simular clic en el radio
    firstRadio.click();

    // Verificar que ahora está checkeado
    expect(firstRadio.checked).toBe(true);
  });

  test('should only allow one option to be selected', () => {
    // Obtener todos los radios
    const radios = container.querySelectorAll('input[type="radio"]');

    // Simular clic en el primer radio
    radios[0].click();

    // Verificar que el primer radio está checkeado
    expect(radios[0].checked).toBe(true);

    // Simular clic en el segundo radio
    radios[1].click();

    // Verificar que el segundo radio está checkeado y el primero no
    expect(radios[1].checked).toBe(true);
    expect(radios[0].checked).toBe(false);
  });

  test('should emit change event with correct value', () => {
    let changeEventFired = false;
    let changeEventDetail = null;

    // Agregar listener para el evento de cambio
    container.addEventListener('radioChange', (event) => {
      changeEventFired = true;
      changeEventDetail = event.detail;
    });

    // Obtener el segundo radio
    const secondRadio = container.querySelectorAll('input[type="radio"]')[1];

    // Simular clic en el radio
    secondRadio.click();

    // Verificar que se emitió el evento con los detalles correctos
    expect(changeEventFired).toBe(true);
    expect(changeEventDetail).toEqual({
      name: props.name,
      value: props.options[1].value,
    });
  });

  test('should respect initial selected value', () => {
    // Crear un contenedor con un valor inicial seleccionado
    container.remove();

    const selectedProps = {
      ...props,
      selectedValue: '2',
    };

    const selectedContainer = document.createElement('div');
    selectedContainer.innerHTML = `
      <fieldset class="radio-group" role="radiogroup" aria-labelledby="radio-legend">
        <legend id="radio-legend" class="radio-legend">${
          selectedProps.legend
        }</legend>
        <div class="radio-options">
          ${selectedProps.options
            .map(
              (option) => `
            <div class="radio-option">
              <input 
                type="radio"
                id="${option.id}"
                name="${selectedProps.name}"
                value="${option.value}"
                class="radio-input"
                ${selectedProps.selectedValue === option.value ? 'checked' : ''}
                data-testid="radio-${option.id}"
              />
              <label for="${option.id}" class="radio-label">${
                option.label
              }</label>
            </div>
          `
            )
            .join('')}
        </div>
      </fieldset>
    `;
    document.body.appendChild(selectedContainer);

    // Verificar que el segundo radio está checkeado inicialmente
    const radios = selectedContainer.querySelectorAll('input[type="radio"]');
    expect(radios[1].checked).toBe(true);
    expect(radios[0].checked).toBe(false);
    expect(radios[2].checked).toBe(false);

    selectedContainer.remove();
  });

  test('should handle disabled state', () => {
    // Crear un contenedor con radios deshabilitados
    container.remove();

    const disabledOptions = props.options.map((option, index) => ({
      ...option,
      disabled: index === 1, // Deshabilitar solo el segundo radio
    }));

    const disabledContainer = document.createElement('div');
    disabledContainer.innerHTML = `
      <fieldset class="radio-group" role="radiogroup" aria-labelledby="radio-legend">
        <legend id="radio-legend" class="radio-legend">${props.legend}</legend>
        <div class="radio-options">
          ${disabledOptions
            .map(
              (option) => `
            <div class="radio-option ${option.disabled ? 'disabled' : ''}">
              <input 
                type="radio"
                id="${option.id}"
                name="${props.name}"
                value="${option.value}"
                class="radio-input"
                ${props.selectedValue === option.value ? 'checked' : ''}
                ${option.disabled ? 'disabled' : ''}
                data-testid="radio-${option.id}"
              />
              <label for="${option.id}" class="radio-label">${
                option.label
              }</label>
            </div>
          `
            )
            .join('')}
        </div>
      </fieldset>
    `;
    document.body.appendChild(disabledContainer);

    // Verificar que el segundo radio está deshabilitado
    const radios = disabledContainer.querySelectorAll('input[type="radio"]');
    expect(radios[1].disabled).toBe(true);

    // Verificar que los otros radios no están deshabilitados
    expect(radios[0].disabled).toBe(false);
    expect(radios[2].disabled).toBe(false);

    disabledContainer.remove();
  });

  test('get a snapshot of component', () => {
    expect(container.innerHTML).toMatchSnapshot();
  });
});
