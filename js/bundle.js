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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    isAuthenticate: false,
    apiKey: 'AIzaSyA17KYHw-TfsiBy3TdT8hThejNcLjdNnOo',
    videoCount: 1,
    requestCount: 15,
    pageNumber: 0,
    isRemoved: false,
    slidePos: [0],
    currentPage: 0,
    reset: function reset() {
        this.videoCount = 1;
        this.pageNumber = 0;
        this.isRemoved = false;
    },
    showInfo: function showInfo(message) {
        document.querySelector('#auth-status').style.opacity = '1';
        document.querySelector('#auth-status').innerHTML = message;
        setTimeout(this.decreaseOpacity, 5000);
    },
    decreaseOpacity: function decreaseOpacity() {
        document.querySelector('#auth-status').style.opacity = '0';
    },
    chooseVideosCount: function chooseVideosCount() {
        if (window.innerWidth > 1250) {
            this.videosCount = 3;
        } else if (window.innerWidth > 930) {
            this.videosCount = 2;
        } else {
            this.videosCount = 1;
        }
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.addListenersAfterResponse = addListenersAfterResponse;

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Listeners = function () {
    function Listeners() {
        _classCallCheck(this, Listeners);
    }

    _createClass(Listeners, [{
        key: 'addListeners',
        value: function addListeners(main) {
            var _this = this;

            //--------------------------------------- event listener for 'Enter' key --------------------------------
            document.querySelector('#search').addEventListener('keypress', function (e) {
                if (e.keyCode === 13 && this.value) {
                    document.title = this.value.toUpperCase();
                    _config2.default.slidePos = [0];
                    if (main.newSearch) {
                        _config2.default.reset();
                        var wrapper = document.querySelector('.wrapper');
                        var pages = document.querySelector('#pages');
                        while (wrapper.firstChild) {
                            wrapper.removeChild(wrapper.firstChild);
                        }while (pages.firstChild) {
                            pages.removeChild(pages.firstChild);
                        }
                    }
                    main.newSearch = true;
                    main.render.addNewSlide(true, null, null);
                    main.request.initialization(main);
                    _config2.default.currentPage = 0;
                } else if (e.keyCode === 13 && !this.value) {
                    showInfo('please enter search keyword');
                }
            });
            //------------------------------------- event listener for SEARCH button -------------------------------
            document.querySelector('.btn-search').addEventListener('click', function (e) {
                if (document.querySelector('#search').value) {
                    document.title = document.querySelector('#search').value.toUpperCase();
                    _config2.default.slidePos = [0];
                    if (main.newSearch) {
                        _config2.default.reset();
                        var wrapper = document.querySelector('.wrapper');
                        var pages = document.querySelector('#pages');
                        while (wrapper.firstChild) {
                            wrapper.removeChild(wrapper.firstChild);
                        }while (pages.firstChild) {
                            pages.removeChild(pages.firstChild);
                        }
                    }
                    main.newSearch = true;
                    main.render.addNewSlide(true, null, null);
                    main.request.initialization(main);
                    _config2.default.currentPage = 0;
                } else showInfo('please enter search keyword');
            });

            //authorization button listener
            var clicked = false;
            document.querySelector('.auth-main-container').addEventListener('touchstart', function (e) {
                if (!clicked) {
                    document.querySelector('.auth-main-container').style.marginTop = '0px';
                    clicked = true;
                } else {
                    document.querySelector('.auth-main-container').style.marginTop = '-104px';
                    clicked = false;
                }
            });
            // subscribe listeners


            //slides listeners
            document.querySelector('.videos').addEventListener('mousedown', function (e) {
                _this.slideStart(e);
                e.preventDefault();
            });
            document.querySelector('.videos').addEventListener('touchstart', function (e) {
                _this.slideStart(e, true);
                e.preventDefault();
            });

            document.querySelector('.videos').addEventListener('mousemove', function (e) {
                _this.slideMove(e, false, main.render, main.request);
                e.preventDefault();
            });
            document.querySelector('.videos').addEventListener('touchmove', function (e) {
                _this.slideMove(e, true, main.render, main.request);
                e.preventDefault();
            });

            document.querySelector('.videos').addEventListener('mouseup', function (e) {
                _this.slideEnd(e);
                e.preventDefault();
            });
            document.querySelector('.videos').addEventListener('touchend', function (e) {
                _this.slideEnd(e);
                e.preventDefault();
            });

            // paging listeners
            document.querySelector('#pages').addEventListener('click', function (e) {
                var index = _this.getTargetIndex(e);
                var allSlides = document.querySelectorAll('.slide');
                var currentLeft = parseInt(allSlides[index].style.left);
                if (currentLeft !== 0) {
                    _this.activatePage(index);
                    for (var i = 0; i < allSlides.length; i++) {
                        var offset = parseInt(allSlides[i].style.left) - currentLeft;
                        _config2.default.slidePos[i] = offset;
                        allSlides[i].style.left = offset + 'px';
                    }
                }
                if (index === allSlides.length - 1) {
                    main.render.addNewSlide(null, true, null);
                    main.request.newRequest();
                }
                //}
            });
        }
    }, {
        key: 'slideStart',
        value: function slideStart(e, isTouchEvent) {
            if (this.isTouch) {
                var _allSlides = document.querySelectorAll('.slide');
                for (var i = 0; i < _allSlides.length; i++) {
                    _allSlides[i].style.left = _config2.default.slidePos[i] + 'px';
                }
            }
            this.isTouch = true;
            if (isTouchEvent) {
                this.pointX = e.changedTouches[0].clientX;
            } else {
                this.pointX = e.pageX;
            }
            this.startX = this.pointX;
            var allSlides = document.querySelectorAll('.slide');
            _config2.default.slidePos = [];
            for (var _i = 0; _i < allSlides.length; _i++) {
                _config2.default.slidePos.push(parseInt(allSlides[_i].style.left));
            }
        }
    }, {
        key: 'slideMove',
        value: function slideMove(e, isTouchEvent, render, request) {
            if (isTouchEvent) {
                this.deltaX = e.changedTouches[0].clientX - this.pointX;
                this.pointX = e.changedTouches[0].clientX;
            } else {
                this.deltaX = e.pageX - this.pointX;
                this.pointX = e.pageX;
            }
            if (this.isTouch) {
                var allSlides = document.querySelectorAll('.slide');
                var offset = void 0;
                this.next = false;
                for (var i = 0; i < allSlides.length; i++) {
                    offset = parseInt(allSlides[i].style.left) + this.deltaX;
                    if (this.deltaX < 0) {
                        this.next = true;
                    }
                    var x = void 0;
                    if (isTouchEvent) {
                        x = Math.abs(e.changedTouches[0].clientX - this.startX);
                    } else {
                        x = Math.abs(e.pageX - this.startX);
                    }
                    if (x > window.innerWidth / 3) {
                        this.isTouch = false;
                        var isMoveFirstSlide = false;
                        if (parseInt(allSlides[i].style.left) > _config2.default.slidePos[i]) {
                            isMoveFirstSlide = true;
                            offset = _config2.default.slidePos[i] + window.innerWidth;
                        } else {
                            offset = _config2.default.slidePos[i] - window.innerWidth;
                        }
                        if (isMoveFirstSlide && _config2.default.slidePos[0] === 0) {
                            offset -= window.innerWidth;
                        }
                    }
                    allSlides[i].style.left = offset + 'px';
                    if (parseInt(allSlides[i].style.left) === 0) {
                        this.activatePage(i);
                    }
                }
                if (_config2.default.slidePos[_config2.default.slidePos.length - 2] === 0) {
                    render.addNewSlide(null, true, true);
                    request.newRequest();
                }
            }
        }
    }, {
        key: 'slideEnd',
        value: function slideEnd(e) {
            if (this.isTouch) {
                var allSlides = document.querySelectorAll('.slide');
                for (var i = 0; i < allSlides.length; i++) {
                    allSlides[i].style.left = _config2.default.slidePos[i] + 'px';
                }
            }
            this.isTouch = false;
        }
    }, {
        key: 'activatePage',
        value: function activatePage(index) {
            var activeLi = document.querySelectorAll('.active');
            if (activeLi) {
                for (var i = 0; i < activeLi.length; i++) {
                    activeLi[i].classList.remove('active');
                }
            }
            document.querySelectorAll('#pages li')[index].className = 'active';
            _config2.default.currentPage = index;
        }
    }, {
        key: 'getTargetIndex',
        value: function getTargetIndex(e) {
            var target = e.target;
            return Array.prototype.indexOf.call(target.parentNode.childNodes, target);
        }
    }]);

    return Listeners;
}();

exports.default = Listeners;
function addListenersAfterResponse(response, index, videoID) {
    //play button listener mouse
    document.querySelectorAll('.play')[index].addEventListener('click', function (e) {

        var component = document.querySelectorAll('.component')[index];
        var placeholder = component.children[1];
        var iframe = document.createElement('iframe');
        iframe.setAttribute('width', '350px');
        iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoID + '?autoplay=1');
        iframe.setAttribute('allowfullscreen', '');
        placeholder.parentNode.insertBefore(iframe, placeholder.nextSibling); //appendChild(iframe);
        placeholder.style.display = 'none';
    });

    //play button listener touch
    document.querySelectorAll('.play')[index].addEventListener('touchstart', function (e) {

        var component = document.querySelectorAll('.component')[index];
        var placeholder = component.children[1];
        var iframe = document.createElement('iframe');
        iframe.setAttribute('width', '350px');
        iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoID + '?autoplay=1');
        iframe.setAttribute('allowfullscreen', '');
        placeholder.parentNode.insertBefore(iframe, placeholder.nextSibling); //appendChild(iframe);
        placeholder.style.display = 'none';
    });
    // subscribe button listener mouse
    document.querySelectorAll('.info-container div')[index].addEventListener('click', function (e) {
        if (_config2.default.isAuthenticate) {
            document.head.removeChild(document.querySelector('#api'));

            e.target.classList.add('g-ytsubscribe');
            e.target.setAttribute('data-layout', 'full');
            e.target.setAttribute('data-count', 'default');
            e.target.setAttribute('data-theme', 'dark');

            var script = document.createElement('script');
            script.setAttribute('id', 'api');
            script.setAttribute('src', 'https://apis.google.com/js/platform.js');
            document.head.appendChild(script);
        } else _config2.default.showInfo('Authenticate first please!');
    });

    // subscribe button listener touch
    document.querySelectorAll('.info-container div')[index].addEventListener('touchstart', function (e) {
        if (_config2.default.isAuthenticate) {
            document.head.removeChild(document.querySelector('#api'));

            e.target.classList.add('g-ytsubscribe');
            e.target.setAttribute('data-layout', 'full');
            e.target.setAttribute('data-count', 'default');
            e.target.setAttribute('data-theme', 'dark');

            var script = document.createElement('script');
            script.setAttribute('id', 'api');
            script.setAttribute('src', 'https://apis.google.com/js/platform.js');
            document.head.appendChild(script);
        } else _config2.default.showInfo('Authenticate first please!');
    });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _listeners = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = function () {
    function Request() {
        _classCallCheck(this, Request);
    }

    _createClass(Request, [{
        key: 'initialization',
        value: function initialization() {
            this.searchText = document.querySelector('#search').value;
            document.querySelector('#search').value = '';
            document.querySelector('#search').setAttribute('placeholder', this.searchText);
            var url = 'https://www.googleapis.com/youtube/v3/search?key=' + _config2.default.apiKey + '&type=video&part=snippet&maxResults=' + _config2.default.requestCount + '&q=' + this.searchText;

            Request.openXHRRequest(url).then(function (response) {
                return Request.onSearchResponse(response);
            }, function (error) {
                return alert('Rejected: ' + error);
            });
        }
    }, {
        key: 'newRequest',
        value: function newRequest() {
            _config2.default.pageNumber += Math.round(15 / _config2.default.videosCount);
            var url = 'https://www.googleapis.com/youtube/v3/search?key=' + _config2.default.apiKey + '&type=video&part=snippet&maxResults=' + _config2.default.requestCount + '&pageToken=' + Request.nextPageToken + '&q=' + this.searchText;
            Request.openXHRRequest(url).then(function (response) {
                return Request.onSearchResponse(response);
            }, function (error) {
                return alert('Rejected: ' + error);
            });
        }

        // static addListenerPlay(response, index, videoID) {// in progress
        //     document.querySelectorAll('.play')[index].addEventListener('click', e => {

        //         let component = document.querySelectorAll('.component')[index];
        //         let placeholder = component.children[1];
        //         let iframe = document.createElement('iframe');
        //         iframe.setAttribute('width', '350px');
        //         iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoID + '?autoplay=1');
        //         iframe.setAttribute('allowfullscreen', '');
        //         placeholder.parentNode.insertBefore(iframe, placeholder.nextSibling);//appendChild(iframe);
        //         placeholder.style.display = 'none';

        //     });
        // }

    }], [{
        key: 'openXHRRequest',
        value: function openXHRRequest(url) {

            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);

                xhr.onload = function () {
                    if (this.status >= 200 && this.status <= 300) resolve(this.response);else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };

                xhr.onerror = function () {
                    return reject(new Error("Network Error"));
                };

                xhr.send();
            });
        }
    }, {
        key: 'onSearchResponse',
        value: function onSearchResponse(response) {

            response = JSON.parse(response);
            if (!_config2.default.isRemoved) {
                document.head.removeChild(document.querySelector('#api'));
                _config2.default.isRemoved = true;
            }

            // if search result not found show nothing
            if (!response.items) {
                // Request.searchResult = false;
                var wrapper = document.querySelector('.wrapper');
                var pages = document.querySelector('#pages');
                while (wrapper.firstChild) {
                    wrapper.removeChild(wrapper.firstChild);
                }while (pages.firstChild) {
                    pages.removeChild(pages.firstChild);
                }_config2.default.showInfo('Response failed. Found nothing');
                return;
            }

            //------------------------------------------- show info about response ----------------------------------
            _config2.default.showInfo('Response success. Found about ' + response.pageInfo.totalResults + ' videos');
            //-------------------------------------------------------------------------------------------------------

            var videoIDs = '';
            for (var i = 0; i < response.items.length; i++) {
                var index = _config2.default.videosCount * _config2.default.pageNumber + i;
                var videoID = response.items[i].id.videoId;
                var switcher = 1;
                i !== response.items.length - 1 ? videoIDs += videoID + ',' : videoIDs += videoID;

                document.querySelectorAll('#title')[index].innerHTML = response.items[i].snippet.title;
                document.querySelectorAll('#title')[index].setAttribute('href', 'http://www.youtube.com/watch?v=' + videoID);
                document.querySelectorAll('#description')[index].innerHTML = response.items[i].snippet.description;
                document.querySelectorAll('#date')[index].innerHTML = response.items[i].snippet.publishedAt.slice(0, 10);
                document.querySelectorAll('#author')[index].innerHTML = response.items[i].snippet.channelTitle;
                document.querySelectorAll('.preview')[index].setAttribute('src', response.items[i].snippet.thumbnails.high.url);
                document.querySelectorAll('.info-container div')[index].setAttribute('data-channel', response.items[i].snippet.channelTitle);
                (0, _listeners.addListenersAfterResponse)(response, index, videoID);

                if (_config2.default.isRemoved) {
                    var script = document.createElement('script');
                    script.setAttribute('id', 'api');
                    script.setAttribute('src', 'https://apis.google.com/js/platform.js');
                    document.head.appendChild(script);
                    _config2.default.isRemoved = false;
                }

                index++;
            }

            var url = 'https://www.googleapis.com/youtube/v3/videos?key=' + _config2.default.apiKey + '&id=' + videoIDs + '&part=snippet,statistics';
            Request.openXHRRequest(url).then(function (response) {
                response = JSON.parse(response);
                for (var _i = 0; _i < response.items.length; _i++) {
                    document.querySelectorAll('#viewers')[_config2.default.videosCount * _config2.default.pageNumber + _i].innerHTML = response.items[_i].statistics.viewCount;
                }
            }, function (error) {
                return alert('Rejected: Can\'t load views');
            }); // load viewscount	
            this.nextPageToken = response.nextPageToken;
        }
    }]);

    return Request;
}();

