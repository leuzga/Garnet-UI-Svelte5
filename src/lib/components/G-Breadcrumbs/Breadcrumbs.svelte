<svelte:options customElement="garnet-breadcrumbs" />

<script>
  import Icon from '@iconify/svelte';

  const { 
    divider = "/", 
    iconFamily = "", 
    iconName = "", 
    breadcrumbItems = [] 
  } = $props();

</script>

<div class="garnet-breadcrumbs">
  <ul class="breadcrumb">
    {#each breadcrumbItems as breadcrumbItem, i}
      <li>
        {#if i !== 0}
          {#if !iconFamily && !iconName}
            <span>{divider}</span>
          {:else}
            <Icon icon={`${iconFamily}:${iconName}`} class="breadcrumb-separator-icon" />
          {/if}
        {/if}

        {#if i === breadcrumbItems.length - 1}
          {breadcrumbItem.text}
        {:else}
          <a href={(breadcrumbItem.href)} data-testid="breadcrumbLink">{breadcrumbItem.text}</a>  
        {/if}
      </li>     
    {/each}
  </ul>
</div>


<style>
  .garnet-breadcrumbs { 
    display: flex; 
    font-family: Arial, Helvetica, sans-serif; 
  }
   
  ul.breadcrumb { 
    padding: 10px 16px; 
    list-style: none; 
    background-color: #eee; 
  }
  
  ul.breadcrumb li { 
    display: inline; 
    font-size: 18px; 
    vertical-align: text-bottom;
  } 
  
  ul.breadcrumb li a { 
    color: #733635; 
    text-decoration: none; 
    vertical-align: text-bottom;
  }

  ul.breadcrumb li a:hover {
    color: #d19c9b;
    text-decoration: underline;
  }

  ul.breadcrumb li span {
    display: inline;
    padding: 8px;
  }

:global(.breadcrumb-separator-icon) {
    margin-left: 0.5rem;
    font-size: 1.2rem;
    display: inline-flex;
    transform: translateY(4px);
    color: #59d6f2
  }
</style>