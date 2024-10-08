<script lang="ts">
  import type { ApiTokenRes } from "@/types";
  import Tracks from "./Tracks.svelte";
  import Artists from "./Artists.svelte";
  import store from "./store.svelte";
  import h2c from "html2canvas-pro";

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

  let top: HTMLDivElement;
  let imageLoading = $state(false);

  const handlePhoto = async () => {
    imageLoading = true;

    const canvas = await h2c(top, {
      backgroundColor: "#000",
      useCORS: true,
      scale: 4,
    });
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "top-tracks.png";
    link.href = url;
    link.click();
    imageLoading = false;
  };
</script>

<main class="flex flex-col gap-2 w-full">
  <div class="w-full flex font-bold p-2 justify-between gap-2">
    <div
      class="grid grid-cols-3 w-fit border [&_*]:p-1 [&_*]:transition-all rounded-lg overflow-hidden"
    >
      <button
        class:active={store.timeRange === "short_term"}
        onclick={() => (store.timeRange = "short_term")}>1 Month</button
      >
      <button
        class:active={store.timeRange === "medium_term"}
        onclick={() => (store.timeRange = "medium_term")}>3 Months</button
      >
      <button
        class:active={store.timeRange === "long_term"}
        onclick={() => (store.timeRange = "long_term")}>All Time</button
      >
    </div>
    <div
      class="grid grid-cols-2 w-fit border [&_*]:p-1 [&_*]:transition-all rounded-lg overflow-hidden"
    >
      <button
        class:active={store.type === "tracks"}
        onclick={() => (store.type = "tracks")}>🎵</button
      >
      <button
        class:active={store.type === "artists"}
        onclick={() => (store.type = "artists")}>👤</button
      >
    </div>
  </div>
  <button
    class="border rounded py-1 hover:bg-white/10 transition-all active:bg-white/20"
    onclick={handlePhoto}>{imageLoading ? "Loading..." : "📸Photo"}</button
  >
  <div bind:this={top}>
    {#if store.type === "tracks"}
      <Tracks />
    {:else if store.type === "artists"}
      <Artists />
    {/if}
  </div>
</main>

<style>
  .active {
    @apply bg-white text-black;
  }
</style>
