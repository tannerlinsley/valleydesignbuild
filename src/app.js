import $ from 'cash-dom'

// import 'gsap/src/uncompressed/plugins/CSSPlugin.js'
// import 'gsap/src/uncompressed/TimelineLite.js'
// import 'gsap/src/uncompressed/easing/EasePack.js'

import smoothScroll from 'smooth-scroll/src/js/smooth-scroll.js'
import skrollr from 'skrollr'


// SmoothScroll
$('a').each(a => {
  const href = a.href
  let hash = ''
  const hashIndex = a.href.indexOf('#')
  if (hashIndex > -1) {
    hash = href.substring(0, hashIndex).replace(location.origin, '')
    if (hash === window.location.pathname) {
      $(a).attr('data-scroll', true)
    }
  }
})
smoothScroll.init({
  speed: 1000
})

// Skrollr Effects
if ((/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
  // do nothing, this is mobile!
} else {
  skrollr.init({
    forceHeight: false
  })
}

// Page-level logic
window.pages = {
  home
}
window.edit = edit

mobileMenu()






// ########################################################################
//
// ########################################################################


function mobileMenu () {
  const nav = $('nav')
  const menu = $('.show-menu')
  const menuLinks = $('nav a')

  const toggleMenu = () => nav.toggleClass('menu-open')
  menu.on('click', toggleMenu)

  const clickLink = function (e) {
    const self = $(this)
    if (nav.hasClass('menu-open')) {
      nav.removeClass('menu-open')
    }
  }
  menuLinks.on('click', clickLink)
}

function home () {

}

function edit (state) {
  document.body.contentEditable = state !== undefined ? state : !!document.body.contentEditable
}


// ########################################################################
// Utils
// ########################################################################
