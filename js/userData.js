const SHOWS = 'pod_shows';
const SEARCH_RESULTS = 'search_results';

/**
 * 
 * @param {Podcast} showData 
 * @param {Rss2JsonItem[]} items
 */
export const saveShow  = (showData, items) => {
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

/**
 * @return {Podcast[]}
 */
export const getShows = () => {
  const showData = localStorage.getItem(SHOWS);
  return showData ? JSON.parse(showData) : [];
};

/**
 * @return {Podcast}
 */
export const getShow = (feedUrl) => {
  const shows = getShows();
  return shows.find((s) => s.rss_url === feedUrl);
};

/**
 * @param {string} id 
 * @return {Rss2JsonItem[]}
 */
export const getShowFeed = (id) => {
  const items = JSON.parse( localStorage.getItem(`${id}`) || '[]');
  return items;
};

/**
 * @param {Podcast[]} results 
 */
export const setSearchResults = (results) => {
  const dataStr = JSON.stringify(results || []);
  localStorage.setItem(SEARCH_RESULTS, dataStr);
};

/**
 * @param {string} feedUrl 
 * @returns {Podcast}
 */
export const getSearchResult = (feedUrl) => {
  /** @type {Podcast[]} */
  const results = JSON.parse(localStorage.getItem(SEARCH_RESULTS) || '[]');
  return results.find(pod => pod.rss_url === feedUrl);
};
