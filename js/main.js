import audioPlayer from './audioPlayer.js';
import searchResultComponent from './components/searchResultList.js';
import userShowsComponent from './components/userShowList.js';
import showComponent from './components/show.js';
import rssFetcher from './rssFetcher.js';
import * as userData from './userData.js';
import * as modal from './components/modal.js';
import apiClient from './audiosearchClient.js';

// https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
// const SEARCH_BASE = '//itunes.apple.com/search?media=podcast&entity=podcast&limit=25&term=';

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
  apiClient.search(query).then((results) => {
    console.log('RESULTS', results);
  }).catch(console.error);
  // const escapedQuery = encodeURIComponent(query);
  // fetch(`${SEARCH_BASE}${escapedQuery}`)
  //   .then((res) => res.json())
  //   .then((json) => renderSearchResults(json));
}

/**
 * Render search result items
 * @param {SearchResults} json
 */
function renderSearchResults(json){
  const {results} = json;
  const resultsEl = document.querySelector('.search-results');
  if(results) {
    userData.setSearchResults(results);
    resultsEl.innerHTML = searchResultComponent(results);
  } else {
    resultsEl.innerHTML = '';
  }
}

/**
 * @param {Podcast|null} show 
 */
function renderShowFeed(show){
  const root = document.querySelector('.show-list');  
  if(show) {
    show.items = userData.getShowFeed(`${show.collectionId}`);
    root.innerHTML = showComponent(show);
  } else {
    root.innerHTML = '';
  }
}

function renderUserShows(){
  /** @type {Podcast[]} */
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
    renderSearchResults({ resultCount: 0, results: null });
    renderShowFeed(null);
    renderUserShows();
  }
  if(event.target.matches('.search-result .podcast a')) {
    event.preventDefault();
    const feedUrl = event.target.href;
    const show = userData.getSearchResult(feedUrl);
    saveShow(show);
  }
  if(event.target.matches('.user-show .podcast a')) {
    event.preventDefault();
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
  modal.displayMessage(`Saving ${show.collectionName}`);
  rssFetcher(show.feedUrl)
    .then((/** @type {Rss2JsonResponse} */feedData) => {
      userData.saveShow(show, feedData.items);
      modal.hideMessage();
    });
}