exports.default = Request;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _render = __webpack_require__(5);

var _render2 = _interopRequireDefault(_render);

var _listeners = __webpack_require__(1);

var _listeners2 = _interopRequireDefault(_listeners);

var _request = __webpack_require__(2);

var _request2 = _interopRequireDefault(_request);

var _resize = __webpack_require__(7);

var _resize2 = _interopRequireDefault(_resize);

var _renderGA = __webpack_require__(6);

var _renderGA2 = _interopRequireDefault(_renderGA);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function Main() {
	_classCallCheck(this, Main);

	this.GASection = new _renderGA2.default();
	this.render = new _render2.default();
	this.request = new _request2.default();
	this.listeners = new _listeners2.default();
	this.resize = new _resize2.default();
};

exports.default = Main;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = __webpack_require__(3);

var _main2 = _interopRequireDefault(_main);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_config2.default.chooseVideosCount();
var main = new _main2.default();
main.render.renderPage();
main.listeners.addListeners(main);
main.GASection.requestOAuth();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = __webpack_require__(2);

var _request2 = _interopRequireDefault(_request);

var _listeners = __webpack_require__(1);

var _listeners2 = _interopRequireDefault(_listeners);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Render = function () {
    function Render() {
        _classCallCheck(this, Render);

        this.request = new _request2.default();
    }

    _createClass(Render, [{
        key: 'renderPage',
        value: function renderPage() {

            // let subscr = document.createElement('div');
            // subscr.classList.add('g-ytsubscribe');
            // subscr.classList.add('btn-subscr');
            // subscr.classList.add('test');
            // subscr.setAttribute('data-layout', 'default');
            // subscr.setAttribute('data-count', 'default');
            // subscr.setAttribute('data-channel', 'acdcVEVO');// UCE36kCXex3WfYQQNMu4Si9A
            // document.body.appendChild(subscr);

            var section = document.createElement('section');
            var hider = document.createElement('div');
            var avatar = document.createElement('img');
            var button = document.createElement('button');
            var statusDiv = document.createElement('div');
            var auth = document.createElement('div');
            var authSection = document.createElement('section');
            var p = document.createElement('p');

            var nick = document.createElement('h3');
            var email = document.createElement('p');

            var hr = document.createElement('hr');
            var logoDiv = document.createElement('div');
            var img = document.createElement('img');
            var a = document.createElement('a');
            var input = document.createElement('input');;
            var searchSection = document.createElement('section');
            //let label = document.createElement('label');
            var searchButton = document.createElement('button');

            var i = document.createElement('i');

            var videosSection = document.createElement('section');
            var divWrapper = document.createElement('div');
            // let notFound = document.createElement('div');
            var sectionPaging = document.createElement('section');
            var ul = document.createElement('ul');

            //auth section
            section.classList.add('auth-section');
            avatar.classList.add('avatar');
            nick.classList.add('nickname');
            email.classList.add('email');
            auth.classList.add('auth');
            auth.innerHTML = 'AUTHENTICATION';
            hider.appendChild(avatar);
            hider.appendChild(nick);
            hider.appendChild(email);
            hider.style.display = 'none';
            section.appendChild(hider);
            // auth.appendChild(p);


            //sign in button    
            button.classList.add('btn', 'btn-login');
            button.setAttribute('id', 'sign-in-or-out-button');
            button.innerHTML = 'Sign In';
            section.appendChild(button);
            // revoke button
            button = document.createElement('button');
            button.classList.add('btn');
            button.setAttribute('id', 'revoke-access-button');
            button.innerHTML = 'Revoke access';
            section.appendChild(button);
            // status div
            statusDiv.setAttribute('id', 'auth-status');
            section.appendChild(statusDiv);
            authSection.classList.add('auth-main-container');
            authSection.appendChild(section);
            authSection.appendChild(hr);
            authSection.appendChild(auth);
            document.body.appendChild(authSection);

            // search section
            searchSection.classList.add('search-section');

            //i.classList.add('fa', 'fa-search');
            //label.appendChild(i);
            searchButton.classList.add('btn');
            searchButton.classList.add('btn-search');
            searchButton.innerHTML = 'SEARCH';
            // input.setAttribute('type', 'text');
            input.setAttribute('id', 'search');
            input.setAttribute('autofocus', '');
            // create logo
            img.classList.add('logo-image');
            img.setAttribute('src', './img/logo.png');
            logoDiv.classList.add('logo');
            a.setAttribute('href', 'https://www.youtube.com/');
            a.appendChild(img);
            logoDiv.appendChild(a);
            searchSection.appendChild(logoDiv);
            searchSection.appendChild(searchButton); // here label
            searchSection.appendChild(input);
            document.body.appendChild(searchSection);

            videosSection.classList.add('videos');
            divWrapper.classList.add('wrapper');
            videosSection.appendChild(divWrapper);
            document.body.appendChild(videosSection);

            sectionPaging.classList.add('paging');
            ul.setAttribute('id', 'pages');
            sectionPaging.appendChild(ul);
            document.body.appendChild(sectionPaging);

            // notFound.classList.add('notFound');
            // notFound.innerHTML = 'Search result is not found!';
            // notFound.style.display = 'none';
            // document.body.appendChild(notFound);
        }
    }, {
        key: 'renderSlide',
        value: function renderSlide(index, main) {
            var sectionSlide = document.createElement('section');
            var divComponent = document.createElement('div');
            var componentHeader = document.createElement('div');
            var previewPlaceholder = document.createElement('div');

            var infoContainer = document.createElement('div');
            // let overSubscr = document.createElement('button');

            var a = document.createElement('a');
            // let iframe = document.createElement('iframe');
            var preview = document.createElement('img');

            // let subscr = document.createElement('button');

            var subscr = document.createElement('div');

            var ul = document.createElement('ul');
            var li = document.createElement('li');
            var p = document.createElement('p');
            var i = document.createElement('i');
            var pDescription = document.createElement('p');
            var page = document.createElement('li');

            sectionSlide.classList.add('slide');
            sectionSlide.style.left = '0px'; //default position

            divComponent.classList.add('component');

            //name of video on top of slide
            a.setAttribute('id', 'title');
            a.classList.add('title');
            componentHeader.classList.add('componentHeader');
            componentHeader.appendChild(a);
            divComponent.appendChild(componentHeader);

            // iframe.classList.add('video-frame');
            // iframe.setAttribute('allowfullscreen','');
            preview.classList.add('preview');
            i.classList.add('play', 'fa', 'fa-youtube-play');
            previewPlaceholder.classList.add('placeholder');
            previewPlaceholder.appendChild(preview);
            previewPlaceholder.appendChild(i);
            divComponent.appendChild(previewPlaceholder);

            // subcribe "button"
            // subscr.classList.add('btn');
            // subscr.classList.add('btn-subscr');
            // subscr.innerHTML = 'SUBSCRIBE';
            // infoContainer.appendChild(subscr);

            infoContainer.classList.add('info-container');

            // overSubscr.classList.add('over-subscribe');
            subscr.innerHTML = 'SUBSCRIBE';
            // subscr.classList.add('g-ytsubscribe'/*, 'btn-subscr'*/);
            // subscr.setAttribute('data-layout', 'full');
            // subscr.setAttribute('data-count', 'default');
            // subscr.setAttribute('data-theme', 'dark');
            infoContainer.appendChild(subscr);
            // infoContainer.appendChild(overSubscr);

            // info below iframe
            ul.setAttribute('id', 'info');
            i = document.createElement('i');
            i.classList.add('fa', 'fa-user');
            p.setAttribute('id', 'author');
            li.appendChild(i);
            li.appendChild(p);
            ul.appendChild(li);

            li = document.createElement('li');
            i = document.createElement('i');
            i.classList.add('fa', 'fa-calendar');
            p = document.createElement('p');
            p.setAttribute('id', 'date');
            li.appendChild(i);
            li.appendChild(p);
            ul.appendChild(li);

            li = document.createElement('li');
            i = document.createElement('i');
            i.classList.add('fa', 'fa-eye');
            p = document.createElement('p');
            p.setAttribute('id', 'viewers');
            li.appendChild(i);
            li.appendChild(p);
            ul.appendChild(li);
            infoContainer.appendChild(ul);

            // description text
            pDescription.setAttribute('id', 'description');
            infoContainer.appendChild(pDescription);
            divComponent.appendChild(infoContainer);

            for (var _i = 0; _i < _config2.default.videosCount; _i++) {
                sectionSlide.appendChild(divComponent.cloneNode(true));
            }

            document.querySelector('.wrapper').appendChild(sectionSlide);
            page.innerHTML = index;
            document.querySelector('#pages').appendChild(page);
        }
    }, {
        key: 'addNewSlide',
        value: function addNewSlide(first, nextToken, fromSlide) {
            var count = Math.round(15 / _config2.default.videosCount);
            for (var i = 0; i < count; i++) {
                var slides = document.querySelectorAll('.slide');
                this.renderSlide(slides.length + 1); // render new slide
                slides = document.querySelectorAll('.slide');
                if (first) document.querySelector('#pages li').className = 'active';else {
                    var parse = parseInt(slides[slides.length - 2].style.left);
                    var left = parse /*Int(slides[slides.length-1].style.left)*/ + window.innerWidth; // calculate position to new slide
                    if (nextToken) {
                        if (fromSlide) {
                            left = window.innerWidth * 2;
                            fromSlide = false;
                        } else left = window.innerWidth;
                        nextToken = false;
                    }
                    slides[slides.length - 1].style.left = left + 'px'; // apply position to new slide
                }
                _config2.default.slidePos.push(parseInt(slides[slides.length - 1].style.left)); // add new slide pos to all positions
                first = false;
            }
        }
    }]);

    return Render;
}();

