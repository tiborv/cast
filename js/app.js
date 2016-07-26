window.mediaElement = document.getElementById('media');
window.mediaManager = new cast.receiver.MediaManager(window.mediaElement);
window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
let appConfig = new cast.receiver.CastReceiverManager.Config();
appConfig.statusText = 'TibCast';

import * as alertify from 'alertify.js';

window.mediaManager['origOnLoad'] = mediaManager.onLoad;
mediaManager.onLoad = function (event) {
  alertify.log("Loading...");
  window.mediaManager['origOnLoad'](event);
}



var customMessageBus = castReceiverManager.getCastMessageBus('urn:x-cast:super.awesome.example');
customMessageBus.onMessage =event => {
  alertify.log(JSON.stringify(event));
);

}

window.castReceiverManager.start(appConfig);
window.castReceiverManager.onSenderDisconnected = event => {
  if(window.castReceiverManager.getSenders().length == 0 &&
    event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
      window.close();
  }
}
