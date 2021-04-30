<script lang="ts">
  export let label = '';
  $: cLabel = label || '';
</script>

{#if cLabel}
<button>{cLabel}</button>
{/if}