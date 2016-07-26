window.mediaElement = document.getElementById('media');
window.mediaManager = new cast.receiver.MediaManager(window.mediaElement);
window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
let appConfig = new cast.receiver.CastReceiverManager.Config();
appConfig.statusText = 'TibCast';
window.castReceiverManager.start(appConfig);

import * as alert from 'alerts';

var customMessageBus = castReceiverManager.getCastMessageBus('urn:x-cast:super.awesome.example');
customMessageBus.onMessage = function(event) {
    alert(event);
}

window.castReceiverManager.onSenderDisconnected = event => {
  if(window.castReceiverManager.getSenders().length == 0 &&
    event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
      window.close();
  }
}
alert("Starting...");
