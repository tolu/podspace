const FILE_CACHE = 'file_offline_cache';
const DATA_CACHE = 'data_cache';
const appShellFiles = [
  '/',
  '/js/main.js',
  '/js/audioPlayer.js',
  '/css/style.css',
  '/img/logo_48x48.png'
];

// add timeout-method to fetch
Promise.prototype.timeout = function(number){
  return new Promise((resolve, reject) => {
    this.then(resolve, reject);
    setTimeout(() => reject(new Error('TIMEOUT')), number);
  });
}

// INSTALL
self.addEventListener('install', event => {
  console.info('SW install...');
  caches.delete(FILE_CACHE);
  cacheAppShell(event);
});

// ENABLE OFFLINE
function cacheAppShell(event) {
  event.waitUntil(
    caches.open(FILE_CACHE)
      .then(cache => cache.addAll(appShellFiles))
      .then(_ => console.info('File cache completed...'))
      .then(_ => self.skipWaiting())
  );
}

// SETUP DATA CACHE
self.addEventListener('fetch', event => {
  const { request } = event;
  const path = (new URL(request.url)).pathname;
  if(request.method !== 'GET'){
    return;
  }

  // use network first strategy for application files
  if(appShellFiles.includes(path)){
    return event.respondWith(networkFirstAndCacheForSlow(request, FILE_CACHE));
  }

  // select cache based on url
  const cacheKey = /\/rss\//.test(request.url) ? DATA_CACHE : FILE_CACHE;

  event.respondWith(cacheFirst(request, cacheKey));

  // OFFLINE METHOD 1: Assume everything pre-cached
  // OFFLINE METHOD 2: Network first, cache fallback
  // OFFLINE METHOD 3: Network first, but timeout slow responses and store in cache
  // event.respondWith(networkFirstAndCacheForSlow(req));
});

function fetchNcache(req, cacheKey){
  console.log('fetch n cache', req.url);
  // IMPORTANT: Clone the request. A request is a stream and
  // can only be consumed once. Since we are consuming this
  // once by cache and once by the browser for fetch, we need
  // to clone the response.
  const reqClone = req.clone();
  return fetch(reqClone).then(res => {
    // Check if we received a valid response
    if(!res || res.status >= 400) {
      console.warn('res is invalid for', req.url);
      return res;
    }
    // IMPORTANT: Clone the response. A response is a stream
    // and because we want the browser to consume the response
    // as well as the cache consuming the response, we need
    // to clone it so we have two streams.
    console.info('store res in cache for', req.url);
    const resClone = res.clone();
    caches.open(cacheKey)
      .then(cache => cache.put(req, resClone));
    return res;
  });
}

function networkFirstAndCacheForSlow(req, cacheKey){
  return fetchNcache(req, cacheKey)
    .timeout(250)
    .catch(err => {
      console.info('cache fallback for', err, req.url);
      return caches.match(req);
    })
}

function cacheFirst(req, cacheKey){
  return caches.match(req)
    .then((response) => {
      if (response) {
        // Cache hit - return response
        console.debug('Cache hit');
        return response;
      }
      console.debug('Cache miss');
      return fetchNcache(req, cacheKey);
    })
}
