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
	
	var _alerts = __webpack_require__(1);
	
	var alert = _interopRequireWildcard(_alerts);
	
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	var initialized;
	var container = document.createElement('div');
	
	var alert = function (message, options) {
	  return (new Alert(message, options)).show();
	};
	
	// Config options
	alert.transitionTime = 0;
	alert.containerClassName = 'alerts';
	alert.showClassName = 'alert-show';
	alert.dismissClassName = 'alert-dismiss';
	
	alert.Alert = Alert;
	alert.container = container;
	
	try { module.exports = alert; }
	catch (err) { window.al = alert; }
	
	
	
	function Alert (message, options) {
	  if (!initialized) initialize();
	
	  options = options || {};
	  this.options = options;
	
	  this.message = message || '';
	  this.timeout = options.timeout || false;
	  this.className = options.className || '';
	  this.onshow = options.onshow;
	  this.ondismiss = options.ondismiss;
	}
	
	Alert.prototype.create = function () {
	  var el = this.el = document.createElement('div');
	  var timeout = alert.transitionTime || 0;
	  var optsClassName = this.className;
	  el.className = ['alert', this.className].join(' ');
	  el.innerHTML = this.message;
	  
	  setTimeout(function () { 
	    el.className = ['alert', alert.showClassName, optsClassName].join(' ');
	  }, timeout);
	  container.appendChild(this.el);
	};
	
	Alert.prototype.show = function () {
	  this.create();
	  this.configure();
	
	  if (typeof this.onshow === 'function') this.onshow.call(this.el, this.options);
	  return this;
	};
	
	Alert.prototype.configure = function () {
	  var self = this;
	  var timeout;
	
	  if (this.timeout) {
	    timeout = setTimeout(function () { self.destroy(); }, this.timeout);
	  }
	
	  this.el.addEventListener('click', function (e) {
	    if (timeout) clearTimeout(timeout);
	    self.destroy();
	  }, false);
	};
	
	Alert.prototype.destroy = function () {
	  var el = this.el;
	  var timeout = alert.transitionTime || 0;
	  var self = this;
	
	  el.className = ['alert', alert.dismissClassName, this.className].join(' ');
	  setTimeout(function () { 
	    if (typeof self.ondismiss === 'function') self.ondismiss.call(self);
	    container.removeChild(el);
	  }, timeout);
	};
	
	function initialize () {
	  initialized = true;
	  container.className = alert.containerClassName;
	  document.body.appendChild(container);
	}

/***/ }
/******/ ]);
//# sourceMappingURL=app.bundle.js.map