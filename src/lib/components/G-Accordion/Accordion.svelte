<svelte:options customElement="garnet-accordion" />

<script>
// @ts-nocheck
  import AccordionItem from "./AccordionItem.svelte";
  
  let { data = [], isOpen = false } = $props();

</script>

<div class="garnet-accordion">
  {#each data as { title, text }}
    <AccordionItem {title} initialState={isOpen}>
      <p>{text}</p>
    </AccordionItem>  
  {/each}
</div>

<style>
  .garnet-accordion {
    display: flex;
    flex-direction: column;
    width: 450px;
    margin-top: 10px;
  }
</style>