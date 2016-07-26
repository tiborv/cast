/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/cast/static/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _alert = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"alert\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var alert = _interopRequireWildcard(_alert);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	window.mediaElement = document.getElementById('media');
	window.mediaManager = new cast.receiver.MediaManager(window.mediaElement);
	window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
	var appConfig = new cast.receiver.CastReceiverManager.Config();
	appConfig.statusText = 'TibCast';
	window.castReceiverManager.start(appConfig);
	
	var customMessageBus = castReceiverManager.getCastMessageBus('urn:x-cast:super.awesome.example');
	customMessageBus.onMessage = function (event) {
	  alert(event);
	};
	
	window.castReceiverManager.onSenderDisconnected = function (event) {
	  if (window.castReceiverManager.getSenders().length == 0 && event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
	    window.close();
	  }
	};
	alert("Starting...");

/***/ }
/******/ ]);
//# sourceMappingURL=app.bundle.js.map