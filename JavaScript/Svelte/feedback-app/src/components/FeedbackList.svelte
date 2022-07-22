<script lang="ts">
  // import { onMount, onDestroy } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { FeedbackStore } from "../stores";
  import FeedbackItem from "./FeedbackItem.svelte";

  // let feedback = [];

  // const unsubscribe = FeedbackStore.subscribe((data) => (feedback = data));

  // onMount(() => {
  //   FeedbackStore.fetch();
  // });
  // onDestroy(() => {
  //   unsubscribe();
  // });
</script>

{#each $FeedbackStore as fb (fb.id)}
  <div in:scale out:fade={{ duration: 500 }}>
    <FeedbackItem item={fb} on:delete-feedback />
  </div>
{/each}
