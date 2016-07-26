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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	window.mediaElement = document.getElementById('media');
	window.mediaManager = new cast.receiver.MediaManager(window.mediaElement);
	window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
	let appConfig = new cast.receiver.CastReceiverManager.Config();
	appConfig.statusText = 'TibCast';
	window.castReceiverManager.start(appConfig);
	
	import * as alert from 'alert';
	alert('Foo');
	var customMessageBus = castReceiverManager.getCastMessageBus('urn:x-cast:super.awesome.example');
	customMessageBus.onMessage = function (event) {
	  alert(event);
	};
	
	window.castReceiverManager.onSenderDisconnected = event => {
	  if (window.castReceiverManager.getSenders().length == 0 && event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
	    window.close();
	  }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=app.bundle.js.map