<script lang="ts">
  import type { ApiTokenRes } from "@/types";
  import { fade } from "svelte/transition";
  import Tracks from "./Tracks.svelte";
  import Artists from "./Artists.svelte";
  import store from "./store.svelte";

  let auth = JSON.parse(
    localStorage.getItem("auth_object") as string
  ) as ApiTokenRes;

  let limit = $state(50);
  let offset = $state(0);

  let reqUrl = $derived(
    `https://api.spotify.com/v1/me/top/${store.type}?time_range=${store.timeRange}&limit=${limit}&offset=${offset}`
  );

  $effect(() => {
    (async () => {
      if (store.type === "tracks") {
        store.tracksData = undefined;
      } else if (store.type === "artists") {
        store.artistsData = undefined;
      }
      const res = await fetch(reqUrl, {
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (store.type === "tracks") {
          store.tracksData = data;
        } else if (store.type === "artists") {
          store.artistsData = data;
        }
      }
    })();
  });
</script>

<main class="flex flex-col gap-2 w-full">
  <div class="w-full flex font-bold justify-center gap-2">
    <div
      class="grid grid-cols-3 w-fit border [&_*]:p-1 [&_*]:transition-all rounded-lg overflow-hidden"
    >
      <button
        class:active={store.timeRange === "short_term"}
        on:click={() => (store.timeRange = "short_term")}>1M</button
      >
      <button
        class:active={store.timeRange === "medium_term"}
        on:click={() => (store.timeRange = "medium_term")}>3M</button
      >
      <button
        class:active={store.timeRange === "long_term"}
        on:click={() => (store.timeRange = "long_term")}>AT</button
      >
    </div>
    <div
      class="grid grid-cols-2 w-fit border [&_*]:p-1 [&_*]:transition-all rounded-lg overflow-hidden"
    >
      <button
        class:active={store.type === "tracks"}
        on:click={() => (store.type = "tracks")}>T</button
      >
      <button
        class:active={store.type === "artists"}
        on:click={() => (store.type = "artists")}>A</button
      >
    </div>
  </div>
  {#if store.type === "tracks"}
    <Tracks />
  {:else if store.type === "artists"}
    <Artists />
  {/if}
</main>

<style>
  .active {
    @apply bg-white text-black;
  }
</style>
