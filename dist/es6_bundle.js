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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// read config from localStorage and assign with data from network
const KEY = 'podspace_config';
const config = JSON.parse(localStorage.getItem(KEY) || '{}');
const promise = (function getConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${location.pathname}config/config.json`);
        const configData = yield res.json();
        const env = /localhost/i.test(location.hostname) ? 'dev' : 'prod';
        Object.assign(config, configData[env]);
        return config;
    });
}());
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








// https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
// const SEARCH_BASE = '//itunes.apple.com/search?media=podcast&entity=podcast&limit=25&term=';
Object(__WEBPACK_IMPORTED_MODULE_7__config_js__["b" /* ready */])().then(_ => console.info('CONFIG LOADED!'));
function onConnectionChanged() {
    const online = navigator.onLine;
    document.body.classList[online ? 'remove' : 'add']('offline');
    document.querySelector('input').disabled = !online;
    document.querySelector('input').placeholder = online ? 'Search...' : 'Offline...';
    console.info(`%c online:${online} `, `background: #${online ? '88d8b0' : 'ff6f69'};`);
}
onConnectionChanged();
(function setupListeners() {
    let timeout;
    const input = document.querySelector('input');
    input.addEventListener('keyup', event => {
        const query = input.value;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            doSearch(query);
        }, 250);
    });
    renderUserShows();
    window.addEventListener('online', onConnectionChanged);
    window.addEventListener('offline', onConnectionChanged);
}());
function doSearch(query) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!query || query.length <= 2) {
            return;
        }
        const results = yield __WEBPACK_IMPORTED_MODULE_6__audioSearchClient_js__["a" /* default */].search(query);
        renderSearchResults(results);
    });
}
function renderSearchResults(json) {
    const { results } = json;
    console.info(results);
    const resultsEl = document.querySelector('.search-results');
    if (results) {
        __WEBPACK_IMPORTED_MODULE_4__userData_js__["g" /* setSearchResults */](results);
        resultsEl.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_1__components_searchResultList_js__["a" /* default */])(results);
    }
    else {
        resultsEl.innerHTML = '';
    }
}
function renderShowFeed(podcast) {
    const root = document.querySelector('.show-list');
    if (podcast) {
        podcast.items = __WEBPACK_IMPORTED_MODULE_4__userData_js__["d" /* getShowFeed */](`${podcast.id}`);
        root.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_3__components_show_js__["a" /* default */])(podcast);
    }
    else {
        root.innerHTML = '';
    }
}
function renderUserShows() {
    const shows = __WEBPACK_IMPORTED_MODULE_4__userData_js__["e" /* getShows */]();
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
        const show = __WEBPACK_IMPORTED_MODULE_4__userData_js__["b" /* getSearchResult */](feedUrl);
        saveShow(show);
    }
    if (event.target.matches('.user-show .podcast a')) {
        event.preventDefault();
        // @ts-ignore
        const feedUrl = event.target.href;
        renderShowFeed(__WEBPACK_IMPORTED_MODULE_4__userData_js__["c" /* getShow */](feedUrl));
    }
    if (event.target.matches('.play[data-episode]')) {
        [].slice.call(document.querySelectorAll('.playing')).forEach((i) => i.classList.remove('playing'));
        const showId = event.target.getAttribute('data-show');
        const episodeId = event.target.getAttribute('data-episode');
        const episode = __WEBPACK_IMPORTED_MODULE_4__userData_js__["a" /* getEpisode */](showId, episodeId);
        if (__WEBPACK_IMPORTED_MODULE_0__audioPlayer_js__["a" /* default */].play(episode)) {
            event.target.closest('.show-item').classList.add('playing');
        }
    }
});
function saveShow(show) {
    return __awaiter(this, void 0, void 0, function* () {
        __WEBPACK_IMPORTED_MODULE_5__components_modal_js__["a" /* displayMessage */](`Saving ${show.title}`);
        const episodes = yield __WEBPACK_IMPORTED_MODULE_6__audioSearchClient_js__["a" /* default */].getEpisodes(`${show.id}`);
        __WEBPACK_IMPORTED_MODULE_4__userData_js__["f" /* saveShow */](show, episodes);
        __WEBPACK_IMPORTED_MODULE_5__components_modal_js__["b" /* hideMessage */]();
    });
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const supportsMediaSession = 'mediaSession' in navigator;
/* harmony default export */ __webpack_exports__["a"] = ({
    play(episode) {
        const audio = document.querySelector('audio');
        const mp3Url = episode.audio_files[0].mp3;
        if (audio.currentSrc !== mp3Url) {
            audio.src = mp3Url;
            updateMediaSessionData(episode, audio);
        }
        else if (audio.ended) {
            audio.currentTime = 0;
        }
        audio.paused ? audio.play() : audio.pause();
        return !audio.paused;
    }
});
function updateMediaSessionData(episode, audio) {
    if (!supportsMediaSession) {
        console.warn('Client does not support media session api');
        return;
    }
    episode.image_urls.thumb;
    navigator.mediaSession.metadata = new MediaMetadata({
        title: episode.title,
        artist: episode.show_title,
        album: '',
        artwork: [
            { src: episode.image_urls.thumb, sizes: '100x100', type: 'image/jpg' },
            { src: episode.image_urls.full, sizes: '600x600', type: 'image/jpg' },
        ]
    });
    navigator.mediaSession.setActionHandler('play', () => {
        audio.play();
    });
    navigator.mediaSession.setActionHandler('pause', () => {
        audio.pause();
    });
    navigator.mediaSession.setActionHandler('seekbackward', () => {
        const time = Math.max(audio.currentTime - 15, 0);
    });
    navigator.mediaSession.setActionHandler('seekforward', () => {
        const time = Math.max(audio.currentTime - 15, 0);
    });
    navigator.mediaSession.setActionHandler('previoustrack', () => {
        // nope
    });
    navigator.mediaSession.setActionHandler('nexttrack', () => {
        // not until we have a queue
    });
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__showPoster_js__ = __webpack_require__(0);


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

/* harmony default export */ __webpack_exports__["a"] = ((episode) => {
    const audio = episode.audio_files[0];
    return `
    <li class="show-item theme-dark-item-bg">
      <div>
        <h3 class="show-item__title">${episode.title}</h3>
        <div class="show-item__description">${episode.description}</div>
        <div class="show-item__time">${getDaysAgoText(episode.date_created)} - <small>${audio.duration}</small></div>
      </div>
      <div class="play" data-show=${episode.show_id} data-episode=${episode.id}></div>
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
/* harmony export (immutable) */ __webpack_exports__["f"] = saveShow;

const getShows = () => {
    const showData = localStorage.getItem(SHOWS);
    return JSON.parse(showData || '[]');
};
/* harmony export (immutable) */ __webpack_exports__["e"] = getShows;

const getShow = (feedUrl) => {
    const shows = getShows();
    return shows.find((s) => s.rss_url === feedUrl);
};
/* harmony export (immutable) */ __webpack_exports__["c"] = getShow;

const getShowFeed = (id) => {
    const items = JSON.parse(localStorage.getItem(`${id}`) || '[]');
    return items;
};
/* harmony export (immutable) */ __webpack_exports__["d"] = getShowFeed;

const setSearchResults = (results) => {
    const dataStr = JSON.stringify(results || []);
    localStorage.setItem(SEARCH_RESULTS, dataStr);
};
/* harmony export (immutable) */ __webpack_exports__["g"] = setSearchResults;

const getSearchResult = (feedUrl) => {
    const results = JSON.parse(localStorage.getItem(SEARCH_RESULTS) || '[]');
    return results.find(pod => pod.rss_url === feedUrl);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = getSearchResult;

const getEpisode = (showId, episodeId) => {
    const showFeed = getShowFeed(showId);
    return showFeed.find(ep => `${ep.id}` === episodeId);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getEpisode;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const modal = document.querySelector('.modal');
const displayMessage = (message) => {
    if (modal instanceof HTMLElement) {
        const messageEl = modal.querySelector('.modal__message');
        messageEl.innerHTML = message;
        modal.style.display = 'block';
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = displayMessage;

const hideMessage = () => {
    if (modal instanceof HTMLElement) {
        displayMessage('');
        modal.style.display = 'none';
    }
};
/* harmony export (immutable) */ __webpack_exports__["b"] = hideMessage;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js__ = __webpack_require__(1);

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// based on https://github.com/popuparchive/audiosearch-client-node/blob/master/index.js

__WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].get('token');
const host = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].get.bind(null, 'audio_service');
function authorize() {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenService = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].get('token_service');
        const res = yield fetch(`${tokenService}/token`);
        const data = yield res.json();
        console.log('Got access token...', data);
        __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].set('token', data.access_token);
        return data.access_token;
    });
}
function base64Encode(str) {
    return btoa(str);
}
function get(path) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!__WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].get('token')) {
            console.info('Refreshing API token...');
            yield authorize();
        }
        var url = `${host()}/api/${path}`;
        var options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${__WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].get('token')}`,
                'User-Agent': 'request'
            }
        };
        const res = yield fetch(url, options);
        if (!res.ok && res.status === 401) {
            console.info('token might have expired, reset and try again');
            __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].set('token', '');
            return get(path);
        }
        const data = yield res.json();
        return data;
    });
}
class AudioSearchClient {
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const timer = 'audioSearch';
            console.time(timer);
            const data = yield get(`search/shows/${encodeURI(query)}`);
            console.timeEnd(timer);
            return data;
        });
    }
    getEpisodes(show_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const timer = 'getEpisodes';
            console.time(timer);
            const data = yield get(`shows/${show_id}/episodes`);
            console.timeEnd(timer);
            return data;
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (new AudioSearchClient());


/***/ })
/******/ ]);