const { DEV, BASE_URL } = import.meta.env;

export const redirectUri = DEV
  ? "http://localhost:4321/spotify-stats/callback"
  : `${BASE_URL}/callback`;
