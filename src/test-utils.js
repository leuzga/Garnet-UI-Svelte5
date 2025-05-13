// src/test-utils.js
import { afterEach } from 'vitest';

// Función para renderizar un componente Svelte 5
export function render(Component, options = {}) {
  const props = options.props || {};

  // Crear un contenedor
  const container = document.createElement('div');
  document.body.appendChild(container);

  // En Svelte 5, los componentes se montan de manera diferente
  let instance = null;

  // Intentar usar el elemento del componente (forma Svelte 5)
  if (Component.element) {
    try {
      // Clonar el elemento del componente
      const element = Component.element.cloneNode(true);

      // Añadir al DOM
      container.appendChild(element);

      // Aplicar props - Esto puede requerir ajustes según cómo funcionen tus componentes
      Object.entries(props).forEach(([key, value]) => {
        // Intentar establecer props como atributos de datos
        element.dataset[key] = JSON.stringify(value);
      });

      instance = { element };
    } catch (error) {
      console.error('Error al usar Component.element:', error);
    }
  }

  // Limpiar después de cada prueba
  afterEach(() => {
    container.remove();
  });

  return { container, component: instance };
}

// El resto del código para fireEvent permanece igual
export const fireEvent = {
  click: (element) => {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      button: 0,
    });
    element.dispatchEvent(event);
    return Promise.resolve();
  },
};
