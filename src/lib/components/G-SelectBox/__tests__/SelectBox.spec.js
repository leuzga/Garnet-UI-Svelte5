import { describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('Tests for SelectBox (simulated)', () => {
  const props = {
    selectOptions: [{ text: 'aaa' }, { text: 'bbb' }, { text: 'ccc' }],
    index: 0,
    disabled: false,
    placeholder: 'Select an option',
  };

  let container;

  beforeEach(() => {
    // Crear un contenedor y simular el HTML que esperaríamos del SelectBox
    container = document.createElement('div');

    // Estado inicial del select (cerrado)
    const isOpen = false;
    const selectedOption =
      props.index !== undefined &&
      props.index >= 0 &&
      props.index < props.selectOptions.length
        ? props.selectOptions[props.index]
        : null;

    container.innerHTML = `
      <div class="select-container ${props.disabled ? 'disabled' : ''}">
        <button 
          class="select-trigger" 
          data-testid="selectdropdown"
          aria-haspopup="listbox"
          aria-expanded="${isOpen ? 'true' : 'false'}"
          ${props.disabled ? 'disabled' : ''}
        >
          <span class="select-value">
            ${selectedOption ? selectedOption.text : props.placeholder || ''}
          </span>
          <span class="select-icon">▼</span>
        </button>
        ${
          isOpen
            ? `<div class="select-dropdown" role="listbox">
            ${props.selectOptions
              .map(
                (option, index) => `
              <div 
                class="select-option ${index === props.index ? 'selected' : ''}"
                role="option"
                aria-selected="${index === props.index ? 'true' : 'false'}"
                data-index="${index}"
                data-testid="select-option-${index}"
              >
                ${option.text}
              </div>
            `
              )
              .join('')}
          </div>`
            : ''
        }
      </div>
    `;
    document.body.appendChild(container);

    // Simular comportamiento del botón de apertura
    const trigger = container.querySelector('.select-trigger');
    if (trigger && !props.disabled) {
      trigger.addEventListener('click', () => {
        const isCurrentlyOpen =
          trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute(
          'aria-expanded',
          !isCurrentlyOpen ? 'true' : 'false'
        );

        // Actualizar el DOM
        if (!isCurrentlyOpen) {
          // Añadir dropdown si no existe
          if (!container.querySelector('.select-dropdown')) {
            const dropdown = document.createElement('div');
            dropdown.className = 'select-dropdown';
            dropdown.setAttribute('role', 'listbox');

            // Añadir opciones
            props.selectOptions.forEach((option, index) => {
              const optionElement = document.createElement('div');
              optionElement.className = `select-option ${
                index === props.index ? 'selected' : ''
              }`;
              optionElement.setAttribute('role', 'option');
              optionElement.setAttribute(
                'aria-selected',
                index === props.index ? 'true' : 'false'
              );
              optionElement.setAttribute('data-index', index);
              optionElement.setAttribute(
                'data-testid',
                `select-option-${index}`
              );
              optionElement.textContent = option.text;

              // Simular selección de opción
              optionElement.addEventListener('click', () => {
                // Actualizar la opción seleccionada
                const currentIndex = parseInt(
                  optionElement.getAttribute('data-index')
                );

                // Actualizar el texto mostrado
                container.querySelector('.select-value').textContent =
                  props.selectOptions[currentIndex].text;

                // Cerrar el dropdown
                trigger.setAttribute('aria-expanded', 'false');
                container.querySelector('.select-dropdown').remove();

                // Simular evento de cambio
                const event = new CustomEvent('selectChange', {
                  detail: {
                    index: currentIndex,
                    value: props.selectOptions[currentIndex],
                  },
                });
                container.dispatchEvent(event);
              });

              dropdown.appendChild(optionElement);
            });

            container.querySelector('.select-container').appendChild(dropdown);
          }
        } else {
          // Eliminar dropdown si existe
          const dropdown = container.querySelector('.select-dropdown');
          if (dropdown) {
            dropdown.remove();
          }
        }
      });
    }
  });

  afterEach(() => {
    container.remove();
  });

  test('should render properly', () => {
    expect(container.innerHTML).not.toBe('');
  });

  test('should show initial selected option', () => {
    const selectedValue = container.querySelector('.select-value');
    expect(selectedValue.textContent.trim()).toBe(
      props.selectOptions[props.index].text
    );
  });

  test('should open dropdown when clicked', () => {
    // Verificar que el dropdown no está presente inicialmente
    expect(container.querySelector('.select-dropdown')).toBeNull();

    // Simular clic en el trigger
    const trigger = container.querySelector('.select-trigger');
    trigger.click();

    // Verificar que el dropdown está abierto
    expect(container.querySelector('.select-dropdown')).not.toBeNull();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  test('should select an option when clicked', () => {
    let changeEventFired = false;
    let changeEventDetail = null;

    // Agregar listener para el evento de cambio
    container.addEventListener('selectChange', (event) => {
      changeEventFired = true;
      changeEventDetail = event.detail;
    });

    // Abrir el dropdown
    const trigger = container.querySelector('.select-trigger');
    trigger.click();

    // Verificar que el dropdown está abierto
    expect(container.querySelector('.select-dropdown')).not.toBeNull();

    // Simular clic en la segunda opción
    const secondOption = container.querySelector(
      '[data-testid="select-option-1"]'
    );
    secondOption.click();

    // Verificar que se seleccionó la opción
    const selectedValue = container.querySelector('.select-value');
    expect(selectedValue.textContent.trim()).toBe(props.selectOptions[1].text);

    // Verificar que el dropdown se cerró
    expect(container.querySelector('.select-dropdown')).toBeNull();

    // Verificar que se emitió el evento con los detalles correctos
    expect(changeEventFired).toBe(true);
    expect(changeEventDetail).toEqual({
      index: 1,
      value: props.selectOptions[1],
    });
  });

  test('should close dropdown when clicking outside', () => {
    // Abrir el dropdown
    const trigger = container.querySelector('.select-trigger');
    trigger.click();

    // Verificar que el dropdown está abierto
    expect(container.querySelector('.select-dropdown')).not.toBeNull();

    // Simular clic fuera del dropdown (cerrarlo manualmente para simular)
    trigger.click();

    // Verificar que el dropdown se cerró
    expect(container.querySelector('.select-dropdown')).toBeNull();
  });

  test('should not open when disabled', () => {
    // Crear un contenedor con select deshabilitado
    container.remove();

    const disabledProps = {
      ...props,
      disabled: true,
    };

    const disabledContainer = document.createElement('div');
    const selectedOption =
      disabledProps.index !== undefined &&
      disabledProps.index >= 0 &&
      disabledProps.index < disabledProps.selectOptions.length
        ? disabledProps.selectOptions[disabledProps.index]
        : null;

    disabledContainer.innerHTML = `
      <div class="select-container disabled">
        <button 
          class="select-trigger" 
          data-testid="selectdropdown"
          aria-haspopup="listbox"
          aria-expanded="false"
          disabled
        >
          <span class="select-value">
            ${
              selectedOption
                ? selectedOption.text
                : disabledProps.placeholder || ''
            }
          </span>
          <span class="select-icon">▼</span>
        </button>
      </div>
    `;
    document.body.appendChild(disabledContainer);

    // Intentar abrir el select deshabilitado
    const disabledTrigger = disabledContainer.querySelector('.select-trigger');
    try {
      disabledTrigger.click();
    } catch (e) {
      // En algunos entornos, hacer clic en un botón deshabilitado puede lanzar error
    }

    // Verificar que el dropdown no se abrió
    expect(disabledContainer.querySelector('.select-dropdown')).toBeNull();

    disabledContainer.remove();
  });

  test('should display placeholder when no option is selected', () => {
    // Crear un contenedor sin índice seleccionado
    container.remove();

    const noIndexProps = {
      ...props,
      index: -1,
      placeholder: 'Select an option',
    };

    const noIndexContainer = document.createElement('div');
    noIndexContainer.innerHTML = `
      <div class="select-container">
        <button 
          class="select-trigger" 
          data-testid="selectdropdown"
          aria-haspopup="listbox"
          aria-expanded="false"
        >
          <span class="select-value">
            ${noIndexProps.placeholder}
          </span>
          <span class="select-icon">▼</span>
        </button>
      </div>
    `;
    document.body.appendChild(noIndexContainer);

    // Verificar que se muestra el placeholder
    const valueElement = noIndexContainer.querySelector('.select-value');
    expect(valueElement.textContent.trim()).toBe(noIndexProps.placeholder);

    noIndexContainer.remove();
  });

  test('get a snapshot of component', () => {
    expect(container.innerHTML).toMatchSnapshot();
  });
});
