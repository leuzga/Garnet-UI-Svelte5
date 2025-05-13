<svelte:options customElement="garnet-progressbar" />

<script>
  import { cubicOut } from 'svelte/easing';
  import { Tween } from 'svelte/motion';
  
  let { 
    progressAmt = 52,
    precision = 0,
    tweenDuration = 400,
    animate = true,
    labelInside = true,
    labelTextOutside = "",
    easing = cubicOut,
    color = '#1ab3b3',
    ariaLabel,
    id = `progress-${Math.random().toString(36).substring(2, 9)}`,
    minWidth = "250px", 
    height = labelInside ? "30px" : "10px" 
  } = $props();
  
  const tweenDurationValue = $derived(animate ? tweenDuration : 0);
  
  const progress = new Tween(0, {
    duration: 400,
    easing
  });
  
  $effect(() => {
    const duration = animate ? tweenDuration : 0;
    progress.set(Number(progressAmt), { duration });
  });
  
  const displayValue = $derived(progress.current.toFixed(precision));
  const ariaValueText = $derived(`${displayValue} percent`);
  const effectiveAriaLabel = $derived(ariaLabel || labelTextOutside);
  
  // Determina si usar texto claro o oscuro basado en el color de fondo
  // para garantizar contraste
  function getTextColor(bgColor) {
    // Convierte hex a RGB
    let hex = bgColor.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }
  
  const textColor = $derived(getTextColor(color));
</script>

<div class="garnet-progressbar" style="min-width: {minWidth};">
  {#if labelInside}
    <div class="progress-container">
      <div 
        role="progressbar" 
        id={id}
        aria-valuenow={progress.current} 
        aria-valuemin="0" 
        aria-valuemax="100"
        aria-valuetext={ariaValueText}
        aria-label={effectiveAriaLabel}
        class="progressbar inside" 
        style="width: {progress.current}%; background-color: {color}; color: {textColor}; height: {height};"
      >
        {#if labelTextOutside}
          <span class="progress-label">{labelTextOutside}</span>
          <span class="progress-separator"> - </span>
        {/if}
        <span class="progress-text">
          {displayValue}%
        </span>
      </div>
    </div>
  {:else}
    <div class="progress-header">
      {#if labelTextOutside}
        <span class="label-text">{labelTextOutside}</span>
      {:else}
        <span class="label-text">Progress</span>
      {/if}
      <span class="progress-text">
        {displayValue}%
      </span>
    </div>
    <div 
      role="progressbar" 
      id={id}
      aria-valuenow={progress.current} 
      aria-valuemin="0" 
      aria-valuemax="100"
      aria-valuetext={ariaValueText}
      aria-label={effectiveAriaLabel}
      class="progressbar outside" 
      style="width: {progress.current}%; background-color: {color}; height: {height};"
    ></div>
  {/if}
</div>

<style>
  .garnet-progressbar {
    display: flex;
    flex-direction: column;
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
  }

  .progress-text {
    font-size: 14px; 
    line-height: 20px; 
    font-weight: 500;
  }
  
  .progress-label {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
  }
  
  .progress-separator {
    margin: 0 5px;
  }

  .progressbar {
    border-radius: 9999px;
    transition: width 0.3s ease-out;
    min-height: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .progressbar.inside {
    height: 30px;
    min-width: 60px;
  }
  
  .progressbar.outside {
    height: 10px;
  }

  .progress-container {
    display: flex;
    flex-direction: column;
    font-size: 12px; 
    line-height: 16px;
    font-weight: 500;
    text-align: center;
    padding: 0.25rem;
    border-radius: 9999px;
    background-color: #f0f0f0;
  }

  .progress-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    color: #333333;
  }
  
  .label-text {
    font-weight: 500;
    font-size: 14px;
  }
</style>