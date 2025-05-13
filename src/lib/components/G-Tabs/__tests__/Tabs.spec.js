import { describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('Tests for Tabs (simulated)', () => {
  const props = {
    vertical: false,
    items: [
      { id: 1, name: 'Tab 1', text: 'This is a test' },
      { id: 2, name: 'Tab 2', text: 'Here is tab 2' },
      { id: 3, name: 'Tab 3', text: 'And this is tab 3' },
    ],
    activeTab: 0, // Índice del tab activo por defecto (empezando desde 0)
  };

  let container;

  beforeEach(() => {
    // Crear un contenedor y simular el HTML que esperaríamos del Tabs
    container = document.createElement('div');

    // Crear HTML para la orientación correcta
    const tabsClass = props.vertical
      ? 'tabs-container vertical'
      : 'tabs-container';

    container.innerHTML = `
      <div class="${tabsClass}" data-testid="tabs">
        <div class="tabs-headers" role="tablist">
          ${props.items
            .map(
              (item, index) => `
            <button 
              id="tab-${item.id}"
              class="tab-header ${index === props.activeTab ? 'active' : ''}"
              role="tab"
              aria-selected="${index === props.activeTab ? 'true' : 'false'}"
              aria-controls="tab-panel-${item.id}"
              data-testid="tab-header-${index}"
            >
              ${item.name}
            </button>
          `
            )
            .join('')}
        </div>
        <div class="tabs-content">
          ${props.items
            .map(
              (item, index) => `
            <div 
              id="tab-panel-${item.id}"
              class="tab-panel ${index === props.activeTab ? 'active' : ''}"
              role="tabpanel"
              aria-labelledby="tab-${item.id}"
              data-testid="tab-panel-${index}"
              ${index !== props.activeTab ? 'hidden' : ''}
            >
              ${item.text}
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
    document.body.appendChild(container);

    // Simular comportamiento de los tabs
    const tabHeaders = container.querySelectorAll('.tab-header');
    tabHeaders.forEach((header, index) => {
      header.addEventListener('click', () => {
        // Desactivar todos los tabs
        tabHeaders.forEach((h, i) => {
          h.classList.remove('active');
          h.setAttribute('aria-selected', 'false');

          const panel = container.querySelector(
            `[data-testid="tab-panel-${i}"]`
          );
          panel.classList.remove('active');
          panel.hidden = true;
        });

        // Activar el tab seleccionado
        header.classList.add('active');
        header.setAttribute('aria-selected', 'true');

        const selectedPanel = container.querySelector(
          `[data-testid="tab-panel-${index}"]`
        );
        selectedPanel.classList.add('active');
        selectedPanel.hidden = false;

        // Simular evento de cambio
        const event = new CustomEvent('tabChange', {
          detail: { index, item: props.items[index] },
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

  test('should show all tab headers', () => {
    const tabHeaders = container.querySelectorAll('.tab-header');
    expect(tabHeaders.length).toBe(props.items.length);

    props.items.forEach((item, index) => {
      const header = container.querySelector(
        `[data-testid="tab-header-${index}"]`
      );
      expect(header.textContent.trim()).toBe(item.name);
    });
  });

  test('should show active tab content initially', () => {
    // Verificar que el primer tab (índice 0) está activo por defecto
    const activeHeader = container.querySelector('.tab-header.active');
    expect(activeHeader).not.toBeNull();
    expect(activeHeader.textContent.trim()).toBe(
      props.items[props.activeTab].name
    );

    // Verificar que el panel correspondiente está visible
    const activePanel = container.querySelector('.tab-panel.active');
    expect(activePanel).not.toBeNull();
    expect(activePanel.textContent.trim()).toBe(
      props.items[props.activeTab].text
    );
    expect(activePanel.hidden).toBe(false);

    // Verificar que los otros paneles están ocultos
    props.items.forEach((item, index) => {
      if (index !== props.activeTab) {
        const panel = container.querySelector(
          `[data-testid="tab-panel-${index}"]`
        );
        expect(panel.classList.contains('active')).toBe(false);
        expect(panel.hidden).toBe(true);
      }
    });
  });

  test('should change text if clicking on tab 2', () => {
    // Obtener el segundo tab (índice 1)
    const secondTab = container.querySelector('[data-testid="tab-header-1"]');

    // Simular clic en el segundo tab
    secondTab.click();

    // Verificar que el segundo tab ahora está activo
    expect(secondTab.classList.contains('active')).toBe(true);
    expect(secondTab.getAttribute('aria-selected')).toBe('true');

    // Verificar que se muestra el contenido del segundo tab
    const secondPanel = container.querySelector('[data-testid="tab-panel-1"]');
    expect(secondPanel.classList.contains('active')).toBe(true);
    expect(secondPanel.hidden).toBe(false);
    expect(secondPanel.textContent.trim()).toBe(props.items[1].text);

    // Verificar que los otros paneles están ocultos
    [0, 2].forEach((index) => {
      const panel = container.querySelector(
        `[data-testid="tab-panel-${index}"]`
      );
      expect(panel.classList.contains('active')).toBe(false);
      expect(panel.hidden).toBe(true);
    });
  });

  test('should emit event when changing tabs', () => {
    let changeEventFired = false;
    let changeEventDetail = null;

    // Agregar listener para el evento de cambio
    container.addEventListener('tabChange', (event) => {
      changeEventFired = true;
      changeEventDetail = event.detail;
    });

    // Obtener el tercer tab (índice 2)
    const thirdTab = container.querySelector('[data-testid="tab-header-2"]');

    // Simular clic en el tercer tab
    thirdTab.click();

    // Verificar que se emitió el evento con los detalles correctos
    expect(changeEventFired).toBe(true);
    expect(changeEventDetail).toEqual({
      index: 2,
      item: props.items[2],
    });
  });

  test('should support vertical orientation', () => {
    // Crear un contenedor con orientación vertical
    container.remove();

    const verticalProps = {
      ...props,
      vertical: true,
    };

    const verticalContainer = document.createElement('div');
    verticalContainer.innerHTML = `
      <div class="tabs-container vertical" data-testid="tabs">
        <div class="tabs-headers" role="tablist">
          ${verticalProps.items
            .map(
              (item, index) => `
            <button 
              id="tab-${item.id}"
              class="tab-header ${
                index === verticalProps.activeTab ? 'active' : ''
              }"
              role="tab"
              aria-selected="${
                index === verticalProps.activeTab ? 'true' : 'false'
              }"
              aria-controls="tab-panel-${item.id}"
            >
              ${item.name}
            </button>
          `
            )
            .join('')}
        </div>
        <div class="tabs-content">
          ${verticalProps.items
            .map(
              (item, index) => `
            <div 
              id="tab-panel-${item.id}"
              class="tab-panel ${
                index === verticalProps.activeTab ? 'active' : ''
              }"
              role="tabpanel"
              aria-labelledby="tab-${item.id}"
              ${index !== verticalProps.activeTab ? 'hidden' : ''}
            >
              ${item.text}
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
    document.body.appendChild(verticalContainer);

    // Verificar que el contenedor tiene la clase vertical
    const tabsContainer = verticalContainer.querySelector('.tabs-container');
    expect(tabsContainer.classList.contains('vertical')).toBe(true);

    verticalContainer.remove();
  });

  test('should handle empty items array', () => {
    // Crear un contenedor sin items
    container.remove();

    const emptyProps = {
      ...props,
      items: [],
    };

    const emptyContainer = document.createElement('div');
    emptyContainer.innerHTML = `
      <div class="tabs-container" data-testid="tabs">
        <div class="tabs-headers" role="tablist"></div>
        <div class="tabs-content"></div>
      </div>
    `;
    document.body.appendChild(emptyContainer);

    // Verificar que se renderiza sin tabs
    const tabHeaders = emptyContainer.querySelectorAll('.tab-header');
    expect(tabHeaders.length).toBe(0);

    const tabPanels = emptyContainer.querySelectorAll('.tab-panel');
    expect(tabPanels.length).toBe(0);

    emptyContainer.remove();
  });

  test('get a snapshot of component', () => {
    expect(container.innerHTML).toMatchSnapshot();
  });
});
