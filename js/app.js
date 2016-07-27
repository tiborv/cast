import * as alertify from 'alertify.js';
let log = e => alertify.delay(0).log(JSON.stringify(e));
window.player = null;
cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG)
//cast.player.api.setLoggerLevel(cast.player.api.LoggerLevel.DEBUG);

window.mediaElement = document.getElementById('media');
window.mediaManager = new cast.receiver.MediaManager(window.mediaElement);
window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

let appConfig = new cast.receiver.CastReceiverManager.Config();
appConfig.statusText = 'TibCast';
window.castReceiverManager.start(appConfig);

window.mediaManager['origOnLoad'] = window.mediaManager.onLoad;
window.mediaManager.onLoad = function (event) {
  log(event.data);
  var url = event.data['media']['contentId'];
  var host = new cast.player.api.Host({'mediaElement':window.mediaElement, 'url':url});
  //host.updateManifestRequestInfo = log;
  window.player = new cast.player.api.Player(host);
  let protocol = cast.player.api.CreateSmoothStreamingProtocol(host);
  window.player.load(protocol, 0);

}

var customMessageBus = castReceiverManager.getCastMessageBus('urn:x-cast:tibcast');
customMessageBus.onMessage = event => {
  log(event);
}

window.castReceiverManager.onSenderDisconnected = event => {
  if(window.castReceiverManager.getSenders().length == 0 &&
    event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
      window.close();
  }
}
