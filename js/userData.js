const SHOWS = 'pod_shows';
const SEARCH_RESULTS = 'search_results';

export const saveShow  = (/** @type {Podcast}*/showData, items) => {
  const shows = getShows();
  const show = getShow(showData.feedUrl);
  if(show) {
    // we already have show - update?
    console.warn('show already in list...');
  } else {
    shows.push(showData);
  }
  localStorage.setItem(`${showData.collectionId}`, JSON.stringify(items));
  localStorage.setItem(SHOWS, JSON.stringify(shows));
};

export const getShows = () => {
  const showData = localStorage.getItem(SHOWS);
  return showData ? JSON.parse(showData) : [];
};

export const getShow = (feedUrl) => {
  const shows = getShows();
  return shows.find((s) => s.feedUrl === feedUrl);
};

/**
 * @param {string} collectionId 
 * @return {Rss2JsonItem[]}
 */
export const getShowFeed = (collectionId) => {
  const items = JSON.parse( localStorage.getItem(`${collectionId}`) || '[]');
  return items;
};

export const setSearchResults = (results) => {
  const dataStr = JSON.stringify(results || []);
  localStorage.setItem(SEARCH_RESULTS, dataStr);
};

export const getSearchResult = (feedUrl) => {
  const results = JSON.parse(localStorage.getItem(SEARCH_RESULTS) || '[]');
  return results.find(pod => pod.feedUrl === feedUrl);
};
