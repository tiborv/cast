import * as alertify from 'alertify.js';
let log = e => alertify.delay(0).log(JSON.stringify(e));
window.player = null;

window.mediaElement = document.getElementById('media');
window.mediaManager = new cast.receiver.MediaManager(window.mediaElement);
window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

let appConfig = new cast.receiver.CastReceiverManager.Config();
appConfig.statusText = 'TibCast';

window.mediaManager['origOnLoad'] = mediaManager.onLoad;
mediaManager.onLoad = function (event) {
  log(event);
  var url = event.data['media']['contentId'];
  window.host = new cast.player.api.Host({'mediaElement':window.mediaElement, 'url':url});

  window.host.updateSegmentRequestInfo = function(requestInfo) {
    // example of setting CORS withCredentials
    requestInfo.withCredentials = true;
    // example of setting headers
    log(requestInfo.headers);
    log("SWEGOOO")
    requestInfo.headers = {};
    requestInfo.headers['content-type'] = 'text/xml;charset=utf-8';
  };
  host.onError = log;
  let protocol = cast.player.api.CreateHlsStreamingProtocol(host);

  if (protocol !== null) {
      log('lets go');
      window.player = new cast.player.api.Player(host);
      window.player.load(protocol, initStart);
    }else{
      log('no protocol');
      window.mediaManager['origOnLoad'](event);
    }
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
