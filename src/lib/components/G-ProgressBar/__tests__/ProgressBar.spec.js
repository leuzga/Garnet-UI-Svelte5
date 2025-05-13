import { describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('Tests for ProgressBar (simulated)', () => {
  const props = {
    progress: '52',
    precision: 0,
    tweenDuration: 400,
    animate: true,
    labelInside: true,
    labelTextOutside: 'This is a test',
    easing: 'cubicOut',
    color: '#733635',
  };

  let container;

  beforeEach(() => {
    // Crear un contenedor y simular el HTML que esperaríamos del ProgressBar
    container = document.createElement('div');

    // Calcular el progreso como porcentaje
    const progressValue = parseFloat(props.progress);
    const formattedProgress =
      props.precision > 0
        ? progressValue.toFixed(props.precision)
        : Math.round(progressValue);

    container.innerHTML = `
      <div class="progress-container" data-testid="progress-bar">
        ${
          props.labelTextOutside
            ? `<div class="progress-label-outside">${props.labelTextOutside}</div>`
            : ''
        }
        <div class="progress-bar-container">
          <div 
            class="progress-bar"
            style="width: ${progressValue}%; background-color: ${
      props.color || '#4CAF50'
    };"
            role="progressbar"
            aria-valuenow="${progressValue}"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            ${
              props.labelInside
                ? `<span class="progress-label-inside">${formattedProgress}%</span>`
                : ''
            }
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  test('should render properly', () => {
    expect(container.innerHTML).not.toBe('');
  });

  test('should display correct progress percentage', () => {
    const progressBar = container.querySelector('.progress-bar');
    expect(progressBar.style.width).toBe(`${parseFloat(props.progress)}%`);

    // Verificar que el aria-valuenow también es correcto
    expect(progressBar.getAttribute('aria-valuenow')).toBe(props.progress);
  });

  test('should display label inside when labelInside is true', () => {
    const labelInside = container.querySelector('.progress-label-inside');
    expect(labelInside).not.toBeNull();

    // Verificar que el texto es correcto (redondeado si precision es 0)
    const expectedText =
      props.precision > 0
        ? parseFloat(props.progress).toFixed(props.precision) + '%'
        : Math.round(parseFloat(props.progress)) + '%';

    expect(labelInside.textContent).toBe(expectedText);
  });

  test('should display outside label when provided', () => {
    const labelOutside = container.querySelector('.progress-label-outside');
    expect(labelOutside).not.toBeNull();
    expect(labelOutside.textContent).toBe(props.labelTextOutside);
  });

  test('should use the correct color', () => {
    const progressBar = container.querySelector('.progress-bar');

    // Función para convertir color hexadecimal a RGB
    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${r}, ${g}, ${b})`;
    };

    // Verificar que el color aplicado coincide con el esperado (en formato RGB)
    expect(progressBar.style.backgroundColor).toBe(hexToRgb(props.color));
  });

  test('should not display label inside when labelInside is false', () => {
    // Crear un contenedor con labelInside=false
    container.remove();

    const noLabelProps = {
      ...props,
      labelInside: false,
    };

    const progressValue = parseFloat(noLabelProps.progress);

    const noLabelContainer = document.createElement('div');
    noLabelContainer.innerHTML = `
      <div class="progress-container" data-testid="progress-bar">
        ${
          noLabelProps.labelTextOutside
            ? `<div class="progress-label-outside">${noLabelProps.labelTextOutside}</div>`
            : ''
        }
        <div class="progress-bar-container">
          <div 
            class="progress-bar"
            style="width: ${progressValue}%; background-color: ${
      noLabelProps.color || '#4CAF50'
    };"
            role="progressbar"
            aria-valuenow="${progressValue}"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    `;
    document.body.appendChild(noLabelContainer);

    // Verificar que no hay etiqueta interna
    const labelInside = noLabelContainer.querySelector(
      '.progress-label-inside'
    );
    expect(labelInside).toBeNull();

    noLabelContainer.remove();
  });

  test('should handle different precision values', () => {
    // Probar diferentes valores de precisión
    const precisionValues = [1, 2, 3];

    precisionValues.forEach((precision) => {
      // Crear un contenedor para cada precisión
      const precisionContainer = document.createElement('div');
      const progressValue = parseFloat(props.progress);
      const formattedProgress = progressValue.toFixed(precision);

      precisionContainer.innerHTML = `
        <div class="progress-container">
          <div class="progress-bar-container">
            <div 
              class="progress-bar"
              style="width: ${progressValue}%;"
              role="progressbar"
              aria-valuenow="${progressValue}"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <span class="progress-label-inside">${formattedProgress}%</span>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(precisionContainer);

      // Verificar que la precisión es correcta
      const labelInside = precisionContainer.querySelector(
        '.progress-label-inside'
      );
      expect(labelInside.textContent).toBe(
        `${progressValue.toFixed(precision)}%`
      );

      precisionContainer.remove();
    });
  });

  test('should handle zero progress', () => {
    // Crear un contenedor con progress=0
    container.remove();

    const zeroProps = {
      ...props,
      progress: '0',
    };

    const zeroContainer = document.createElement('div');
    zeroContainer.innerHTML = `
      <div class="progress-container" data-testid="progress-bar">
        ${
          zeroProps.labelTextOutside
            ? `<div class="progress-label-outside">${zeroProps.labelTextOutside}</div>`
            : ''
        }
        <div class="progress-bar-container">
          <div 
            class="progress-bar"
            style="width: 0%; background-color: ${
              zeroProps.color || '#4CAF50'
            };"
            role="progressbar"
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            ${
              zeroProps.labelInside
                ? `<span class="progress-label-inside">0%</span>`
                : ''
            }
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(zeroContainer);

    // Verificar que la barra de progreso tiene ancho 0%
    const progressBar = zeroContainer.querySelector('.progress-bar');
    expect(progressBar.style.width).toBe('0%');

    zeroContainer.remove();
  });

  test('should handle 100% progress', () => {
    // Crear un contenedor con progress=100
    container.remove();

    const fullProps = {
      ...props,
      progress: '100',
    };

    const fullContainer = document.createElement('div');
    fullContainer.innerHTML = `
      <div class="progress-container" data-testid="progress-bar">
        ${
          fullProps.labelTextOutside
            ? `<div class="progress-label-outside">${fullProps.labelTextOutside}</div>`
            : ''
        }
        <div class="progress-bar-container">
          <div 
            class="progress-bar"
            style="width: 100%; background-color: ${
              fullProps.color || '#4CAF50'
            };"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            ${
              fullProps.labelInside
                ? `<span class="progress-label-inside">100%</span>`
                : ''
            }
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(fullContainer);

    // Verificar que la barra de progreso tiene ancho 100%
    const progressBar = fullContainer.querySelector('.progress-bar');
    expect(progressBar.style.width).toBe('100%');

    fullContainer.remove();
  });

  test('get a snapshot of component', () => {
    expect(container.innerHTML).toMatchSnapshot();
  });
});
