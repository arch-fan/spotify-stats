<script lang="ts">
  import { fade } from "svelte/transition";
  import store from "./store.svelte";
</script>

{#if store.artistsData}
  <div class="grid lg:grid-cols-4 grid-cols-3 gap-1" transition:fade>
    {#each store.artistsData.items as artist, i}
      <div class="flex flex-col p-1 gap-2 rounded items-center relative">
        <span class="absolute text-5xl opacity-50 font-extrabold top-0 left-1"
          >{i + 1}</span
        >
        <img
          src={artist.images[0].url}
          alt={artist.name}
          class="h-24 w-24 rounded-full"
        />
        <h2 class="font-bold text-center" style="overflow-wrap: anywhere;">
          {artist.name}
        </h2>
        <!-- <p class="line-clamp-1 mt-auto">
          {artist.followers.total}
        </p> -->
      </div>
    {/each}
  </div>
{/if}
