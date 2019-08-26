Reproduction of webpack issue:

- Import something invalid from an existing file
- webpack compiles successfully
- There's a runtime error

webpack.config.js:
```
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    foo: './src/foo.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    strictExportPresence: true,
  }
}
```

src/foo.js:
```
// doesn't compile:
// import  {dsfksdfksdjfkj} from './dsfksdjfkdsj';

// compiles:
import  { doesntExist } from './bar';

// fails, but only at runtime
doesntExist();
```
src/bar.js:
```
module.exports = {
  bar: true,
}
```
dist/foo.js:
```
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/foo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bar.js":
/*!********************!*\
  !*** ./src/bar.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  bar: true,\n}\n\n\n//# sourceURL=webpack:///./src/bar.js?");

/***/ }),

/***/ "./src/foo.js":
/*!********************!*\
  !*** ./src/foo.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bar */ \"./src/bar.js\");\n/* harmony import */ var _bar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_bar__WEBPACK_IMPORTED_MODULE_0__);\n// doesn't compile:\n// import  {dsfksdfksdjfkj} from './dsfksdjfkdsj';\n\n// compiles:\n\n\n// fails, but only at runtime\nObject(_bar__WEBPACK_IMPORTED_MODULE_0__[\"doesntExist\"])();\n\n\n//# sourceURL=webpack:///./src/foo.js?");

/***/ })

/******/ });
```

webpack output:
```
Hash: fb894f8fb433e239906b
Version: webpack 4.39.2
Time: 67ms
Built at: 2019-08-26 11:18:32
 Asset      Size  Chunks             Chunk Names
foo.js  4.54 KiB     foo  [emitted]  foo
Entrypoint foo = foo.js
[./src/bar.js] 34 bytes {foo} [built]
[./src/foo.js] 169 bytes {foo} [built]
```