exports.default = Render;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GASection = function () {
    function GASection() {
        _classCallCheck(this, GASection);
    }

    _createClass(GASection, [{
        key: 'requestOAuth',
        value: function requestOAuth() {
            var GoogleAuth = void 0;
            var SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl';
            function handleClientLoad() {
                // Load the API's client and auth2 modules.
                // Call the initClient function after the modules load.
                gapi.load('client:auth2', initClient);
            }

            function initClient() {
                // Retrieve the discovery document for version 3 of YouTube Data API.
                // In practice, your app can retrieve one or more discovery documents.
                var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

                // Initialize the gapi.client object, which app uses to make API requests.
                // Get API key and client ID from API Console.
                // 'scope' field specifies space-delimited list of access scopes.
                gapi.client.init({
                    'apiKey': 'AIzaSyA17KYHw-TfsiBy3TdT8hThejNcLjdNnOo',
                    'discoveryDocs': [discoveryUrl],
                    'clientId': '556623487116-evicb9k95c2fdspip898br18n6ugh8qn.apps.googleusercontent.com',
                    'scope': SCOPE
                }).then(function () {
                    GoogleAuth = gapi.auth2.getAuthInstance();

                    // Listen for sign-in state changes.
                    GoogleAuth.isSignedIn.listen(updateSigninStatus);

                    // Handle initial sign-in state. (Determine if user is already signed in.)
                    var user = GoogleAuth.currentUser.get();
                    setSigninStatus();

                    // Call handleAuthClick function when user clicks on
                    //      "Sign In/Authorize" button.

                    document.querySelector('#sign-in-or-out-button').addEventListener('click', function (e) {
                        handleAuthClick();
                    });
                    document.querySelector('#revoke-access-button').addEventListener('click', function (e) {
                        revokeAccess();
                    });
                    // $('#sign-in-or-out-button').click(function() {
                    // }); 
                    // $('#revoke-access-button').click(function() {
                    // }); 
                });
            }

            function handleAuthClick() {
                if (GoogleAuth.isSignedIn.get()) {
                    // User is authorized and has clicked 'Sign out' button.
                    GoogleAuth.signOut();
                } else {
                    // User is not signed in. Start Google auth flow.
                    GoogleAuth.signIn();
                }
            }

            function revokeAccess() {
                GoogleAuth.disconnect();
            }

            function setSigninStatus(isSignedIn) {
                var user = GoogleAuth.currentUser.get();
                var isAuthorized = user.hasGrantedScopes(SCOPE);
                if (isAuthorized) {
                    GASection.setInfo(user); // fill info user panel...
                    document.querySelector('.auth-section div').style.display = 'block';
                    document.querySelector('#sign-in-or-out-button').innerHTML = 'Sign out';
                    document.querySelector('#revoke-access-button').style.display = 'inline-block';
                    _config2.default.showInfo('You are currently signed in and have granted access to this app.');
                    _config2.default.isAuthenticate = true; // this need for subscribe button 
                } else {
                    document.querySelector('.auth-section div').style.display = 'none';
                    document.querySelector('#sign-in-or-out-button').innerHTML = 'Sign In';
                    document.querySelector('#revoke-access-button').style.display = 'none';
                    _config2.default.showInfo('You have not authorized this app or you are signed out.');
                    _config2.default.isAuthenticate = false; // this need for subscribe button 
                }
            }

            function updateSigninStatus(isSignedIn) {
                setSigninStatus();
            }

            handleClientLoad(); // add listener to sign in button
        }
    }], [{
        key: 'setInfo',
        value: function setInfo(responce) {
            //console.log(responce);
            document.querySelector('.avatar').setAttribute('src', responce.w3.Paa);
            document.querySelector('.nickname').innerHTML = responce.w3.ig;
            document.querySelector('.email').innerHTML = responce.w3.U3;
        }
    }]);

    return GASection;
}();

