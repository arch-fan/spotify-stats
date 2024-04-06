const { DEV, SITE } = import.meta.env;

export const redirectUri = DEV
  ? "http://localhost:4321/spotify-stats/callback"
  : `${SITE}/spotify-stats/callback`;
