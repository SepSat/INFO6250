/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLIENT: () => (/* binding */ CLIENT),
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   SERVER: () => (/* binding */ SERVER)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MESSAGE: 'required-message'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network.  Please try again'), SERVER.AUTH_INSUFFICIENT, 'Your username/password combination does not match any records, please try again.'), SERVER.REQUIRED_USERNAME, 'Please enter a valid (letters and/or numbers) username'), SERVER.REQUIRED_MESSAGE, 'Please enter your message'), "default", 'Something went wrong.  Please try again');

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAbilityToLogin: () => (/* binding */ addAbilityToLogin),
/* harmony export */   addAbilityToLogout: () => (/* binding */ addAbilityToLogout),
/* harmony export */   addAbilityToSendMessage: () => (/* binding */ addAbilityToSendMessage)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _polling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./polling */ "./src/polling.js");




function addAbilityToLogin(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('login__form')) {
      return;
    }
    e.preventDefault();
    var username = appEl.querySelector('.login__username').value;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnLogin)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (nameData) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(nameData.username);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      (0,_polling__WEBPACK_IMPORTED_MODULE_3__.startPolling)({
        state: state,
        appEl: appEl
      });
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchGetChats)();
    }).then(function (data) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setchat)(data.chats);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUserList)(data.userList);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToLogout(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('controls__logout')) {
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
    (0,_polling__WEBPACK_IMPORTED_MODULE_3__.stopPolling)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)()["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToSendMessage(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('add__form')) {
      return;
    }
    e.preventDefault();
    var message = appEl.querySelector('.add__message').value;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitSendChat)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchSendChat)(message)["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    }).then(function () {
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchGetChats)();
    }).then(function (data) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUserList)(data.userList);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setchat)(data.chats);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}

/***/ }),

/***/ "./src/polling.js":
/*!************************!*\
  !*** ./src/polling.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startPolling: () => (/* binding */ startPolling),
/* harmony export */   stopPolling: () => (/* binding */ stopPolling)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state */ "./src/state.js");




var updateChat;
function startPolling(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  stopPolling();
  updateChat = setInterval(function () {
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchGetChats)().then(function (data) {
      (0,_state__WEBPACK_IMPORTED_MODULE_3__.setUserList)(data.userList);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderLoggedInList)(state);
      (0,_state__WEBPACK_IMPORTED_MODULE_3__.setchat)(data.chats);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMessages)(state);
    })["catch"](function (err) {
      if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_0__.SERVER.AUTH_MISSING) {
        stopPolling();
        (0,_state__WEBPACK_IMPORTED_MODULE_3__.logout)();
        (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
          state: state,
          appEl: appEl
        });
      } else {
        (0,_state__WEBPACK_IMPORTED_MODULE_3__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
        (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
          state: state,
          appEl: appEl
        });
      }
    });
  }, 5000);
}
function stopPolling() {
  if (updateChat) {
    clearInterval(updateChat);
    updateChat = null;
  }
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   renderLoggedInList: () => (/* binding */ renderLoggedInList),
/* harmony export */   renderMessageInput: () => (/* binding */ renderMessageInput),
/* harmony export */   renderMessages: () => (/* binding */ renderMessages)
/* harmony export */ });
function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n    <main class=\"\">\n        ".concat(loginHtml(state), "\n        ").concat(chatTab(state), "\n    </main>\n    ");
  appEl.innerHTML = html;
  if (state.isLoggedIn) {
    renderMessages(state);
    renderLoggedInList(state);
    renderMessageInput();
  }
}
function renderMessages(state) {
  var messagesEl = document.querySelector(".message__list");
  if (messagesEl) {
    messagesEl.innerHTML = allMessage(state);
  }
}
function renderLoggedInList(state) {
  var userlistEl = document.querySelector(".user__list");
  if (userlistEl) {
    userlistEl.innerHTML = otherUserList(state);
  }
}
function renderMessageInput() {
  var inputEl = document.querySelector(".add__form");
  if (inputEl) {
    inputEl.innerHTML = "\n            <form class=\"add__form\">\n                <input class=\"add__message\" name=\"newword\" type=\"text\" placeholder=\"Only made up of letters\"/>\n                <button class=\"submit__word\" type=\"submit\">Send</button>\n            </form>\n        ";
  }
}

