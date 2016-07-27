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
let swagoo = function(a) {
    a = a.data;
    console.log(this);
    if (a.media && a.media.contentId) {
        var b = void 0 === a.autoplay ? !0 : a.autoplay;
        a.media.tracks ? this.g.load(a.media.contentId, b, a.currentTime, {
            tracks: a.media.tracks,
            activeTrackIds: a.activeTrackIds,
            textTrackStyle: a.media.textTrackStyle
        }) : this.g.load(a.media.contentId, b, a.currentTime)
    }
};

window.mediaManager['origOnLoad'] = window.mediaManager.onLoad;
console.log(JSON.stringify(window.mediaManager['origOnLoad']));
window.mediaManager.onLoad = function (event) {
  //log(event.data);
  var url = event.data['media']['contentId'];
  //host.updateManifestRequestInfo = log;
  var host = new cast.player.api.Host({'mediaElement':window.mediaElement, 'url':url});
  window.player = new cast.player.api.Player(host);
  let protocol = cast.player.api.CreateSmoothStreamingProtocol(host);
  window.player.load(url);

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
