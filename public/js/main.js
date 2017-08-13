import audioPlayer from './audioPlayer.js';

const SEARCH_BASE = 'https://www.acast.com/api/search?q=';
const RSS_BASE = 'http://rss.acast.com/';
const POPULAR_BASE = 'https://www.acast.com/api/popular/channels';
// https://www.acast.com/api/categories/comedy?page=0


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
    const query = event.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      doSearch(query);
    }, 250);
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
 * @param {SearchResults} results
 */
function renderSearchResults(results){
  const resultsEl = document.querySelector('.search-results');
  const markup = results.channels.map(channel => {
    return `
      <div class="result-item">
        <div class='spinner'>
          <div class='rect1'></div>
          <div class='rect2'></div>
          <div class='rect3'></div>
          <div class='rect4'></div>
          <div class='rect5'></div>
        </div>
        <a data-rss-id="${channel.url}" href="#">
          <img src="${channel.imageApiUrl}">
        </a>
        <div>${channel.author}</div>
      </div>
    `.trim();
  }).join('\n');
  resultsEl.innerHTML = markup;
}

// handle search result click
document.addEventListener('click', (event) => {
  if(!(event.target instanceof HTMLElement)) {
    return;
  }
  console.log('clicked', event.target);
  if(event.target.matches('[data-rss-id]')) {
    event.preventDefault();
    displayShow(event.target.getAttribute('data-rss-id'), event.target);
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
function displayShow(id, el) {
  console.info('display', id);
  const showImageUrl = el.querySelector('img').src || '';
  el.classList.add('loading');
  fetch(`${RSS_BASE}${id}`)
    .then(res => res.text())
    .then((rss) => {
      const xml = parseXml(rss);
      const json = xmlToJson(xml);
      return json.rss.channel;
    })
    .then((channel) => {
      el.classList.remove('loading');
      const showList = document.querySelector('.show-list');
      const markup = `
        <div>
          <h2><img src="${showImageUrl}" style="width:100px">&nbsp;${ channel.title }</h2>
        <div>
        <ul>
          ${channel.item.slice(0,10).map(item => {
            return renderShowItem(item);
          }).join('\n')}
        </ul>
      `.trim();
      showList.innerHTML = markup;
    });
}

function renderShowItem(item){
  const daysAgo = getDaysAgoText(item.pubDate);
  console.log(item);
  return `
    <li class="show-item theme-dark-item-bg">
      <div>
        <h3 class="show-item__title">${item.title}</h3>
        <div class="show-item__description">${item.description}</div>
        <div class="show-item__time">${daysAgo}</div>
      </div>
      <div class="play" data-url=${item.enclosure['@attributes'].url}></div>
    </li>
  `.trim();
}

function getDaysAgoText(dateString){
  const msSincePublished = Date.now() - Date.parse(dateString);
  const daysAgo = Math.floor( msSincePublished / (24*60*60*1000) );
  if(daysAgo === 0) return 'Today';
  if(daysAgo === 1) return 'Yesterday';
  return `${daysAgo} days ago`;
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
