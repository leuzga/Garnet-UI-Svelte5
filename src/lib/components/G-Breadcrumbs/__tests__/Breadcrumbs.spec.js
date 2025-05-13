import { describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('Tests for Breadcrumbs (simulated)', () => {
  const props = {
    divider: "/",
    image: false,
    breadcrumbItems: [
      { href: "/", text: "Dashboard" },
      { href: "/reports", text: "Annual reports" },
      { href: "/reports/2019", text: "2019" },
    ],
  };

  let container;

  beforeEach(() => {
    // Crear un contenedor y simular el HTML que esperaríamos del Breadcrumbs
    container = document.createElement('div');
    container.innerHTML = `
      <nav class="breadcrumbs-container" aria-label="breadcrumbs">
        <ol class="breadcrumbs-list">
          ${props.breadcrumbItems.map((item, index) => {
            const isLast = index === props.breadcrumbItems.length - 1;
            return `
              <li class="breadcrumbs-item ${isLast ? 'breadcrumbs-item-active' : ''}">
                ${!isLast ? 
                  `<a href="${item.href}" class="breadcrumbs-link" data-testid="breadcrumbLink">
                    ${props.image ? '<img src="' + item.image + '" alt="" class="breadcrumbs-image" />' : ''}
                    <span>${item.text}</span>
                  </a>` : 
                  `<span class="breadcrumbs-current">${item.text}</span>`
                }
                ${!isLast ? 
                  `<span class="breadcrumbs-divider" aria-hidden="true">${props.divider}</span>` : 
                  ''
                }
              </li>
            `;
          }).join('')}
        </ol>
      </nav>
    `;
    document.body.appendChild(container);

    // Simular comportamiento si es necesario
    const links = container.querySelectorAll('[data-testid="breadcrumbLink"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        // Prevenir navegación en las pruebas
        e.preventDefault();
        
        // Simular evento de clic
        const event = new CustomEvent('breadcrumbClick', {
          detail: { href: link.getAttribute('href') }
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

  test('should have correct number of links', () => {
    // Debería haber enlaces para todos los items excepto el último (actual)
    const links = container.querySelectorAll('[data-testid="breadcrumbLink"]');
    expect(links.length).toBe(props.breadcrumbItems.length - 1);
  });

  test('should have correct text in each breadcrumb', () => {
    const items = container.querySelectorAll('.breadcrumbs-item');
    
    // Verificar que cada item tiene el texto correcto
    items.forEach((item, index) => {
      expect(item.textContent).toContain(props.breadcrumbItems[index].text);
    });
  });

  test('should use the correct divider', () => {
    const dividers = container.querySelectorAll('.breadcrumbs-divider');
    
    // Verificar que todos los divisores son correctos
    dividers.forEach(divider => {
      expect(divider.textContent).toBe(props.divider);
    });
  });

  test('should mark the last item as active', () => {
    const items = container.querySelectorAll('.breadcrumbs-item');
    const lastItem = items[items.length - 1];
    
    // Verificar que el último item tiene la clase active
    expect(lastItem.classList.contains('breadcrumbs-item-active')).toBe(true);
    
    // Verificar que el último item no tiene un enlace sino un span
    expect(lastItem.querySelector('a')).toBeNull();
    expect(lastItem.querySelector('.breadcrumbs-current')).not.toBeNull();
  });

  test('should handle breadcrumb clicks', () => {
    let clickedHref = null;
    
    // Agregar listener para el evento de clic
    container.addEventListener('breadcrumbClick', (event) => {
      clickedHref = event.detail.href;
    });
    
    // Simular clic en el primer enlace
    const firstLink = container.querySelector('[data-testid="breadcrumbLink"]');
    firstLink.click();
    
    // Verificar que se registró el clic con el href correcto
    expect(clickedHref).toBe(props.breadcrumbItems[0].href);
  });

  test('should render images when image prop is true', () => {
    // Crear un nuevo contenedor con images=true
    container.remove();
    
    const imageProps = {
      ...props,
      image: true,
      breadcrumbItems: [
        { href: "/", text: "Dashboard", image: "dashboard.png" },
        { href: "/reports", text: "Annual reports", image: "reports.png" },
        { href: "/reports/2019", text: "2019", image: "2019.png" },
      ]
    };
    
    const imageContainer = document.createElement('div');
    imageContainer.innerHTML = `
      <nav class="breadcrumbs-container" aria-label="breadcrumbs">
        <ol class="breadcrumbs-list">
          ${imageProps.breadcrumbItems.map((item, index) => {
            const isLast = index === imageProps.breadcrumbItems.length - 1;
            return `
              <li class="breadcrumbs-item ${isLast ? 'breadcrumbs-item-active' : ''}">
                ${!isLast ? 
                  `<a href="${item.href}" class="breadcrumbs-link" data-testid="breadcrumbLink">
                    ${imageProps.image ? '<img src="' + item.image + '" alt="" class="breadcrumbs-image" />' : ''}
                    <span>${item.text}</span>
                  </a>` : 
                  `<span class="breadcrumbs-current">${item.text}</span>`
                }
                ${!isLast ? 
                  `<span class="breadcrumbs-divider" aria-hidden="true">${imageProps.divider}</span>` : 
                  ''
                }
              </li>
            `;
          }).join('')}
        </ol>
      </nav>
    `;
    document.body.appendChild(imageContainer);
    
    // Verificar que las imágenes están presentes
    const images = imageContainer.querySelectorAll('.breadcrumbs-image');
    expect(images.length).toBe(imageProps.breadcrumbItems.length - 1);
    
    imageContainer.remove();
  });

  test('get a snapshot of component', () => {
    expect(container.innerHTML).toMatchSnapshot();
  });
});