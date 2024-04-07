<script lang="ts">
  import { fade } from "svelte/transition";
  import store from "./store.svelte";
</script>

{#if store.tracksData}
  <div class="grid grid-cols-[min-content_1fr] gap-3" transition:fade>
    {#each store.tracksData.items as track, i}
      <span class="font-extrabold text-right text-[3.5rem] text-6xl opacity-50"
        >{i + 1}</span
      >
      <div class="flex gap-2 h-14 items-center">
        <img
          src={track.album.images[0].url}
          alt={track.album.name}
          class="h-full aspect-square rounded"
        />
        <div class="flex flex-col justify-between flex-1">
          <h2 class="font-bold">{track.name}</h2>
          <p class="italic opacity-80">
            {track.artists.map((a) => a.name).join(", ")}
          </p>
        </div>
      </div>
    {/each}
  </div>
{/if}
