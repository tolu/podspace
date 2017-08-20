const FILE_CACHE = 'file_offline_cache';
const DATA_CACHE = 'data_cache';

const swScope = location.pathname.replace('/sw.js', '');
const appShellFiles = [
  // HTML
  `${swScope}/`,
  // CSS etc
  `${swScope}/css/style.css`,
  `${swScope}/img/logo_48x48.png`,
  // CONFIG
  `${swScope}/config/config.json`,
  // JS BUNDLE
  `${swScope}/dist/es6_bundle.js`,
  // JS FILES
  `${swScope}/dist/main.js`,
  `${swScope}/dist/audioPlayer.js`,
];

const log = (...args) => {
  console.debug('%c SW ', 'background: #222; color: #bada55', ...args);
}
const info = (...args) => {
  console.info('%c SW ', 'background: #222; color: #bada55', ...args);
}

// add timeout-method to fetch
Promise.prototype.timeout = function(number){
  return new Promise((resolve, reject) => {
    this.then(resolve, reject);
    setTimeout(() => reject(new Error('TIMEOUT')), number);
  });
}

// INSTALL
self.addEventListener('install', event => {
  info('SW install...');
  caches.delete(FILE_CACHE);
  cacheAppShell(event);
});

// ENABLE OFFLINE
function cacheAppShell(event) {
  event.waitUntil(
    caches.open(FILE_CACHE)
      .then(cache => cache.addAll(appShellFiles))
      .then(_ => info('File cache completed...'))
      .then(_ => self.skipWaiting())
  );
}

// SETUP DATA CACHE
self.addEventListener('fetch', event => {
  const { request } = event;
  const path = (new URL(request.url)).pathname;
  if(request.method !== 'GET') {
    return;
  }
  if(/(\/token)|(\.mp3)$/.test(request.url)) {
    info(`skipping sw cache for ${request.url}`);
    return fetch(request);
  }

  // use network first strategy for application files
  if(appShellFiles.includes(path)){
    if(navigator.onLine){
      return event.respondWith(networkFirstAndCacheForSlow(request, FILE_CACHE));
    } else {
      return event.respondWith(cacheFirst(request, FILE_CACHE));
    }
  }

  // select cache based on url
  const cacheKey = /\/episodes$/.test(request.url) ? DATA_CACHE : FILE_CACHE;

  event.respondWith(cacheFirst(request, cacheKey));

  // OFFLINE METHOD 1: Assume everything pre-cached
  // OFFLINE METHOD 2: Network first, cache fallback
  // OFFLINE METHOD 3: Network first, but timeout slow responses and store in cache
  // event.respondWith(networkFirstAndCacheForSlow(req));
});

function fetchNcache(req, cacheKey) {
  // IMPORTANT: Clone the request. A request is a stream and
  // can only be consumed once. Since we are consuming this
  // once by cache and once by the browser for fetch, we need
  // to clone the response.
  const reqClone = req.clone();
  return fetch(reqClone).then(res => {
    // Check if we received a valid response
    if(!res.ok) {
      const {type, status} = res;
      info('res is not ok!', req.url, {type, status});
    }
    // IMPORTANT: Clone the response. A response is a stream
    // and because we want the browser to consume the response
    // as well as the cache consuming the response, we need
    // to clone it so we have two streams.
    const path = `/${req.url.split('/').slice(3).join('/')}`;
    const resClone = res.clone();
    caches.open(cacheKey)
      .then(cache => cache.put(req, resClone))
      .then(() => info(`Cached ${path}`));
    return res;
  });
}

function networkFirstAndCacheForSlow(req, cacheKey){
  return fetchNcache(req, cacheKey)
    .timeout(250)
    .catch(err => {
      log('cache fallback for', err, req.url);
      return caches.match(req);
    })
}

function cacheFirst(req, cacheKey){
  return caches.match(req)
    .then((response) => {
      if (response) {
        // Cache hit - return response
        info('Cache hit');
        return response;
      }
      return fetchNcache(req, cacheKey);
    })
}
