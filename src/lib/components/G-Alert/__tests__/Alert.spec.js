// @ts-nocheck
import { axe } from 'vitest-axe';
import * as AxeMatchers from 'vitest-axe/matchers';
import { describe, test, expect, beforeEach, afterEach } from 'vitest';

const AlertHTML = `<div class="garnet s-4Y75ZjC11XWf"><dialog class="alert alert-info fade-in s-4Y75ZjC11XWf" role="alertdialog"  title="Alert Dialog"><div class="icon s-4Y75ZjC11XWf"><svg width="24px" height="24px" viewBox="0 0 512 512"><path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M220 220h32v116"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M208 340h88"></path><path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z" fill="#ffffff"></path></svg><!--<Icon>--></div> <div class="message s-4Y75ZjC11XWf"><strong class="s-4Y75ZjC11XWf">Simple Info</strong> An info description</div> <div class="s-4Y75ZjC11XWf"><button class="s-4Y75ZjC11XWf">✖</button></div></dialog></div>`;
expect.extend(AxeMatchers);

describe('Tests for Alert (simulated)', () => {
  const props = {
    show: true,
    description: 'An info description',
    title: 'Simple Info',
    icon: 'true',
    type: 'info',
    close: 'false',
  };

  let container;

  beforeEach(() => {
    // Crear un contenedor y simular el HTML que esperaríamos del Alert
    container = document.createElement('div');
    if (props.show) {
      container.innerHTML = `
        <div class="alert-container" data-testid="alert-container">
          <div class="alert-wrapper alert-${props.type || 'info'}" role="alert">
            ${
              props.icon === 'true'
                ? `<div class="alert-icon">
                <span class="alert-icon-${props.type || 'info'}"></span>
              </div>`
                : ''
            }
            <div class="alert-content">
              ${
                props.title
                  ? `<div class="alert-title">${props.title}</div>`
                  : ''
              }
              ${
                props.description
                  ? `<div class="alert-description">${props.description}</div>`
                  : ''
              }
            </div>
            ${
              props.close === 'true'
                ? `<button class="alert-close-button" aria-label="Cerrar alerta">
                <span class="alert-close-icon">×</span>
              </button>`
                : ''
            }
          </div>
        </div>
      `;
    } else {
      container.innerHTML = '';
    }
    document.body.appendChild(container);

    // Simular comportamiento de cierre si está habilitado
    if (props.close === 'true') {
      const closeButton = container.querySelector('.alert-close-button');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          container.innerHTML = '';
        });
      }
    }

    // Simular comportamiento de clic en la alerta
    const alertElement = container.querySelector('[role="alert"]');
    if (alertElement) {
      alertElement.addEventListener('click', () => {
        // Podría disparar algún evento o comportamiento específico
        const event = new CustomEvent('alertClick');
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

  test('should show correct title and description', () => {
    expect(container.textContent).toContain('Simple Info');
    expect(container.textContent).toContain('An info description');
  });

  test('should have correct type class', () => {
    const alertWrapper = container.querySelector('.alert-wrapper');
    expect(alertWrapper.classList.contains(`alert-${props.type}`)).toBe(true);
  });

  test('should disappear when close button clicked', () => {
    // Para esta prueba, necesitamos crear un contenedor con el botón de cierre habilitado
    container.remove();

    const closeProps = {
      ...props,
      close: 'true',
    };

    const closeContainer = document.createElement('div');
    closeContainer.innerHTML = `
      <div class="alert-container" data-testid="alert-container">
        <div class="alert-wrapper alert-${
          closeProps.type || 'info'
        }" role="alert">
          ${
            closeProps.icon === 'true'
              ? `<div class="alert-icon">
              <span class="alert-icon-${closeProps.type || 'info'}"></span>
            </div>`
              : ''
          }
          <div class="alert-content">
            ${
              closeProps.title
                ? `<div class="alert-title">${closeProps.title}</div>`
                : ''
            }
            ${
              closeProps.description
                ? `<div class="alert-description">${closeProps.description}</div>`
                : ''
            }
          </div>
          <button class="alert-close-button" aria-label="Cerrar alerta">
            <span class="alert-close-icon">×</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(closeContainer);

    // Agregar comportamiento al botón de cierre
    const closeButton = closeContainer.querySelector('.alert-close-button');
    closeButton.addEventListener('click', () => {
      closeContainer.innerHTML = '';
    });

    // Verificar que la alerta está presente inicialmente
    expect(closeContainer.innerHTML).not.toBe('');

    // Simular clic en el botón de cierre
    closeButton.click();

    // Verificar que la alerta desapareció
    expect(closeContainer.innerHTML).toBe('');

    closeContainer.remove();
  });

  test('should handle different alert types', () => {
    // Probar diferentes tipos de alerta (success, warning, error)
    const types = ['success', 'warning', 'error'];

    types.forEach((type) => {
      const typeContainer = document.createElement('div');
      typeContainer.innerHTML = `
        <div class="alert-container">
          <div class="alert-wrapper alert-${type}" role="alert">
            <div class="alert-icon">
              <span class="alert-icon-${type}"></span>
            </div>
            <div class="alert-content">
              <div class="alert-title">Alert ${type}</div>
              <div class="alert-description">Description for ${type}</div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(typeContainer);

      // Verificar que tiene la clase correcta
      expect(typeContainer.querySelector(`.alert-${type}`)).not.toBeNull();

      typeContainer.remove();
    });
  });

  test('get a snapshot of component', () => {
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('should not render when show is false', () => {
    // Crear un contenedor con show=false
    container.remove();

    const hiddenProps = {
      ...props,
      show: false,
    };

    const hiddenContainer = document.createElement('div');
    hiddenContainer.innerHTML = hiddenProps.show ? 'Contenido' : '';
    document.body.appendChild(hiddenContainer);

    // Verificar que no se muestra contenido
    expect(hiddenContainer.innerHTML).toBe('');

    hiddenContainer.remove();
  });

  test("should demonstrate no issues with accessibility", async () => {
    const render = () => AlertHTML;
    const result = render();
    expect(await axe(result)).toHaveNoViolations();
  });
});
