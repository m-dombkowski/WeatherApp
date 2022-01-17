// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"k9su4":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "4887a72dee241a17";
"use strict";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"7M7Y3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getInputValue", ()=>getInputValue
);
parcelHelpers.export(exports, "getDataForPrint", ()=>getDataForPrint
);
parcelHelpers.export(exports, "getDataForObject", ()=>getDataForObject
);
var _variables = require("./variables");
var _script = require("./script");
var _renderingJs = require("./rendering.js");
var _localStorage = require("./localStorage");
var _eventHandlers = require("./eventHandlers");
_variables.form.addEventListener("submit", function(event) {
    _eventHandlers.formHandler(event);
});
document.addEventListener("click", function(event) {
    _eventHandlers.documentHandler(event);
});
const getInputValue = function() {
    let inputValue = document.getElementById("input").value;
    return inputValue;
};
const getDataForPrint = function(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pl&appid=${_variables.MY_API_KEY}`).then((response)=>{
        if (!response.ok) throw new Error(_renderingJs.cityNotFoundMsg("Invalid city name!"));
        return response.json();
    }).then((data)=>{
        console.log(data);
        _renderingJs.renderSearchedCity(data);
    }).catch((err)=>console.error(err)
    ).finally(()=>_variables.containerSearch.style.opacity = 1
    );
};
const getDataForObject = function(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pl&appid=${_variables.MY_API_KEY}`).then((response)=>{
        if (!response.ok) throw new Error(`Something wrong with api call ${response.status}`);
        return response.json();
    }).then((data)=>{
        _script.addToCityArray(_variables.state.cities, data);
    }).catch((err)=>console.error(err)
    ).finally(()=>_variables.containerSearch.style.opacity = 1
    );
};

},{"./variables":"bvO1j","./rendering.js":"l127X","./localStorage":"5M63G","./eventHandlers":"aiXIl","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV","./script":"ijsRf"}],"bvO1j":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MY_API_KEY", ()=>MY_API_KEY
);
parcelHelpers.export(exports, "state", ()=>state
);
parcelHelpers.export(exports, "form", ()=>form
);
parcelHelpers.export(exports, "inputV", ()=>inputV
);
parcelHelpers.export(exports, "containerSearch", ()=>containerSearch
);
parcelHelpers.export(exports, "addCity", ()=>addCity
);
parcelHelpers.export(exports, "country", ()=>country
);
parcelHelpers.export(exports, "addContainer", ()=>addContainer
);
parcelHelpers.export(exports, "selectedCitiesList", ()=>selectedCitiesList
);
const MY_API_KEY = "1dd8639e06977072c7c8fcaea598d700";
const state = {
    cities: []
};
const form = document.querySelector("#form");
const inputV = document.getElementById("input");
const containerSearch = document.querySelector(".container-search");
const addCity = document.querySelector(".add-city-button");
const country = document.querySelector(".country");
const addContainer = document.querySelector(".add-city");
const selectedCitiesList = document.querySelector(".selected-cities");

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"l127X":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderSearchedCity", ()=>renderSearchedCity
);
parcelHelpers.export(exports, "renderSelectedCities", ()=>renderSelectedCities
);
parcelHelpers.export(exports, "firstCapital", ()=>firstCapital
);
parcelHelpers.export(exports, "cityNotFoundMsg", ()=>cityNotFoundMsg
);
var _unixConvertions = require("./unixConvertions");
var _variables = require("./variables");
const renderSearchedCity = function(data) {
    const html = `
<h1 class="city-name">${data.name}</h1>
<p class="date-time">${_unixConvertions.unixToNormalTime(data.dt + data.timezone - 3600)}</p>
<p class="weather-type">${firstCapital(data.weather[0].description)}</p>
<h2 class="temperature">${data.main.temp.toFixed(0)}°C</h2>
<div class="secondary-information">
  <p class="humidity">Wilgotność: ${data.main.humidity}%</p>
  <p class="pressure">Ciśnienie: ${data.main.pressure} hPa</p>
</div>
<div class="add-city">
  <button id="add-city-button">Add this city</button>
</div>
`;
    _variables.containerSearch.insertAdjacentHTML("beforeend", html);
};
const renderSelectedCities = function(data) {
    let html = `
<li class="country">
  <button id="close">x</button>
  <h1 class="city-name">${data.name}</h1>
  <p class="date-time">${data.time}</p>
  <p class="weather-type">${data.weather}</p>
  <h2 class="temperature">${data.temperature}°C</h2>
  <div class="secondary-information">
    <p class="humidity">Wilgotność: ${data.humidity}%</p>
    <p class="pressure">Ciśnienie: ${data.pressure} hPa</p>
  </div>
</li>
`;
    _variables.selectedCitiesList.insertAdjacentHTML("beforeend", html);
};
const firstCapital = function(string) {
    let word = string.split(" ");
    const sentence = word[0].charAt(0).toUpperCase() + string.slice(1);
    // console.log(sentence);
    return sentence;
};
const cityNotFoundMsg = function(message) {
    alert(message);
};

},{"./unixConvertions":"7zFZT","./variables":"bvO1j","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"7zFZT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "unixToNormalTime", ()=>unixToNormalTime
);
parcelHelpers.export(exports, "unixToDate", ()=>unixToDate
);
const unixToNormalTime = function(unixTimestamp) {
    let date = new Date(unixTimestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let formattedTime = hours + " : 00";
    return formattedTime;
};
const unixToDate = function(unixTimestamp) {
    let miliseconds = unixTimestamp * 1000;
    let dateObject = new Date(miliseconds);
    let humanDateFormat = dateObject.toLocaleString();
    return humanDateFormat;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5M63G":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addToLocalStorage", ()=>addToLocalStorage
);
parcelHelpers.export(exports, "getItemFromLocalStorage", ()=>getItemFromLocalStorage
);
parcelHelpers.export(exports, "removeItemFromLocalStorage", ()=>removeItemFromLocalStorage
);
const addToLocalStorage = function(cityName, cityObject) {
    localStorage.setItem(cityName, JSON.stringify(cityObject));
};
const getItemFromLocalStorage = function(cityName) {
    return JSON.parse(localStorage.getItem(cityName));
};
const removeItemFromLocalStorage = function(cityName) {
    localStorage.removeItem(cityName);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"aiXIl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "formHandler", ()=>formHandler
);
parcelHelpers.export(exports, "documentHandler", ()=>documentHandler
);
var _apiCalls = require("./apiCalls");
var _variables = require("./variables");
var _localStorage = require("./localStorage");
const formHandler = function(event) {
    event.preventDefault();
    _apiCalls.getDataForPrint(_apiCalls.getInputValue());
    _variables.containerSearch.classList.add("active");
    _variables.containerSearch.innerHTML = "";
};
const documentHandler = function(event) {
    if (event.target.id === "add-city-button") {
        _apiCalls.getDataForObject(_apiCalls.getInputValue());
        _variables.containerSearch.innerHTML = "";
        _variables.containerSearch.classList.remove("active");
        _variables.inputV.value = "";
    }
    if (event.target.id === "close") {
        const target = event.target;
        const parent = target.parentElement;
        const children = parent.children;
        let text;
        let city;
        for(let i = 0; i < children.length; i++)if (children[i].classList.contains("city-name")) text = children[i].textContent;
        parent.innerHTML = "";
        const objectToClose = _variables.state.cities.find((element)=>element.name == text
        );
        const index = _variables.state.cities.indexOf(objectToClose);
        if (objectToClose) {
            _variables.state.cities.splice(index, 1);
            for(let i = 0; i < localStorage.length; i++)if (objectToClose.name === localStorage.key([
                i
            ])) {
                city = localStorage.key([
                    i
                ]);
                _localStorage.removeItemFromLocalStorage(city);
            }
        // renderSelectedCities(getItemFromLocalStorage(city));
        }
    }
};

},{"./apiCalls":"7M7Y3","./variables":"bvO1j","./localStorage":"5M63G","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ijsRf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createCityObject", ()=>createCityObject
);
parcelHelpers.export(exports, "addToCityArray", ()=>addToCityArray
);
var _rendering = require("./rendering");
var _unixConvertions = require("./unixConvertions");
var _variables = require("./variables");
const createCityObject = function(data) {
    const cityObject = data;
    // console.log(cityObject);
    return {
        name: cityObject.name,
        weather: _rendering.firstCapital(cityObject.weather[0].description),
        time: _unixConvertions.unixToNormalTime(cityObject.dt + cityObject.timezone - 3600),
        temperature: cityObject.main.temp.toFixed(0),
        humidity: cityObject.main.humidity,
        pressure: cityObject.main.pressure
    };
};
const addToCityArray = function(arrayCities, data) {
    let cityObject = createCityObject(data);
    const element1 = arrayCities.find((element)=>element.name === cityObject.name
    );
    if (!element1) {
        arrayCities.push(cityObject);
        addToLocalStorage(cityObject.name, cityObject);
        renderSelectedCities(getItemFromLocalStorage(cityObject.name));
    } else cityNotFoundMsg("You have already selected that city!");
    console.log(arrayCities);
};
const innit = function() {
    for(let i = 0; i < localStorage.length; i++){
        renderSelectedCities(getItemFromLocalStorage(localStorage.key([
            i
        ])));
        _variables.state.cities.push(getItemFromLocalStorage(localStorage.key([
            i
        ])));
    }
};
innit();

},{"./rendering":"l127X","./unixConvertions":"7zFZT","./variables":"bvO1j","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["k9su4","7M7Y3"], "7M7Y3", "parcelRequirebbde")

//# sourceMappingURL=index.ee241a17.js.map
