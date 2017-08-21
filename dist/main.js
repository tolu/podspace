"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import audioPlayer from './audioPlayer.js';
import searchResultComponent from './components/searchResultList.js';
import userShowsComponent from './components/userShowList.js';
import showComponent from './components/show.js';
import * as userData from './userData.js';
import * as modal from './components/modal.js';
import apiClient from './audioSearchClient.js';
import { ready } from './config.js';
// https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
// const SEARCH_BASE = '//itunes.apple.com/search?media=podcast&entity=podcast&limit=25&term=';
ready().then(_ => console.info('CONFIG LOADED!'));
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
        }, 500);
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
        const results = yield apiClient.search(query);
        renderSearchResults(results);
    });
}
function renderSearchResults(json) {
    const { results } = json;
    console.info(results);
    const resultsEl = document.querySelector('.search-results');
    if (results) {
        userData.setSearchResults(results);
        resultsEl.innerHTML = searchResultComponent(results);
    }
    else {
        resultsEl.innerHTML = '';
    }
}
function renderShowFeed(podcast) {
    const root = document.querySelector('.show-list');
    if (podcast) {
        podcast.items = userData.getShowFeed(`${podcast.id}`);
        root.innerHTML = showComponent(podcast);
    }
    else {
        root.innerHTML = '';
    }
}
function renderUserShows() {
    const shows = userData.getShows();
    const resultsEl = document.querySelector('.search-results');
    resultsEl.innerHTML = userShowsComponent(shows);
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
        const show = userData.getSearchResult(feedUrl);
        saveShow(show);
    }
    if (event.target.matches('.user-show .podcast a')) {
        event.preventDefault();
        // @ts-ignore
        const feedUrl = event.target.href;
        renderShowFeed(userData.getShow(feedUrl));
    }
    if (event.target.matches('.play[data-episode]')) {
        [].slice.call(document.querySelectorAll('.playing')).forEach((i) => i.classList.remove('playing'));
        const showId = event.target.getAttribute('data-show');
        const episodeId = event.target.getAttribute('data-episode');
        const episode = userData.getEpisode(showId, episodeId);
        if (audioPlayer.play(episode)) {
            event.target.closest('.show-item').classList.add('playing');
        }
    }
});
function saveShow(show) {
    return __awaiter(this, void 0, void 0, function* () {
        modal.displayMessage(`Saving ${show.title}`);
        const episodes = yield apiClient.getEpisodes(`${show.id}`);
        userData.saveShow(show, episodes);
        modal.hideMessage();
    });
}
