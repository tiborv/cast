import * as alertify from 'alertify.js';
let log = e => alertify.delay(0).log(JSON.stringify(e));
window.player = null;
cast.player.api.setLoggerLevel(cast.player.api.LoggerLevel.DEBUG);

window.mediaElement = document.getElementById('media');
window.mediaManager = new cast.receiver.MediaManager(window.mediaElement);
window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

let appConfig = new cast.receiver.CastReceiverManager.Config();
appConfig.statusText = 'TibCast';

window.mediaManager['origOnLoad'] = window.mediaManager.onLoad;
window.mediaManager.onLoad = function (event) {
  log(event.data);
  var url = event.data['media']['contentId'];
  var host = new cast.player.api.Host({'mediaElement':window.mediaElement, 'url':url});
  host.updateSegmentRequestInfo = function(requestInfo) {
  // example of setting CORS withCredentials
  requestInfo.withCredentials = true;
  // example of setting headers
  console.log("RUNNING!");
  requestInfo.headers = {};
  requestInfo.headers['content-type'] = 'text/xml;charset=utf-8';
  };
  host.onError = function(errorCode) {
    log("Fatal Error - " + errorCode);
    if (window.player) {
      window.player.unload();
      window.player = null;
    }
  };
  window.player = new cast.player.api.Player(host);
  window.mediaManager['origOnLoad'](event);
}

var customMessageBus = castReceiverManager.getCastMessageBus('urn:x-cast:tibcast');
customMessageBus.onMessage = event => {
  log(event);
}

window.castReceiverManager.start(appConfig);
window.castReceiverManager.onSenderDisconnected = event => {
  if(window.castReceiverManager.getSenders().length == 0 &&
    event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
      window.close();
  }
}
