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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var apiKey = 'AIzaSyA17KYHw-TfsiBy3TdT8hThejNcLjdNnOo';

var Request = function () {
	function Request() {
		_classCallCheck(this, Request);
	}

	_createClass(Request, [{
		key: 'chooseVideosCount',
		value: function chooseVideosCount() {
			if (window.innerWidth > 1250) {
				Request.videosCount = 3;
			} else if (window.innerWidth > 930) {
				Request.videosCount = 2;
			} else {
				Request.videosCount = 1;
			}
		}
	}, {
		key: 'initialization',
		value: function initialization(render, slidePos) {
			Request.counter = 1;
			Request.searchResult = true;
			Request.pageNumber = 0;
			Request.searchText = document.querySelector('#search').value;
			document.querySelector('#search').value = '';
			document.querySelector('#search').setAttribute('placeholder', Request.searchText);
			var url = 'https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&type=video&part=snippet&maxResults=' + Request.videosCount + '&q=' + Request.searchText;
			Request.openXHRRequest(url, false, false, render, slidePos);
		}
	}, {
		key: 'newRequest',
		value: function newRequest() {
			if (Request.searchText && Request.nextPageToken) {
				Request.pageNumber++;
				var url = 'https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&type=video&part=snippet&maxResults=' + Request.videosCount + '&pageToken=' + Request.nextPageToken + '&q=' + Request.searchText;
				Request.openXHRRequest(url);
			}
		}
	}], [{
		key: 'isSearchText',
		value: function isSearchText() {
			return Request.searchResult;
		}
	}, {
		key: 'openXHRRequest',
		value: function openXHRRequest(url, isStatistics, index, render, slidePos) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.send();

			xhr.onreadystatechange = function () {
				if (xhr.readyState == XMLHttpRequest.DONE) {

					var response = JSON.parse(xhr.responseText);
					console.log(response);
					if (isStatistics) {
						for (var i = 0; i < response.items.length; i++) {
							document.querySelectorAll('#viewers')[index + i].innerHTML = response.items[i].statistics.viewCount;
						}
					} else {
						Request.onSearchResponse(response);
					}
					if (render) {
						render.addNewSlide();
					}
				}
			};
		}
	}, {
		key: 'onSearchResponse',
		value: function onSearchResponse(response) {
			// if search result not found show nothing
			if (Request.pageNumber === 0) {
				if (response.items.length !== 0) {
					Request.searchResult = true;
				} else {
					Request.searchResult = false;
					document.querySelector('.wrapper').innerHTML = '';
					document.querySelector('.notFound').style.display = 'block';
				}
			}

			//------------------------------------------- show info about response ----------------------------------
			// document.querySelector('#auth-status').style.opacity = '1';
			// document.querySelector('#auth-status').innerHTML = `Response success. Find about ${response.pageInfo.totalResults}`;
			showInfo('Response success. Find about ' + response.pageInfo.totalResults + ' videos');
			//-------------------------------------------------------------------------------------------------------

			var videoIDs = '';

			var _loop = function _loop(i) {
				var index = response.items.length * Request.pageNumber + i;
				var videoID = response.items[i].id.videoId;
				var switcher = 1;
				videoIDs += videoID;
				if (i !== response.items.length - 1) {
					videoIDs += ',';
				}
				document.querySelectorAll('#title')[index].innerHTML = response.items[i].snippet.title;
				document.querySelectorAll('#title')[index].setAttribute('href', 'http://www.youtube.com/watch?v=' + videoID);
				document.querySelectorAll('#description')[index].innerHTML = response.items[i].snippet.description;
				document.querySelectorAll('#date')[index].innerHTML = response.items[i].snippet.publishedAt.slice(0, 10);
				document.querySelectorAll('#author')[index].innerHTML = response.items[i].snippet.channelTitle;
				document.querySelectorAll('iframe')[index].setAttribute('src', 'https://www.youtube.com/embed/' + videoID);

				// insert here listener for subscribe button
				document.querySelectorAll('.btn-subscr')[index].addEventListener('click', function (e) {
					if (switcher) {
						e.target.innerHTML = 'UNSUBSCR';
						showInfo('You successfully subscribed to channel ' + response.items[i].snippet.channelTitle);
						switcher = 0;
					} else {
						e.target.innerHTML = 'SUBSCRIBE';
						showInfo('You successfully unsubscribed to channel ' + response.items[i].snippet.channelTitle);
						switcher = 1;
					}
				});
				//------------------------------------------
			};

			for (var i = 0; i < response.items.length; i++) {
				_loop(i);
			}
			var url = 'https://www.googleapis.com/youtube/v3/videos?key=' + apiKey + '&id=' + videoIDs + '&part=snippet,statistics';

			//if render first slides send 1 request for video ID's
			if (Request.pageNumber === 0) {
				Request.firstTwoSlidesID = videoIDs;
			} else if (Request.pageNumber === 1) {
				Request.firstTwoSlidesID += ',' + videoIDs;
				url = 'https://www.googleapis.com/youtube/v3/videos?key=' + apiKey + '&id=' + Request.firstTwoSlidesID + '&part=snippet,statistics';
				Request.openXHRRequest(url, true, 0);
			} else {
				Request.openXHRRequest(url, true, response.items.length * Request.pageNumber);
			}

			Request.nextPageToken = response.nextPageToken;
		}
	}]);

	return Request;
}();

