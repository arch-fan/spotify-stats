<script lang="ts">
  import type { ApiTokenRes } from "@/types";

  let auth = JSON.parse(
    localStorage.getItem("auth_object") as string
  ) as ApiTokenRes;

  type ReqTypes = "tracks" | "artists";
  type TimeRanges = "short" | "medium" | "long";
  type ReqTimeRanges = `${TimeRanges}_term`;

  let type = $state<ReqTypes>("tracks");
  let timeRange = $state<ReqTimeRanges>("medium_term");
  let limit = $state(50);
  let offset = $state(0);
  let spotifyData = $state<SpotifyApi.UsersTopTracksResponse>();

  let reqUrl = $derived(
    `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}&offset=${offset}`
  );

  $effect(() => {
    (async () => {
      const res = await fetch(reqUrl, {
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      });

      if (res.ok) {
        spotifyData = await res.json();
      }
    })();
  });
</script>

<main class="flex flex-col">
  <div>Controls</div>
  <div>
    {#if spotifyData}
      {#each spotifyData.items as track, i}
        <div class="flex">
          <img
            src={track.album.images[0].url}
            alt={track.album.name}
            class="aspect-square w-12 h-12 rounded"
          />
          <div class="flex flex-col flex-1">
            <div class="flex">
              <span class="bg-spotify-green px-2 rounded">{i + 1}</span>
              <h2>{track.name}</h2>
            </div>
            <p>
              {track.artists.map((a) => a.name).join(", ")}
            </p>
          </div>
        </div>
      {/each}
    {:else}
      <p>Loading...</p>
    {/if}
  </div>
</main>
