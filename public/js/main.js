import audioPlayer from './audioPlayer.js';
import searchResultComponent from './components/searchResultList.js';
import showComponent from './components/show.js';
import rssFetcher from './rssFetcher.js';

// https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
const SEARCH_BASE = '//itunes.apple.com/search?media=podcast&entity=podcast&limit=25&term=';


// https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, err => {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

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
  console.log('results', json);
  const resultsEl = document.querySelector('.search-results');
  resultsEl.innerHTML = searchResultComponent(json);
}

// handle search result click
document.addEventListener('click', (event) => {
  if(!(event.target instanceof HTMLElement)) {
    return;
  }
  if(event.target.matches('[data-rss-feed]')) {
    event.preventDefault();
    displayShow(event.target.getAttribute('data-rss-feed'), event.target);
  }
  if(event.target.matches('.play[data-url]')) {
    [].slice.call(document.querySelectorAll('.playing')).forEach((i) => i.classList.remove('playing'));

    if(audioPlayer.play(event.target.getAttribute('data-url'))) {
      event.target.closest('.show-item').classList.add('playing');
    }
  }
});

function displayShow(rssFeed, el) {
  console.info('display', rssFeed);
  const showImageUrl = el.querySelector('img').src || '';
  el.classList.add('loading');
  rssFetcher(`/rss/${encodeURIComponent(rssFeed)}`)
    .then((show) => {
      el.classList.remove('loading');
      const showList = document.querySelector('.show-list');
      showList.innerHTML = showComponent(show, showImageUrl);
    });
}


