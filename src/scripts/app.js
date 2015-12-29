var skrollr = require('skrollr')
var $ = require('jquery')

var scroll = skrollr.init({
  forceHeight: false
})

doVideoBackground()


function doVideoBackground() {
  var video = $('.design video')
  var parent = video.parent()
  var ratio = video.innerWidth() / video.innerHeight()

  video[0].playbackRate = 0.8

  resizeVideo()

  $(window).resize(resizeVideo)

  function resizeVideo() {
    var pwidth = parent.outerWidth()
    var pheight = parent.outerHeight()
    var pratio = pwidth / pheight

    console.log(pratio >= ratio)
    if(pratio >= ratio){
      video.width(pwidth)
      video.height('auto')
      return;
    }
    video.height(pheight)
    video.width('auto')
  }
}
