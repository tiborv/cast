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

let protofunc = mediaInformation => {
  var url = mediaInformation.contentId;
  var type = mediaInformation.contentType || '';
  var path = getPath(url) || '';
  if (getExtension(path) === 'm3u8' ||
          type === 'application/x-mpegurl' ||
          type === 'application/vnd.apple.mpegurl') {
    return cast.player.api.CreateHlsStreamingProtocol;
  } else if (getExtension(path) === 'mpd' ||
          type === 'application/dash+xml') {
    return cast.player.api.CreateDashStreamingProtocol;
  } else if (path.indexOf('.ism') > -1 ||
          type === 'application/vnd.ms-sstr+xml') {
    return cast.player.api.CreateSmoothStreamingProtocol;
  }
  return null;
};

let getExtension = url => {
  var parts = url.split('.');
  // Handle files with no extensions and hidden files with no extension
  if (parts.length === 1 || (parts[0] === '' && parts.length === 2)) {
    return '';
  }
  return parts.pop().toLowerCase();
};

let getPath = url => {
  var href = document.createElement('a');
  href.href = url;
  return href.pathname || '';
};

window.mediaManager['origOnLoad'] = window.mediaManager.onLoad;
window.mediaManager.onLoad = function (event) {
  log(event.data);
  var url = event.data['media']['contentId'];
  //host.updateManifestRequestInfo = log;
  var host = new cast.player.api.Host({'mediaElement':window.mediaElement, 'url':url});
  window.player = new cast.player.api.Player(host);
  let protocol = cast.player.api.CreateSmoothStreamingProtocol(host);
  window.player.load(protofunc(event.data['media']), 0);

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
