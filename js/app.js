

import * as alertify from 'alertify.js';
let log = e =>alertify.log(JSON.stringify(e));
console.log = log;
window.mediaElement = document.getElementById('media');
window.mediaManager = new cast.receiver.MediaManager(window.mediaElement);
window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

let appConfig = new cast.receiver.CastReceiverManager.Config();
appConfig.statusText = 'TibCast';
cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);
cast.player.api.setLoggerLevel(cast.player.api.LoggerLevel.DEBUG);

window.mediaManager['origOnLoad'] = mediaManager.onLoad;
mediaManager.onLoad = function (event) {
  log("SWAG");
  if (window.player !== null) {
    player.unload();    // Must unload before starting again.
    window.player = null;
  }
  window.mediaManager['origOnLoad'](event);
}


var customMessageBus = castReceiverManager.getCastMessageBus('urn:x-cast:tibcast');
customMessageBus.onMessage = event => {
  alertify.log(JSON.stringify(event));
}

window.castReceiverManager.start(appConfig);
window.castReceiverManager.onSenderDisconnected = event => {
  if(window.castReceiverManager.getSenders().length == 0 &&
    event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
      window.close();
  }
}
