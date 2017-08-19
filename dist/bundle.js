/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = (({ feedUrl, image, artist, title }) => {
    const data = { feedUrl, image, artist, title };
    return `
    <div class="podcast">
      <a href="${feedUrl}">
        <img src="${image}" title="${artist}">
      </a>
      <div>${title}</div>
    </div>`;
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// read config from localStorage and assign with data from network
const KEY = 'podspace_config';
const config = JSON.parse(localStorage.getItem(KEY) || 'null') || {};
const promise = fetch(`${location.href}config/config.json`)
    .then(res => res.json())
    .then(configData => {
    const env = /localhost/i.test(location.hostname) ? 'dev' : 'prod';
    Object.assign(config, configData[env]);
    return config;
});
const get = (key) => {
    return config[key];
};
/* unused harmony export get */

const set = (key, value) => {
    config[key] = value;
    localStorage.setItem(KEY, JSON.stringify(config));
};
/* unused harmony export set */

const ready = () => {
    return promise;
};
/* harmony export (immutable) */ __webpack_exports__["b"] = ready;

/* harmony default export */ __webpack_exports__["a"] = ({ get, set, ready });


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__audioPlayer_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_searchResultList_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_userShowList_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_show_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userData_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_modal_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__audioSearchClient_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config_js__ = __webpack_require__(1);









// https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
// const SEARCH_BASE = '//itunes.apple.com/search?media=podcast&entity=podcast&limit=25&term=';
Object(__WEBPACK_IMPORTED_MODULE_7__config_js__["b" /* ready */])().then(_ => console.info('CONFIG LOADED!'));
window.addEventListener('load', function () {
    let timeout;
    document.querySelector('input').addEventListener('keyup', event => {
        if (event.target instanceof HTMLInputElement) {
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
        document.querySelector('input').disabled = !navigator.onLine;
        document.querySelector('input').placeholder = navigator.onLine ? 'Search...' : 'Offline...';
        console.warn(navigator.onLine ? 'online :)' : 'offline :(');
    }
});
function doSearch(query) {
    if (!query || query.length <= 2) {
        return;
    }
    __WEBPACK_IMPORTED_MODULE_6__audioSearchClient_js__["a" /* default */].search(query).then((results) => {
        renderSearchResults(results);
    }).catch(console.error);
}
/**
 * Render search result items
 * @param {SearchResults} json
 */
function renderSearchResults(json) {
    const { results } = json;
    console.info(results);
    const resultsEl = document.querySelector('.search-results');
    if (results) {
        __WEBPACK_IMPORTED_MODULE_4__userData_js__["f" /* setSearchResults */](results);
        resultsEl.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_1__components_searchResultList_js__["a" /* default */])(results);
    }
    else {
        resultsEl.innerHTML = '';
    }
}
/**
 * @param {Podcast|null} podcast
 */
function renderShowFeed(podcast) {
    const root = document.querySelector('.show-list');
    if (podcast) {
        podcast.items = __WEBPACK_IMPORTED_MODULE_4__userData_js__["c" /* getShowFeed */](`${podcast.id}`);
        root.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_3__components_show_js__["a" /* default */])(podcast);
    }
    else {
        root.innerHTML = '';
    }
}
function renderUserShows() {
    const shows = __WEBPACK_IMPORTED_MODULE_4__userData_js__["d" /* getShows */]();
    const resultsEl = document.querySelector('.search-results');
    resultsEl.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_2__components_userShowList_js__["a" /* default */])(shows);
}
// handle search result click
document.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLElement)) {
        return;
    }
    if (event.target.matches('header a')) {
        event.preventDefault();
        renderSearchResults({ results: null, page: 0, results_per_page: 0, total_results: 0 });
        renderShowFeed(null);
        renderUserShows();
    }
    if (event.target.matches('.search-result .podcast a')) {
        event.preventDefault();
        // @ts-ignore
        const feedUrl = event.target.href;
        const show = __WEBPACK_IMPORTED_MODULE_4__userData_js__["a" /* getSearchResult */](feedUrl);
        saveShow(show);
    }
    if (event.target.matches('.user-show .podcast a')) {
        event.preventDefault();
        // @ts-ignore
        const feedUrl = event.target.href;
        renderShowFeed(__WEBPACK_IMPORTED_MODULE_4__userData_js__["b" /* getShow */](feedUrl));
    }
    if (event.target.matches('.play[data-url]')) {
        [].slice.call(document.querySelectorAll('.playing')).forEach((i) => i.classList.remove('playing'));
        if (__WEBPACK_IMPORTED_MODULE_0__audioPlayer_js__["a" /* default */].play(event.target.getAttribute('data-url'))) {
            event.target.closest('.show-item').classList.add('playing');
        }
    }
});
/**
 * @param {Podcast} show
 */