exports.default = GASection;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import Request from './request';
// import Render from './render';
// import Listeners from './listeners';


var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Resize = function () {
	function Resize() {
		_classCallCheck(this, Resize);

		window.onresize = function () {
			// if (document.querySelector('.wrapper').innerHTML !== '') {

			if (window.innerWidth > 1250) {
				if (_config2.default.videosCount !== 3 && document.querySelector('.wrapper').innerHTML !== '') {
					_config2.default.videosCount = 3;
					Resize.rerendering(3, _config2.default.videosCount);
				}
				document.querySelector('.logo').style.display = 'block';
			} else if (window.innerWidth > 930) {
				if (_config2.default.videosCount !== 2 && document.querySelector('.wrapper').innerHTML !== '') {
					_config2.default.videosCount = 2;
					Resize.rerendering(2, _config2.default.videosCount);
				}
				document.querySelector('.logo').style.display = 'block';
			} else if (window.innerWidth < 930) {
				if (_config2.default.videosCount !== 1 && document.querySelector('.wrapper').innerHTML !== '') {
					_config2.default.videosCount = 1;
					Resize.rerendering(1, _config2.default.videosCount);
				}
				document.querySelector('.logo').style.display = 'none';
			}

			Resize.changeSlidesPosition();
			// }
		};
	}

	_createClass(Resize, null, [{
		key: 'changeSlidesPosition',
		value: function changeSlidesPosition() {
			var width = window.innerWidth;
			var leftPos = -1 * _config2.default.currentPage * width;
			var slides = document.querySelectorAll('.slide');
			_config2.default.slidePos = [];

			for (var i = 0; i < slides.length; i++) {
				_config2.default.slidePos.push(leftPos);
				slides[i].style.left = leftPos + 'px';
				leftPos += width;
			}
		}
	}, {
		key: 'rerendering',
		value: function rerendering(count, previousCount) {
			var components = Array.from(document.querySelectorAll('.component'));
			var docFragment = document.createDocumentFragment();
			var offset = 0;
			var length = components.length / count;

			components.reverse();
			document.querySelector('.wrapper').innerHTML = '';
			document.querySelector('#pages').innerHTML = '';
			_config2.default.slidePos = [];
			_config2.default.pageNumber = -1;

			for (var i = 0; i < Math.floor(length); i++) {
				var sectionSlide = document.createElement('section');
				var page = document.createElement('li');

				_config2.default.pageNumber++;
				sectionSlide.className = 'slide';
				sectionSlide.setAttribute('style', 'left:' + offset + 'px');
				_config2.default.slidePos.push(offset);
				for (var j = 0; j < count; j++) {
					if (components.length) {
						sectionSlide.appendChild(components[components.length - 1]);
						components.pop();
					}
				}
				offset += window.innerWidth;
				docFragment.appendChild(sectionSlide);

				page.innerHTML = i + 1;
				document.querySelector('#pages').appendChild(page);
			}

			document.querySelector('.wrapper').appendChild(docFragment);

			var targetIndex = Math.floor(previousCount * _config2.default.currentPage / count);
			document.querySelectorAll('#pages li')[targetIndex].click();
			if (!targetIndex) {
				setTimeout(function () {
					document.querySelectorAll('#pages li')[targetIndex].click();
				}, 0);
				document.querySelector('#pages li').className = 'active';
			}
		}
	}]);

	return Resize;
}();

exports.default = Resize;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map