/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchChangeWord: () => (/* binding */ fetchChangeWord),
/* harmony export */   fetchGetWord: () => (/* binding */ fetchGetWord),
/* harmony export */   fetchLogOut: () => (/* binding */ fetchLogOut),
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession)
/* harmony export */ });
function fetchSession() {
  return fetch('/api/session', {
    method: 'GET',
    credentials: 'include'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
;
function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
;
function fetchLogOut() {
  return fetch('/api/session', {
    method: 'DELETE',
    credentials: 'include'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
;
function fetchGetWord() {
  return fetch('/api/word', {
    method: 'GET',
    credentials: 'include'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
;
function fetchChangeWord(newWord) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: newWord
    }),
    credentials: 'include'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
;

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var state = {
  nowWord: " ",
  nowName: "",
  isError: false,
  nowError: ""
};
state.getErrorStatus = function () {
  return state.isError;
};
state.setNewError = function (error) {
  if (error !== 'auth-missing') {
    state.nowError = error;
    state.isError = true;
  }
};
state.clearError = function () {
  state.nowError = "";
  state.isError = false;
};
state.setName = function (username) {
  state.nowName = username;
};
state.getName = function () {
  return state.nowName;
};
state.getWord = function () {
  return state.nowWord;
};
state.setWord = function (word) {
  state.nowWord = word;
};
state.logout = function () {
  state.nowWord = " ";
  state.nowName = "";
  state.isError = false;
  state.nowError = "";
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function render(state, rootEl) {
  var nowWord = state.nowWord,
    nowName = state.nowName,
    isError = state.isError,
    nowError = state.nowError;
  var errorfeedback = getErrorInfo(nowError);
  var html;
  if (!nowName) {
    if (isError) {
      html = loginAgainPage(errorfeedback);
    } else {
      html = loginPage();
    }
  } else {
    if (isError) {
      html = wrongwordPage(nowName, nowWord, errorfeedback);
    } else {
      html = rightwordPage(nowName, nowWord);
    }
  }
  rootEl.innerHTML = html;
}
function getErrorInfo(newError) {
  if (newError === 'required-username') {
    return "<p>It looks like you enter a invalid username.<p>";
  } else if (newError === 'auth-insufficient') {
    return "<p>It looks like 'dog' is not a valid username.<p>";
  } else if (newError === 'required-word') {
    return "<p>It looks like you forgot to enter a word.<p>";
  } else if (newError === 'invalid-word') {
    return "<p>This word is too long, too short, or contains invalid characters.<p>";
  }
}
function loginPage() {
  var inButton = loginButton();
  return "\n        <p>Please login :-)</p>\n        ".concat(inButton, "\n    ");
}
function rightwordPage(user, word) {
  var wordButton = changeWordButton();
  var loutButton = logoutButton();
  return "\n        <h2>".concat(user, "</h2>\n        ").concat(loutButton, "\n        <p>This is your secret word:</p>\n        <h1>").concat(word, "</h1>\n        ").concat(wordButton, "\n    ");
}
function loginAgainPage(error) {
  var inButton = loginButton();
  return "\n        <p><strong>oops...</strong></p>\n        ".concat(error, "\n        <p>Please login again :-)</p>\n        ").concat(inButton, "\n    ");
}
function wrongwordPage(user, word, error) {
  var wordButton = changeWordButton();
  var loutButton = logoutButton();
  return "\n        <h2>".concat(user, "</h2>\n        ").concat(loutButton, "\n        <p>This is your secret word:</p>\n        <h1>").concat(word, "</h1>\n        <p>").concat(error, "</p>\n        ").concat(wordButton, "\n    ");
}
function loginButton() {
  return "\n    <form class=\"login\">\n        <input class=\"login-input\" name=\"username\" type=\"text\" placeholder=\"Only made up of letters and numbers\"/>\n        <button class=\"login-button\" type=\"submit\">Log In</button>\n    </form>\n    ";
}
function logoutButton() {
  return "\n        <button class=\"logout-button\" type=\"button\">Log Out</button>\n    ";
}
function changeWordButton() {
  return "\n        <form class=\"change-word\">\n            <input class=\"word-input\" name=\"newword\" type=\"text\" placeholder=\"Only made up of letters\"/>\n            <button class=\"submit-word\" type=\"submit\">Update</button>\n        </form>\n    ";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./src/state.js");



var rootEl = document.querySelector('.main');
(0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function (Data) {
  _state__WEBPACK_IMPORTED_MODULE_2__["default"].setName(Data.username);
  return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchGetWord)();
}).then(function (wordData) {
  _state__WEBPACK_IMPORTED_MODULE_2__["default"].setWord(wordData.storedWord);
  (0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_2__["default"], rootEl);
})["catch"](function (err) {
  _state__WEBPACK_IMPORTED_MODULE_2__["default"].setNewError(err.error);
  (0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_2__["default"], rootEl);
});
rootEl.addEventListener('submit', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('login')) {
    var userName = e.target.querySelector('.login-input').value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(userName).then(function () {
      _state__WEBPACK_IMPORTED_MODULE_2__["default"].clearError();
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchGetWord)();
    }).then(function (data) {
      _state__WEBPACK_IMPORTED_MODULE_2__["default"].setName(data.username);
      _state__WEBPACK_IMPORTED_MODULE_2__["default"].setWord(data.storedWord);
      (0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_2__["default"], rootEl);
    })["catch"](function (err) {
      _state__WEBPACK_IMPORTED_MODULE_2__["default"].setNewError(err.error);
      (0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_2__["default"], rootEl);
    });
  }
  if (e.target.classList.contains('change-word')) {
    var newword = e.target.querySelector('.word-input').value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchSession)()["catch"](function (err) {
      _state__WEBPACK_IMPORTED_MODULE_2__["default"].logout();
      (0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_2__["default"], rootEl);
    }).then(function () {
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchChangeWord)(newword);
    }).then(function (data) {
      _state__WEBPACK_IMPORTED_MODULE_2__["default"].clearError();
      _state__WEBPACK_IMPORTED_MODULE_2__["default"].setWord(data.storedWord);
      (0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_2__["default"], rootEl);
    })["catch"](function (err) {
      _state__WEBPACK_IMPORTED_MODULE_2__["default"].setNewError(err.error);
      (0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_2__["default"], rootEl);
    });
  }
});
rootEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('logout-button')) {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogOut)().then(function () {
      _state__WEBPACK_IMPORTED_MODULE_2__["default"].logout();
      (0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_2__["default"], rootEl);
    })["catch"](function (err) {
      _state__WEBPACK_IMPORTED_MODULE_2__["default"].setNewError(err.error);
      (0,_view__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_2__["default"], rootEl);
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map