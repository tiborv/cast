

import * as alertify from 'alertify.js';

window.mediaElement = document.getElementById('media');
window.mediaManager = new cast.receiver.MediaManager(window.mediaElement);
window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

let appConfig = new cast.receiver.CastReceiverManager.Config();
appConfig.statusText = 'TibCast';


window.mediaManager['origOnLoad'] = mediaManager.onLoad;
mediaManager.onLoad = function (event) {
  alertify.log("Loading...");
  if (window.player !== null) {
    player.unload();    // Must unload before starting again.
    window.player = null;
  }
  if (event.data['media'] && event.data['media']['contentId']) {
    console.log('Starting media application');
    var url = event.data['media']['contentId'];
    window.host = new cast.player.api.Host(
      {'mediaElement':mediaElement, 'url':url});
    var ext = url.substring(url.lastIndexOf('.'), url.length);
    var initStart = event.data['media']['currentTime'] || 0;
    var autoplay = event.data['autoplay'] || true;
    var protocol = null;
    mediaElement.autoplay = autoplay;  // Make sure autoplay get's set
    if (url.lastIndexOf('.m3u8') >= 0) {
// HTTP Live Streaming
      protocol = cast.player.api.CreateHlsStreamingProtocol(host);
    } else if (url.lastIndexOf('.mpd') >= 0) {
// MPEG-DASH
      protocol = cast.player.api.CreateDashStreamingProtocol(host);
    } else if (url.indexOf('.ism/') >= 0) {
// Smooth Streaming
      protocol = cast.player.api.CreateSmoothStreamingProtocol(host);
    }
    host.onError = function(errorCode) {
      console.log("Fatal Error - " + errorCode);
      if (window.player) {
        window.player.unload();
        window.player = null;
      }
    };
// If you need cookies, then set withCredentials = true also set any header
// information you need.  If you don't need them, there can be some unexpected
// effects by setting this value.
//      host.updateSegmentRequestInfo = function(requestInfo) {
//        requestInfo.withCredentials = true;
//      };
    console.log("we have protocol " + ext);
    if (protocol !== null) {
      console.log("Starting Media Player Library");
      window.player = new cast.player.api.Player(host);
      window.player.load(protocol, initStart);
    }
    else {
      window.defaultOnLoad(event);    // do the default process
    }
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
