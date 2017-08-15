import audioPlayer from './audioPlayer.js';
import searchResultComponent from './components/searchResultList.js';
import showComponent from './components/show.js';
import rssFetcher from './rssFetcher.js';
import registerServiceWorker from './registerServiceWorker.js';
import * as userData from './userData.js';
import * as modal from './components/modal.js';

// https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
const SEARCH_BASE = '//itunes.apple.com/search?media=podcast&entity=podcast&limit=25&term=';

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
});

function doSearch(query){
  const escapedQuery = encodeURIComponent(query);
  fetch(`${SEARCH_BASE}${escapedQuery}`)
    .then((res) => res.json())
    .then((json) => renderSearchResults(json));
}

/**
 * Render search result items
 * @param {SearchResults} json
 */
function renderSearchResults(json){
  const {results} = json;
  userData.setSearchResults(results);
  const resultsEl = document.querySelector('.search-results');
  resultsEl.innerHTML = searchResultComponent(results);
}

function renderUserShows(){
  const shows = userData.getShows();
  console.info('rendering user shows', shows.length);
  const resultsEl = document.querySelector('.search-results');
  resultsEl.innerHTML = searchResultComponent(shows);
}

// handle search result click
document.addEventListener('click', (event) => {
  if(!(event.target instanceof HTMLElement)) {
    return;
  }
  if(event.target.matches('.podcast a')) {
    event.preventDefault();
    const feedUrl = event.target.href;
    const show = userData.getSearchResult(feedUrl);
    saveShow(show);
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
    .then((feedData) => {
      show.items = feedData.item;
      userData.saveShow(show);
      modal.hideMessage();
    });
}

registerServiceWorker();