// function showInfo(message){
//     document.querySelector('#auth-status').style.opacity = '1';
//     document.querySelector('#auth-status').innerHTML = message;
//     setTimeout(decreaseOpacity, 5000);
// }

// function decreaseOpacity(){
//     document.querySelector('#auth-status').style.opacity = '0';
// }


exports.default = Request;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slide = function () {
	function Slide() {
		_classCallCheck(this, Slide);

		Slide.slidePos = [0];
		Slide.currentPage = 0;
		this.addNew = true;
	}

	_createClass(Slide, [{
		key: 'addListeners',
		value: function addListeners(render) {
			var _this = this;

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
				_this.slideMove(e, false, render);
				e.preventDefault();
			});
			document.querySelector('.videos').addEventListener('touchmove', function (e) {
				_this.slideMove(e, true, render);
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
			// document.querySelector('#pages').addEventListener('mouseover', e => {
			// 	this.activateHoverPage(e, 'active');
			// });

			// document.querySelector('#pages').addEventListener('mouseout', e => {
			// 	this.activateHoverPage(e, '');
			// });

			document.querySelector('#pages').addEventListener('click', function (e) {
				var index = _this.getTargetIndex(e);
				var isFirstClicked = index === 0 && e.target === document.querySelector('#pages li');
				if (index !== 0 || isFirstClicked) {
					var allSlides = document.querySelectorAll('.slide');
					var currentLeft = parseInt(allSlides[index].style.left);
					if (currentLeft !== 0) {
						_this.activatePage(index);
						for (var i = 0; i < allSlides.length; i++) {
							var offset = parseInt(allSlides[i].style.left) - currentLeft;
							Slide.slidePos[i] = offset;
							allSlides[i].style.left = offset + 'px';
						}
					}
					if (index === Slide.slidePos.length - 1) {
						render.addNewSlide();
					}
				}
			});
		}
	}, {
		key: 'slideStart',
		value: function slideStart(e, isTouchEvent) {
			if (this.isTouch) {
				var _allSlides = document.querySelectorAll('.slide');
				for (var i = 0; i < _allSlides.length; i++) {
					_allSlides[i].style.left = Slide.slidePos[i] + 'px';
				}
			}
			Slide.slidePos = [];
			this.isTouch = true;
			if (isTouchEvent) {
				this.pointX = e.changedTouches[0].clientX;
			} else {
				this.pointX = e.pageX;
			}
			this.startX = this.pointX;

			var allSlides = document.querySelectorAll('.slide');
			for (var _i = 0; _i < allSlides.length; _i++) {
				Slide.slidePos.push(parseInt(allSlides[_i].style.left));
			}
		}
	}, {
		key: 'slideMove',
		value: function slideMove(e, isTouchEvent, render) {
			if (isTouchEvent) {
				this.deltaX = e.changedTouches[0].clientX - this.pointX;
				this.pointX = e.changedTouches[0].clientX;
			} else {
				this.deltaX = e.pageX - this.pointX;
				this.pointX = e.pageX;
			}
			if (this.isTouch) {
				if (this.addNew) {
					render.addNewSlide(Slide.slidePos);
					this.addNew = false;
					//-------------------------------- animation --------------------------------
					var index = this.getTargetIndex(e);
					Slide.animateComponent(index); // add animation
					//---------------------------------------------------------------------------
				}
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
						if (parseInt(allSlides[i].style.left) > Slide.slidePos[i]) {
							isMoveFirstSlide = true;
							offset = Slide.slidePos[i] + window.innerWidth;
						} else {
							offset = Slide.slidePos[i] - window.innerWidth;
						}
						if (isMoveFirstSlide && Slide.slidePos[0] === 0) {
							offset -= window.innerWidth;
						}
					}
					allSlides[i].style.left = offset + 'px';
					if (parseInt(allSlides[i].style.left) === 0) {
						this.activatePage(i);
					}
				}
				this.addNewCheck();
			}
		}
	}, {
		key: 'slideEnd',
		value: function slideEnd(e) {
			this.addNewCheck();
			if (this.isTouch) {
				var allSlides = document.querySelectorAll('.slide');
				for (var i = 0; i < allSlides.length; i++) {
					allSlides[i].style.left = Slide.slidePos[i] + 'px';
				}
			}
			this.isTouch = false;
		}
	}, {
		key: 'addNewCheck',
		value: function addNewCheck() {
			if (Slide.slidePos[Slide.slidePos.length - 2] === 0 && this.next) {
				this.addNew = true;
			}
		}
	}, {
		key: 'activatePage',
		value: function activatePage(ind) {
			var activeLi = document.querySelectorAll('.active');
			if (activeLi) {
				for (var i = 0; i < activeLi.length; i++) {
					activeLi[i].classList.remove('active');
				}
			}
			document.querySelectorAll('#pages li')[ind].className = 'active';
			Slide.currentPage = ind;
		}

		// activateHoverPage(e, className) {
		// 	let index = this.getTargetIndex(e);
		// 	let isFirstHovered, isIndex0 = true;
		// 	if (className) {
		// 		isIndex0 = (index !== 0);
		// 		isFirstHovered = (index === 0) && (e.target === document.querySelector('#pages li'));
		// 	}
		// 	if ((index !== Slide.currentPage && isIndex0) || (index !== Slide.currentPage && isFirstHovered)) {
		// 		document.querySelectorAll('#pages li')[index].className = className;
		// 	}
		// }

	}, {
		key: 'getTargetIndex',
		value: function getTargetIndex(e) {
			var target = e.target;
			return Array.prototype.indexOf.call(target.parentNode.childNodes, target);
		}
	}], [{
		key: 'animateComponent',
		value: function animateComponent(index) {
			var componentList = document.querySelectorAll('.component');
			for (var i = 2; i >= 0; i--) {
				Slide.addClass(componentList[index + i], 'animate');
				setTimeout(Slide.removeClass.bind(this, componentList[index + i], 'animate'), 1000);
			}
		}
	}, {
		key: 'addClass',
		value: function addClass(node, cls) {
			node.classList.add(cls);
		}
	}, {
		key: 'removeClass',
		value: function removeClass(node, cls) {
			node.classList.remove(cls);
		}
	}]);

	return Slide;
}();

