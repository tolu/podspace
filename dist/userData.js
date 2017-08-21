"use strict";
const SHOWS = 'pod_shows';
const SEARCH_RESULTS = 'search_results';
export const saveShow = (showData, items) => {
    const shows = getShows();
    const show = getShow(showData.rss_url);
    if (show) {
        // we already have show - update?
        console.warn('show already in list...');
    }
    else {
        shows.push(showData);
    }
    localStorage.setItem(`${showData.id}`, JSON.stringify(items));
    localStorage.setItem(SHOWS, JSON.stringify(shows));
};
export const getShows = () => {
    const showData = localStorage.getItem(SHOWS);
    return JSON.parse(showData || '[]');
};
export const getShow = (feedUrl) => {
    const shows = getShows();
    return shows.find((s) => s.rss_url === feedUrl);
};
export const getShowFeed = (id) => {
    const items = JSON.parse(localStorage.getItem(`${id}`) || '[]');
    return items;
};
export const setSearchResults = (results) => {
    const dataStr = JSON.stringify(results || []);
    localStorage.setItem(SEARCH_RESULTS, dataStr);
};
export const getSearchResult = (feedUrl) => {
    const results = JSON.parse(localStorage.getItem(SEARCH_RESULTS) || '[]');
    return results.find(pod => pod.rss_url === feedUrl);
};
export const getEpisode = (showId, episodeId) => {
    const showFeed = getShowFeed(showId);
    return showFeed.find(ep => `${ep.id}` === episodeId);
};
export const saveEpisode = (episode) => {
    const podcast = getShows().find((pod) => pod.id === episode.show_id);
    const episodes = getShowFeed(`${episode.show_id}`);
    const oldEpisode = episodes.find((ep) => ep.id === episode.id);
    const index = episodes.indexOf(oldEpisode);
    // set updated episode in place of old
    Object.assign(episodes, { [`${index}`]: episode });
    saveShow(podcast, episodes);
};
