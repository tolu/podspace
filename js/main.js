import audioPlayer from './audioPlayer.js';
import searchResultComponent from './components/searchResultList.js';
import userShowsComponent from './components/userShowList.js';
import showComponent from './components/show.js';
import * as userData from './userData.js';
import * as modal from './components/modal.js';
import apiClient from './audioSearchClient.js';
import {ready} from './config.js';

// https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
// const SEARCH_BASE = '//itunes.apple.com/search?media=podcast&entity=podcast&limit=25&term=';

ready().then(_ => console.info('CONFIG LOADED!'));

window.addEventListener('load', function() {
  let timeout;
  document.querySelector('input').addEventListener('keyup', event => {
    if(event.target instanceof HTMLInputElement) {
      const query = event.target.value;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        doSearch(query);
      }, 250);
    }
  });
  renderUserShows();
  window.addEventListener('online', notifyConnection);
  window.addEventListener('offline', notifyConnection);
  function notifyConnection(event) {
    const addRemove = navigator.onLine ? 'remove' : 'add';
    document.body.classList[addRemove]('offline');
    console.warn(navigator.onLine ? 'online :)' : 'offline :(');
  }
});

function doSearch(query){
  if(!query || query.length <= 2) {
    return;
  }
  apiClient.search(query).then((results) => {
    renderSearchResults(results);
  }).catch(console.error);
}

/**
 * Render search result items
 * @param {SearchResults} json
 */
function renderSearchResults(json){
  const {results} = json;
  console.info(results);
  const resultsEl = document.querySelector('.search-results');
  if(results) {
    userData.setSearchResults(results);
    resultsEl.innerHTML = searchResultComponent(results);
  } else {
    resultsEl.innerHTML = '';
  }
}

/**
 * @param {Podcast|null} podcast 
 */
function renderShowFeed(podcast){
  const root = document.querySelector('.show-list');
  if(podcast) {
    podcast.items = userData.getShowFeed(`${podcast.id}`);
    root.innerHTML = showComponent(podcast);
  } else {
    root.innerHTML = '';
  }
}

function renderUserShows(){
  const shows = userData.getShows();
  const resultsEl = document.querySelector('.search-results');
  resultsEl.innerHTML = userShowsComponent(shows);
}

// handle search result click
document.addEventListener('click', (event) => {
  if(!(event.target instanceof HTMLElement)) {
    return;
  }
  if(event.target.matches('header a')) {
    event.preventDefault();
    renderSearchResults({ results: null, page: 0, results_per_page: 0, total_results: 0 });
    renderShowFeed(null);
    renderUserShows();
  }
  if(event.target.matches('.search-result .podcast a')) {
    event.preventDefault();
    // @ts-ignore
    const feedUrl = event.target.href;
    const show = userData.getSearchResult(feedUrl);
    saveShow(show);
  }
  if(event.target.matches('.user-show .podcast a')) {
    event.preventDefault();
    // @ts-ignore
    const feedUrl = event.target.href;
    renderShowFeed(userData.getShow(feedUrl));
  }
  if(event.target.matches('.play[data-url]')) {
    [].slice.call(document.querySelectorAll('.playing')).forEach((i) => i.classList.remove('playing'));

    if(audioPlayer.play(event.target.getAttribute('data-url'))) {
      event.target.closest('.show-item').classList.add('playing');
    }
  }
});

/**
 * @param {Podcast} show
 */
function saveShow(show) {
  modal.displayMessage(`Saving ${show.title}`);
  apiClient.getEpisodes(`${show.id}`)
    .then((episodes) => {
      userData.saveShow(show, episodes);
      modal.hideMessage();
    });
}