exports.default = Slide;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = __webpack_require__(0);

var _request2 = _interopRequireDefault(_request);

var _slide = __webpack_require__(1);

var _slide2 = _interopRequireDefault(_slide);

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
      var section = document.createElement('section');
      var hider = document.createElement('div');
      var avatar = document.createElement('img');
      var button = document.createElement('button');
      var statusDiv = document.createElement('div');

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
      var notFound = document.createElement('div');
      var sectionPaging = document.createElement('section');
      var ul = document.createElement('ul');

      //auth section
      section.classList.add('auth-section');
      avatar.classList.add('avatar');
      nick.classList.add('nickname');
      email.classList.add('email');
      hider.appendChild(avatar);
      hider.appendChild(nick);
      hider.appendChild(email);
      hider.style.display = 'none';
      section.appendChild(hider);

      //sign in button    
      button.classList.add('btn');
      button.classList.add('btn-login');
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
      document.body.appendChild(section);
      document.body.appendChild(hr);
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

      notFound.classList.add('notFound');
      notFound.innerHTML = 'Search result is not found!';
      notFound.style.display = 'none';
      document.body.appendChild(notFound);
    }
  }, {
    key: 'renderFirstSlides',
    value: function renderFirstSlides() {
      Render.height = true;
      this.renderSlide(0);
      document.querySelector('#pages li').className = 'active';
    }
  }, {
    key: 'renderSlide',
    value: function renderSlide(index) {
      // let videosSection = document.querySelector('.videos');
      var sectionSlide = document.createElement('section');
      var divComponent = document.createElement('div');
      var componentHeader = document.createElement('div');
      var a = document.createElement('a');
      var iframe = document.createElement('iframe');
      var subscr = document.createElement('button');
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

      iframe.setAttribute('allowfullscreen', '');
      divComponent.appendChild(iframe);

      // subcribe button
      subscr.classList.add('btn');
      subscr.classList.add('btn-subscr');
      subscr.innerHTML = 'SUBSCRIBE';
      divComponent.appendChild(subscr);

      // info below iframe
      ul.setAttribute('id', 'info');
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
      divComponent.appendChild(ul);

      // description text
      pDescription.setAttribute('id', 'description');
      divComponent.appendChild(pDescription);

      for (var _i = 0; _i < _request2.default.videosCount; _i++) {
        sectionSlide.appendChild(divComponent.cloneNode(true));
      }

      document.querySelector('.wrapper').appendChild(sectionSlide);
      page.innerHTML = index + 1;
      document.querySelector('#pages').appendChild(page);
      if (Render.height) {
        document.querySelector('.videos').style.height = document.querySelector('.component').offsetHeight + 120 + 'px';
        Render.height = false;
      }
    }
  }, {
    key: 'addNewSlide',
    value: function addNewSlide() {
      if (_request2.default.isSearchText()) {
        this.renderSlide(_slide2.default.slidePos.length); // render new slide
        var slides = document.querySelectorAll('.slide'); // get all slides
        var left = _slide2.default.slidePos[_slide2.default.slidePos.length - 1] + window.innerWidth; // calculate position to new slide
        slides[slides.length - 1].style.left = left + 'px'; // apply position to new slide
        _slide2.default.slidePos.push(parseInt(slides[slides.length - 1].style.left)); // add new slide pos to all positions
        this.request.newRequest(); // fill slides info
      }
    }
  }]);

  return Render;
}();