function saveShow(show) {
    __WEBPACK_IMPORTED_MODULE_5__components_modal_js__["a" /* displayMessage */](`Saving ${show.title}`);
    __WEBPACK_IMPORTED_MODULE_6__audioSearchClient_js__["a" /* default */].getEpisodes(`${show.id}`)
        .then((episodes) => {
        __WEBPACK_IMPORTED_MODULE_4__userData_js__["e" /* saveShow */](show, episodes);
        __WEBPACK_IMPORTED_MODULE_5__components_modal_js__["b" /* hideMessage */]();
    });
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
    play(showMediaUrl) {
        const audio = document.querySelector('audio');
        if (audio.currentSrc !== showMediaUrl) {
            audio.src = showMediaUrl;
        }
        else if (audio.ended) {
            audio.currentTime = 0;
        }
        audio.paused ? audio.play() : audio.pause();
        return !audio.paused;
    }
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__showPoster_js__ = __webpack_require__(0);


/**
 * Render search result items
 * @param {Podcast[]} results
 * @return {string} html markup
 */
const component = (results) => {
    return results.map(podcast => {
        console.info({ podcast });
        const image = getImage(podcast);
        const artist = (podcast.network || { name: '' }).name;
        const { rss_url: feedUrl, title } = podcast;
        return `
      <div class="search-result list-item">
        <div class='spinner'>
          <div class='rect1'></div>
          <div class='rect2'></div>
          <div class='rect3'></div>
          <div class='rect4'></div>
          <div class='rect5'></div>
        </div>
        ${Object(__WEBPACK_IMPORTED_MODULE_0__showPoster_js__["a" /* default */])({ feedUrl, image, artist, title })}
      </div>
    `.trim();
    }).join('\n');
};
/* unused harmony export component */

/* harmony default export */ __webpack_exports__["a"] = (component);
/**
 * @param {Podcast} pod
 */
function getImage(pod) {
    if (pod.image_files && pod.image_files.length) {
        return pod.image_files[0].file.thumb.url;
    }
    if (pod.image_urls) {
        return pod.image_urls.thumb;
    }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__showPoster_js__ = __webpack_require__(0);


/**
 * Render search result items
 * @param {Podcast[]} userShows
 * @return {string} html markup
 */
const component = (userShows) => {
    return userShows.map(podcast => {
        const image = getImage(podcast);
        const artist = (podcast.network || { name: '' }).name;
        const { rss_url: feedUrl, title, } = podcast;
        return `
      <div class="list-item user-show">
        ${Object(__WEBPACK_IMPORTED_MODULE_0__showPoster_js__["a" /* default */])({ feedUrl, image, artist, title })}
      </div>
    `.trim();
    }).join('\n');
};
/* unused harmony export component */

/* harmony default export */ __webpack_exports__["a"] = (component);
/**
 * @param {Podcast} pod
 */
function getImage(pod) {
    if (pod.image_files && pod.image_files.length) {
        return pod.image_files[0].file.thumb.url;
    }
    if (pod.image_urls) {
        return pod.image_urls.thumb;
    }
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__episode_js__ = __webpack_require__(7);


/**
 *
 * @param {Podcast} show
 */
const component = (show) => {
    const image = getImage(show);
    return `
  <div>
    <h2><img src="${image}" style="width:100px">&nbsp;${show.title}</h2>
  <div>
  <ul>
    ${show.items.map(__WEBPACK_IMPORTED_MODULE_0__episode_js__["a" /* default */]).join('\n')}
  </ul>
`.trim();
};
/* unused harmony export component */

/* harmony default export */ __webpack_exports__["a"] = (component);
/**
 * @param {Podcast} pod
 */
function getImage(pod) {
    if (pod.image_files && pod.image_files.length) {
        return pod.image_files[0].file.thumb.url;
    }
    if (pod.image_urls) {
        return pod.image_urls.thumb;
    }
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ((/** @type {Episode}*/ episode) => {
    const audio = episode.audio_files[0];
    return `
    <li class="show-item theme-dark-item-bg">
      <div>
        <h3 class="show-item__title">${episode.title}</h3>
        <div class="show-item__description">${episode.description}</div>
        <div class="show-item__time">${getDaysAgoText(episode.date_created)} - <small>${audio.duration}</small></div>
      </div>
      <div class="play" data-url=${audio.mp3}></div>
    </li>
  `.trim();
});
function pad(number) {
    return `${number}`.padStart(2, '0');
}
function getDaysAgoText(dateString) {
    const msSincePublished = Date.now() - Date.parse(dateString);
    const daysAgo = Math.floor(msSincePublished / (24 * 60 * 60 * 1000));
    if (daysAgo === 0)
        return 'Today';
    if (daysAgo === 1)
        return 'Yesterday';
    return `${daysAgo} days ago`;
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const SHOWS = 'pod_shows';
const SEARCH_RESULTS = 'search_results';
/**
 *
 * @param {Podcast} showData
 * @param {Episode[]} items
 */
const saveShow = (showData, items) => {
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
/* harmony export (immutable) */ __webpack_exports__["e"] = saveShow;

/**
 * @return {Podcast[]}
 */
const getShows = () => {
    const showData = localStorage.getItem(SHOWS);
    return showData ? JSON.parse(showData) : [];
};
/* harmony export (immutable) */ __webpack_exports__["d"] = getShows;

/**
 * @return {Podcast}
 */
const getShow = (feedUrl) => {
    const shows = getShows();
    return shows.find((s) => s.rss_url === feedUrl);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = getShow;

/**
 * @param {string} id
 * @return {Episode[]}
 */
const getShowFeed = (id) => {
    const items = JSON.parse(localStorage.getItem(`${id}`) || '[]');
    return items;
};
/* harmony export (immutable) */ __webpack_exports__["c"] = getShowFeed;

/**
 * @param {Podcast[]} results
 */
const setSearchResults = (results) => {
    const dataStr = JSON.stringify(results || []);
    localStorage.setItem(SEARCH_RESULTS, dataStr);
};
/* harmony export (immutable) */ __webpack_exports__["f"] = setSearchResults;

/**
 * @param {string} feedUrl
 * @returns {Podcast}
 */
const getSearchResult = (feedUrl) => {
    /** @type {Podcast[]} */
    const results = JSON.parse(localStorage.getItem(SEARCH_RESULTS) || '[]');
    return results.find(pod => pod.rss_url === feedUrl);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getSearchResult;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/** @type {HTMLElement} */
const modal = document.querySelector('.modal');
const displayMessage = (message, close) => {
    const messageEl = modal.querySelector('.modal__message');
    messageEl.innerHTML = message;
    modal.style.display = 'block';
};
/* harmony export (immutable) */ __webpack_exports__["a"] = displayMessage;

const hideMessage = () => {
    displayMessage('');
    modal.style.display = 'none';
};
/* harmony export (immutable) */ __webpack_exports__["b"] = hideMessage;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js__ = __webpack_require__(1);

// based on https://github.com/popuparchive/audiosearch-client-node/blob/master/index.js

__WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].get('token');
const host = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].get.bind(null, 'audio_service');
function authorize() {
    const tokenService = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].get('token_service');
    return fetch(`${tokenService}/token`).then(res => res.json()).then((res) => {
        console.log('Got access token...', res);
        __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].set('token', res.access_token);
        return res.access_token;
    });
}
function base64Encode(str) {
    return btoa(str);
}
function get(path) {
    var url = `${host()}/api/${path}`;
    var options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${__WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].get('token')}`,
            'User-Agent': 'request'
        }
    };
    if (__WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].get('token')) {
        return fetch(url, options).then(res => res.json());
    }
    else {
        return authorize().then(() => get(path));
    }
}
class AudioSearchClient {
    /**
     * @param {string} query
     * @returns {Promise<SearchResults>}
     * @memberof AudioSearchClient
     */
    search(query) {
        const timer = 'audioSearch';
        console.time(timer);
        return get(`search/shows/${encodeURI(query)}`)
            .then(data => {
            console.timeEnd(timer);
            return data;
        });
    }
    /**
     * @param {string} show_id
     * @returns {Promise<Episode[]>}
     * @memberof AudioSearchClient
     */
    getEpisodes(show_id) {
        const timer = 'getEpisodes';
        console.time(timer);
        return get(`shows/${show_id}/episodes`)
            .then(data => {
            console.timeEnd(timer);
            return data;
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (new AudioSearchClient());


/***/ })
/******/ ]);