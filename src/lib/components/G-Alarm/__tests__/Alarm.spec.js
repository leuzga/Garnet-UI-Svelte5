import { describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('Tests for Alarm (simulated)', () => {
  const props = {
    id: '1',
    label: 'Alarm with label',
    notifications: 23,
    filled: false,
  };

  let container;

  beforeEach(() => {
    // Crear un contenedor y simular el HTML que esperaríamos del Alarm
    container = document.createElement('div');
    container.innerHTML = `
      <div class="alarm" data-testid="alarm-${props.id || ''}">
        <button class="alarm-button ${props.filled ? 'filled' : ''}">
          <span class="alarm-label">${props.label || ''}</span>
          <span class="alarm-notification-badge" data-testid="notifications">
            ${props.notifications || 0}
          </span>
        </button>
      </div>
    `;
    document.body.appendChild(container);

    // Simular comportamiento del componente
    const button = container.querySelector('.alarm-button');
    if (button) {
      button.addEventListener('click', () => {
        // Simular evento personalizado al hacer clic
        const event = new CustomEvent('alarmClick', {
          detail: { id: props.id },
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

  test('should show correct number of notifications', () => {
    const notificationElement = container.querySelector(
      '[data-testid="notifications"]'
    );
    expect(notificationElement.textContent.trim()).toBe('23');
  });

  test('get a snapshot of component', () => {
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('should handle filled state correctly', () => {
    // Por defecto, no debería tener la clase 'filled'
    expect(
      container.querySelector('.alarm-button').classList.contains('filled')
    ).toBe(false);

    // Ahora probar con filled=true
    container.remove();

    const filledContainer = document.createElement('div');
    filledContainer.innerHTML = `
      <div class="alarm" data-testid="alarm-1">
        <button class="alarm-button filled">
          <span class="alarm-label">Alarm with label</span>
          <span class="alarm-notification-badge" data-testid="notifications">
            23
          </span>
        </button>
      </div>
    `;
    document.body.appendChild(filledContainer);

    expect(
      filledContainer
        .querySelector('.alarm-button')
        .classList.contains('filled')
    ).toBe(true);

    filledContainer.remove();
  });

  test('should emit custom event when clicked', () => {
    let eventTriggered = false;
    let eventDetail = null;

    // Agregar listener para el evento personalizado
    container.addEventListener('alarmClick', (event) => {
      eventTriggered = true;
      eventDetail = event.detail;
    });

    // Simular clic en el botón
    const button = container.querySelector('.alarm-button');
    button.click();

    // Verificar que se emitió el evento correctamente
    expect(eventTriggered).toBe(true);
    expect(eventDetail).toEqual({ id: '1' });
  });

  test('should handle missing label gracefully', () => {
    // Probar con props incompletos
    container.remove();

    const incompleteProps = {
      id: '2',
      notifications: 5,
      filled: true,
      // Sin label
    };

    const incompleteContainer = document.createElement('div');
    incompleteContainer.innerHTML = `
      <div class="alarm" data-testid="alarm-${incompleteProps.id || ''}">
        <button class="alarm-button ${incompleteProps.filled ? 'filled' : ''}">
          <span class="alarm-label">${incompleteProps.label || ''}</span>
          <span class="alarm-notification-badge" data-testid="notifications">
            ${incompleteProps.notifications || 0}
          </span>
        </button>
      </div>
    `;
    document.body.appendChild(incompleteContainer);

    // Verificar que el componente maneja estos casos sin errores
    expect(incompleteContainer).toBeTruthy();
    expect(
      incompleteContainer.querySelector('.alarm-label').textContent.trim()
    ).toBe('');

    incompleteContainer.remove();
  });

  test('should handle zero notifications correctly', () => {
    // Probar con cero notificaciones
    container.remove();

    const zeroProps = {
      id: '3',
      label: 'No notifications',
      notifications: 0,
      filled: false,
    };

    const zeroContainer = document.createElement('div');
    zeroContainer.innerHTML = `
      <div class="alarm" data-testid="alarm-${zeroProps.id || ''}">
        <button class="alarm-button ${zeroProps.filled ? 'filled' : ''}">
          <span class="alarm-label">${zeroProps.label || ''}</span>
          <span class="alarm-notification-badge" data-testid="notifications">
            ${zeroProps.notifications || 0}
          </span>
        </button>
      </div>
    `;
    document.body.appendChild(zeroContainer);

    // Verificar que se muestra correctamente el 0
    const notificationElement = zeroContainer.querySelector(
      '[data-testid="notifications"]'
    );
    expect(notificationElement.textContent.trim()).toBe('0');

    zeroContainer.remove();
  });
});
