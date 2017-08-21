const SHOWS = 'pod_shows';
const SEARCH_RESULTS = 'search_results';

export const saveShow  = (showData: Podcast, items: Episode[]) => {
  const shows = getShows();
  const show = getShow(showData.rss_url);
  if(show) {
    // we already have show - update?
    console.warn('show already in list...');
  } else {
    shows.push(showData);
  }
  localStorage.setItem(`${showData.id}`, JSON.stringify(items));
  localStorage.setItem(SHOWS, JSON.stringify(shows));
};

export const getShows = () => {
  const showData = localStorage.getItem(SHOWS);
  return JSON.parse(showData || '[]') as Podcast[];
};

export const getShow = (feedUrl) => {
  const shows = getShows();
  return shows.find((s) => s.rss_url === feedUrl);
};

export const getShowFeed = (id: string) => {
  const items = JSON.parse( localStorage.getItem(`${id}`) || '[]');
  return items as Episode[];
};

export const setSearchResults = (results: Podcast[]) => {
  const dataStr = JSON.stringify(results || []);
  localStorage.setItem(SEARCH_RESULTS, dataStr);
};

export const getSearchResult = (feedUrl: string) => {
  const results = JSON.parse(localStorage.getItem(SEARCH_RESULTS) || '[]') as Podcast[];
  return results.find(pod => pod.rss_url === feedUrl);
};

export const getEpisode = (showId: string, episodeId: string) => {
  const showFeed = getShowFeed(showId);
  return showFeed.find(ep => `${ep.id}` === episodeId);
}

export const saveEpisode = (episode: Episode) => {
  const podcast = getShows().find((pod) => pod.id === episode.show_id);
  const episodes = getShowFeed(`${episode.show_id}`);
  const oldEpisode = episodes.find((ep) => ep.id === episode.id);
  const index = episodes.indexOf(oldEpisode);
  // set updated episode in place of old
  Object.assign(episodes, {[`${index}`]: episode});
  saveShow(podcast, episodes);
}
