/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/0-ced1e89ceaf82396dff9.js","a092ce59e6e6d706e26b52c9a63b226a"],["/1-05b57f4de654bb44714f.js","c3b9cbea9dfbc9900c69f69ddaef23d6"],["/10-e8b2a3ba01173104e428.js","b97ead1279e8c08f86d2c821d5d0ade5"],["/11-c1c18870b3259558cf68.js","36c2969761d7ea79189be33960e53d7b"],["/12-26c1946a149de61a2ec4.js","92038aa3a3f80f6ae4adc5012f3f2ad9"],["/13-26f8947a356cba8a950b.js","fde0248a6416b5f51764494afec7be84"],["/14-3c136bb7d94dcb4fc824.js","f8ad8d06471f4d3b335b809bd9ebf322"],["/15-5fae8d6cf7d50c1c6c7a.js","e3c1e1b902c82f5373ddb4b851a9a5bd"],["/16-eab306d913b972e059f2.js","a65a4068959b0ef74eed985525a6d380"],["/17-b34e9284cf0965099e34.js","c24257b54615e7dabc80ff0d2a54104d"],["/18-94b2f49ada3e47015bdf.js","78bac6ea6dfff249c798acde5b98ca2b"],["/19-f588b5e2a2fccd73b151.js","13ecd0323627e9a97f44e67afbc8aed9"],["/2-d6973a830218422a161c.js","fac77066bbacd0e300850c4e4e5b7281"],["/20-a56364dfa3e1e9f16929.js","3360aa5d0875614c189e0e19ee0f0616"],["/21-486ed76b1ba7c72c0d97.js","b16b557068059f8ffd9f6fb6a1b261a0"],["/22-ca0d7362ecef06695795.js","3ee7cc9dd1e7de827296128a1015101d"],["/23-5d905800d6652a93e309.js","38d331214f9d52f1edddba5396d0ab78"],["/24-36aba49567722a021714.js","24bd4ad04182544ad1f96604ce1ed7d6"],["/25-7497fa2c67bb63b2b3ba.js","a906e6ed36f5ebbc5aee98a66cf1e088"],["/26-0208dbfbc4d70296ac90.js","b9a71e0a010ef381b6999ea1cfea3a66"],["/27-cf5004bc25299aeb5219.js","d8b66150fa39ea9efd006484d47b28ef"],["/28-296e8382e4a6669594ed.js","3817fd0503adf696bc8167a88d9d2af1"],["/29-8b6cc21b8c6f982361d9.js","df3c42c8da0fc1bd07914ce2675af8f0"],["/30-8b740e7ca5e995d95191.js","a6da5e016cadc19e4b444215ea507122"],["/31-263bca6d07ece70be0cf.js","84ff2a1cdb8736fe487b8e608db7514a"],["/32-0b322233b466840bdc1f.js","1fcc8a48b17925e5839f16431c3995f8"],["/33-ac981789ded6b41a4ce7.js","b0cd4da7505737faea9c35cecf44e484"],["/34-377f6e269b1b8e235142.js","bf3d3118645c63339ccf02ac123e04d9"],["/35-271bf32f41cc110c0acd.js","77eb062ea8679ad4da08388e5f3e2648"],["/36-fcd76a10e3cbb573d17e.js","929d33dec511babc4be83691565b3a2c"],["/37-3e6cd936a342e3764c44.js","f63aa5c184ba922fa10f1eb09c22f6a4"],["/38-04b75bc88b3a8b973d2f.js","224774977a8c059f6e5643baef31e434"],["/39-1ef7b45e69e39e64e7c9.js","bcde85dc6b8eac1cefc2bfbde4a5fb59"],["/4-973479c7f794fcf98b8f.js","7732592d173e74c9fcdf0c6cbb8dbf52"],["/5-002a1f12192be2d28f60.js","29e535ed2b4a870ea739af27860041d8"],["/6-d766aa7b93a1a6aed0ce.js","cab865d1a3fbb64f24fa2c57325b3646"],["/7-12c2f4bc9f2df776c801.js","97ab6d72b16750ade26471c5d592dad8"],["/8-b6defc2287a3666e0f21.js","70df6e9a82def5e10d12638844c450f9"],["/9-41b0c32f2f73197a399a.js","647144b8aba77cbeefc1209fa0dffc47"],["/android-chrome-144x144.png","0aa71a5783edc358767e6cb00795b329"],["/apple-touch-icon.png","59ce700521fe0556c5830fe58bf96c17"],["/browserconfig.xml","5a8f27e7dd0c369028679223d0465728"],["/bundle-1db229c2138738523270.js","2f668da8020b2f4842a5b3379c362d1b"],["/favicon-16x16.png","b94fcb5f7364b3e26ae6ede16b719ea3"],["/favicon-32x32.png","cfa43c1bad9c17b98614e7ff9aa596a9"],["/favicon.ico","f4706ad25b9e9ca9720932652ec342ca"],["/index.html","11784684aae38aeb83fbc48cc464a128"],["/manifest.json","63caf6242da7528888db67541292f0b5"],["/mstile-150x150.png","886bf4a2c7300bd9836059809a3089bf"],["/react-square.png","3342b3152ae96e4e16ca780cffc8d1bd"],["/safari-pinned-tab.svg","1146ba4a2a492be098bd76ecf45f9575"],["/vendor-627609e79c0590bca8d2.js","ce993750b6d63f7f09293f0cf760f34b"]];
var cacheName = 'sw-precache-v2-react-router-website-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