exports.default = Render;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
                    showInfo('You are currently signed in and have granted access to this app.');
                } else {
                    document.querySelector('.auth-section div').style.display = 'none';
                    document.querySelector('#sign-in-or-out-button').innerHTML = 'Sign In';
                    document.querySelector('#revoke-access-button').style.display = 'none';
                    showInfo('You have not authorized this app or you are signed out.');
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = __webpack_require__(0);

var _request2 = _interopRequireDefault(_request);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

var _slide = __webpack_require__(1);

var _slide2 = _interopRequireDefault(_slide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Resize = function () {
	function Resize() {
		_classCallCheck(this, Resize);

		Resize.render = new _render2.default();
		window.onresize = function () {
			if (document.querySelector('.wrapper').innerHTML !== '') {
				var videosCount = _request2.default.videosCount;

				if (window.innerWidth > 1250) {
					if (_request2.default.videosCount !== 3) {
						_request2.default.videosCount = 3;
						Resize.rerendering(3, videosCount);
					}
				} else if (window.innerWidth > 930) {
					if (_request2.default.videosCount !== 2) {
						_request2.default.videosCount = 2;
						Resize.rerendering(2, videosCount);
					}
				} else if (window.innerWidth < 930) {
					if (_request2.default.videosCount !== 1) {
						_request2.default.videosCount = 1;
						Resize.rerendering(1, videosCount);
					}
				}

				Resize.changeSlidesPosition();
			}
		};
	}

	_createClass(Resize, null, [{
		key: 'changeSlidesPosition',
		value: function changeSlidesPosition() {
			var width = window.innerWidth;
			var leftPos = -1 * _slide2.default.currentPage * width;
			var slides = document.querySelectorAll('.slide');
			_slide2.default.slidePos = [];

			for (var i = 0; i < slides.length; i++) {
				_slide2.default.slidePos.push(leftPos);
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
			_slide2.default.slidePos = [];
			_request2.default.pageNumber = -1;

			for (var i = 0; i < Math.floor(length); i++) {
				var sectionSlide = document.createElement('section');
				var page = document.createElement('li');

				_request2.default.pageNumber++;
				sectionSlide.className = 'slide';
				sectionSlide.setAttribute('style', 'left:' + offset + 'px');
				_slide2.default.slidePos.push(offset);
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

			var targetIndex = Math.floor(previousCount * _slide2.default.currentPage / count);
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

var _slide = __webpack_require__(1);

var _slide2 = _interopRequireDefault(_slide);

var _request = __webpack_require__(0);

var _request2 = _interopRequireDefault(_request);

var _resize = __webpack_require__(4);

var _resize2 = _interopRequireDefault(_resize);

var _renderGA = __webpack_require__(3);

var _renderGA2 = _interopRequireDefault(_renderGA);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.showInfo = function (message) {
    document.querySelector('#auth-status').style.opacity = '1';
    document.querySelector('#auth-status').innerHTML = message;
    setTimeout(decreaseOpacity, 5000);
};

function decreaseOpacity() {
    document.querySelector('#auth-status').style.opacity = '0';
}

var Main = function () {
    function Main() {
        _classCallCheck(this, Main);

        this.GASection = new _renderGA2.default();
        this.render = new _render2.default();
        this.request = new _request2.default();
        this.slide = new _slide2.default();
        this.resize = new _resize2.default();

        this.render.renderPage();
        this.slide.addListeners(this.render);
    }

    _createClass(Main, [{
        key: 'addSearchListeners',
        value: function addSearchListeners() {
            //--------------------------------------- event listener for 'Enter' key --------------------------------
            document.querySelector('#search').addEventListener('keypress', function (e) {
                if (e.keyCode === 13 && this.value) {
                    _slide2.default.slidePos = [0];
                    main.request.chooseVideosCount();
                    document.querySelector('.notFound').style.display = 'none';
                    document.querySelector('.wrapper').innerHTML = '';
                    document.querySelector('#pages').innerHTML = '';
                    main.render.renderFirstSlides();

                    main.request.initialization(main.render, _slide2.default.slidePos);
                    _slide2.default.currentPage = 0;

                    if (newSearch) {
                        var wrapper = document.querySelector('.wrapper');
                        var pages = document.querySelector('#pages');
                        while (wrapper.firstChild) {
                            wrapper.removeChild(wrapper.firstChild);
                        }while (pages.firstChild) {
                            pages.removeChild(pages.firstChild);
                        }
                    }
                    var newSearch = true;
                } else if (e.keyCode === 13 && !this.value) {
                    showInfo('please enter search keyword');
                }
            });
            //------------------------------------- event listener for SEARCH button -------------------------------
            document.querySelector('.btn-search').addEventListener('click', function (e) {
                if (document.querySelector('#search').value) {
                    _slide2.default.slidePos = [0];
                    main.request.chooseVideosCount();
                    document.querySelector('.notFound').style.display = 'none';
                    document.querySelector('.wrapper').innerHTML = '';
                    document.querySelector('#pages').innerHTML = '';
                    main.render.renderFirstSlides();

                    main.request.initialization(main.render, _slide2.default.slidePos);
                    _slide2.default.currentPage = 0;

                    if (newSearch) {
                        var wrapper = document.querySelector('.wrapper');
                        var pages = document.querySelector('#pages');
                        while (wrapper.firstChild) {
                            wrapper.removeChild(wrapper.firstChild);
                        }while (pages.firstChild) {
                            pages.removeChild(pages.firstChild);
                        }
                    }
                    var newSearch = true;
                } else showInfo('please enter search keyword');
            });
        }
    }]);

    return Main;
}();

var main = new Main();
main.addSearchListeners();
main.GASection.requestOAuth();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map