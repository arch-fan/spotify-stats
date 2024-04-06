const { DEV, BASE_URL, SITE } = import.meta.env;

export const redirectUri = DEV
  ? "http://localhost:4321/spotify-stats/callback"
  : `${SITE}${BASE_URL}/callback`;
