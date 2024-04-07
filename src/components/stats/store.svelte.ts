type ReqTypes = "tracks" | "artists";
type ReqTimeRanges = `${"short" | "medium" | "long"}_term`;

let _tracksData = $state<SpotifyApi.UsersTopTracksResponse>();
let _artistsData = $state<SpotifyApi.UsersTopArtistsResponse>();
let _type = $state<ReqTypes>("artists");
let _timeRange = $state<ReqTimeRanges>("short_term");

export default {
  get tracksData() {
    return _tracksData;
  },
  set tracksData(data) {
    _tracksData = data;
  },
  get artistsData() {
    return _artistsData;
  },
  set artistsData(data) {
    _artistsData = data;
  },
  get type() {
    return _type;
  },
  set type(type) {
    _type = type;
  },
  get timeRange() {
    return _timeRange;
  },
  set timeRange(timeRange) {
    _timeRange = timeRange;
  },
};
