<svelte:options runes={true} customElement="garnet-tabs" />

<script>
  import Icon from '@iconify/svelte';

  let {
    activeTabValue = $bindable('0'),
    items = [],
    vertical = false,
    icons = [],          
    iconSize = '1em'
  } = $props();

  const handleClick = (tabValue) => (event) => {
    activeTabValue = tabValue;
  };

  const handleKeydown = (tabValue) => (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activeTabValue = tabValue;
    }
  };


  const getIconForTab = (index) => {
    const idx = Number(index);
    return icons[idx] || null;
  };
</script>

<div class="garnet-tabs" class:vertical>
  <ul class:vertical role="tablist" aria-orientation={vertical ? 'vertical' : 'horizontal'}>
    {#each Object.entries(items) as [id]}
      <li 
        class:active={activeTabValue === id} 
        data-testid="tabHeader"
        role="presentation"
      >
        <button
          type="button"
          class:vertical
          role="tab"
          id="tab-{id}"
          aria-selected={activeTabValue === id}
          aria-controls="tabpanel-{id}"
          tabindex={activeTabValue === id ? 0 : -1}
          onclick={handleClick(id)}
          onkeydown={handleKeydown(id)}
        >
          {#if getIconForTab(id)}
            {@const icon = getIconForTab(id)}
            <span class="icon" style="font-size: {iconSize}">
              <Icon 
                icon={`${icon.family}:${icon.name}`} 
                height={iconSize}
                style="margin-right: 6px;"
              />
            </span>
          {/if}
          <span class="tab-text">
            {JSON.stringify(items[id].name).replace(/['"]+/g, "")}
          </span>
        </button>
      </li>
    {/each}
  </ul>

  <div class="content" class:vertical data-testid="tabContent">
    {#each Object.entries(items) as [id]}
      {#if activeTabValue === id}
        <div
          id="tabpanel-{id}"
          role="tabpanel"
          aria-labelledby="tab-{id}"
          tabindex="0"
        >
          {JSON.stringify(items[id].text).replace(/['"]+/g, "")}
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .garnet-tabs { 
    display: flex; 
    flex-direction: column;
    font-family: Arial, Helvetica, sans-serif;    
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    border-bottom: 1px solid #c5edfb;
  }
  li {
    margin-bottom: -1px;
  }

  button {
    border: 1px solid transparent;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    display: flex;
    align-items: center;
    padding: 8px 16px;
    cursor: pointer;
    background: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    gap: 0.5rem;
  }

  button:hover {
    border-color: #c5edfb;
    border-bottom-color: #ffffff;
  }

  button:focus-visible {
    outline: 2px solid #c5edfb;
    outline-offset: -2px;
  }

  li.active > button {
    color: #4c237f;
    background-color: #c5edfb;
    border-color: #c5edfb #c5edfb #fff;
  }

  .icon {
    display: inline-flex;
    align-items: center;
  }

  .content {
    padding: 10px;
    min-height: 300px;
  }

  /* variant */
  .garnet-tabs.vertical {
    display: flex;
    flex-direction: row;
  }

  ul.vertical{
    display: flex;
    flex-direction: column;
    border-right: 1px solid #c5edfb;
    border-bottom: none;
    margin-top: 0;
  }

  ul.vertical button {
    border-radius: 0;
    border-right: 0;
    border-color: #c5edfb;
  }

  /* Ensure content is hidden when not active */
  [role="tabpanel"] {
    outline: none;
  }
</style>