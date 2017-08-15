import audioPlayer from './audioPlayer.js';
import searchResultComponent from './components/searchResultList.js';
import showComponent from './components/show.js';

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

const domParser = new DOMParser();
const parseXml = (xml) => domParser.parseFromString(xml, 'application/xml');
function displayShow(rssFeed, el) {
  console.info('display', rssFeed);
  const showImageUrl = el.querySelector('img').src || '';
  el.classList.add('loading');
  fetch(`/rss/${encodeURIComponent(rssFeed)}`)
    .then(res => res.text())
    .then((rss) => {
      const xml = parseXml(rss);
      const json = xmlToJson(xml);
      return json.rss.channel;
    })
    .then((show) => {
      el.classList.remove('loading');
      const showList = document.querySelector('.show-list');
      showList.innerHTML = showComponent(show, showImageUrl);
    });
}

function xmlToJson(xml) {
  // based on: https://davidwalsh.name/convert-xml-json
  // Create the return object
	var obj = {};
	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
  }
  
	var nrOfChildren = xml.children.length;
	if (!nrOfChildren && xml.textContent.length) {
	    return xml.textContent;
	} else { // do children
		for(var i = 0; i < nrOfChildren; i++) {
			var item = xml.children.item(i);
      var nodeName = item.nodeName;
      if(/:/i.test(nodeName)){ // skip namespaced elements
        continue;
      }
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
          obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