//login html
function loginHtml(state) {
  if (!state.username && !state.error) {
    return "\n            <div class=\"login\"> \n                <h1>Welcome to the chat web!</h1>\n                <p>Please login :-)</p>\n                <div class=\"loginTab\">\n                    ".concat(loginButton(), "\n                </div>\n            </div>\n         ");
  }
  if (!state.username && state.error) {
    return "\n            <div class=\"login\">  \n                <h1>oops..</h1>\n                <p>".concat(state.error, " </p>\n                <p>Please login again ;-)</p>\n                <div class=\"loginTab\">").concat(loginButton(), "</div>\n            </div>\n         ");
  }
  if (state.isLoginPending) {
    return "\n            <div class=\"login__waiting\">Loading ...</div>\n        ";
  }
  if (state.isLoggedIn) {
    return "\n            <div class=\"log-out\"> \n                <h1>Hi!</h1>\n                <p><strong>".concat(state.username, "</strong></p>\n                ").concat(logoutButton(), "\n            </div>\n        ");
  }
}

//after login
function chatTab(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  if (state.isChatPending) {
    return "<div class=\"chat__waiting\">Loading ...</div>\n        ";
  }
  return "\n        <div class=\"chat-page\">\n            <div class=\"user-list\">\n                <p><strong>".concat(state.username, "</strong>(you)</p>\n                <div class=\"user__list\"></div>\n            </div>\n            <div class=\"chat-box\">\n                <h2>message</h2>\n                <div class=\"message__list\"></div>\n                ").concat(wrongMessage(state), "\n                <div class=\"add__form\"></div>\n            </div>\n        </div>\n    ");
}

//login button
function loginButton() {
  return "\n    <form class=\"login__form\" action=\"#login\">\n        <input class=\"login__username\" name=\"username\" type=\"text\" placeholder=\"please type your name\"/>\n        <button class=\"login__button\" type=\"submit\">Login</button>\n    </form>\n    ";
}

//logput button
function logoutButton() {
  return "\n        <button class=\"controls__logout\" type=\"button\">Log Out</button>\n    ";
}

//get user list
function otherUserList(state) {
  if (!state.userlist) {
    return "";
  }
  return "\n        <ul class=\"user__list\">\n            ".concat(state.userlist.map(function (item) {
    return "<li class=\"message-item\">".concat(item, "</li>");
  }).join(''), "\n        </ul>\n  ");
}

//get history message
function allMessage(state) {
  if (!Array.isArray(state.chats) || state.chats.length === 0) {
    return "<p>no message</p>";
  }
  return "\n    <ul class=\"message__list\">\n        ".concat(state.chats.map(function (message) {
    return "\n            <li class=\"message-item\">\n                <div class=\"message-header\">\n                <strong>".concat(message.username, "</strong> <span>").concat(message.timestamp, "</span>\n                </div>\n                <p class=\"message-text\">").concat(message.message, "</p>\n            </li>\n        ");
  }).join(''), "\n    </ul>\n    ");
}

// get error about message
function wrongMessage(state) {
  return state.error ? "<p>".concat(state.error, "</p>") : "";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchGetChats: () => (/* binding */ fetchGetChats),
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchSendChat: () => (/* binding */ fetchSendChat),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession)
/* harmony export */ });
function fetchSession() {
  return fetch('/api/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchGetChats() {
  return fetch('/api/chat', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchSendChat(message) {
  return fetch('/api/chat', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      message: message
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearError: () => (/* binding */ clearError),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setUserList: () => (/* binding */ setUserList),
/* harmony export */   setchat: () => (/* binding */ setchat),
/* harmony export */   waitOnLogin: () => (/* binding */ waitOnLogin),
/* harmony export */   waitSendChat: () => (/* binding */ waitSendChat)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  chats: [],
  isLoggedIn: false,
  isLoginPending: true,
  isChatPending: false,
  username: '',
  userlist: [],
  error: ''
};
function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.chats = {};
  state.error = '';
}
function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.chats = {};
  state.error = '';
}
function waitSendChat() {
  state.chats = {};
  state.isChatPending = true;
  state.error = '';
}
function setchat(chats) {
  state.chats = chats;
  state.isChatPending = false;
}
function setUserList(allUser) {
  state.userlist = allUser.filter(function (item) {
    return item != state.username;
  });
}
function setError(error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.isLoginPending = false;
  state.isChatPending = false;
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
function clearError() {
  state.error = '';
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");
/* harmony import */ var _polling__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./polling */ "./src/polling.js");






var appEl = document.querySelector('#app');
(0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToLogin)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToLogout)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToSendMessage)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
checkForSession();
function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchSession)().then(function (session) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(session.username);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    (0,_polling__WEBPACK_IMPORTED_MODULE_5__.startPolling)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchGetChats)();
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_0__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION
      });
    }
    return Promise.reject(err);
  }).then(function (data) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUserList)(data.userList);
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setchat)(data.chats);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
      (0,_polling__WEBPACK_IMPORTED_MODULE_5__.stopPolling)();
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  });
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map