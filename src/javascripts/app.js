import './modules'
import svgSpriteInjector from 'svg-sprite-injector'
// import detectIt from 'detect-it'
import emergence from 'emergence.js'
import lazySizes from 'lazysizes'
import SmoothScroll from 'smooth-scroll'
import resizer from 'iframe-resizer/js/iframeResizer';

iFrameResize({ log: true }, '.pardotform')

svgSpriteInjector(document.body)

lazySizes.cfg.customMedia = {
    '--small': '(min-width: 0px)',
    '--medium': '(min-width: 750px)',
    '--large': '(min-width: 860px)',
    '--retina': '(min-width: 1400px)',
}

let smoothScroll = new SmoothScroll('[data-scroll]', {
  speed: 500,
  updateURL: false,
  popstate: false,
})


// emergence.init({
//   reset: false,
//   handheld: true
// })


// Detect window has scrolled, add class to header to change state
let scrollState = 0;

let scrollDetect = function(home, down) {
  // Current scroll position
  var currentScroll = scrollTop();
  if (scrollTop() === 0) {
    home();
  } else if (currentScroll > scrollState) {
    down();
  }
  // Set previous scroll position
  scrollState = scrollTop();
};

function downAction() {
  document.body.classList.add("solid-header")
}

function homeAction() {
  document.body.classList.remove("solid-header")
}

var scrollTop = function() {
	return window.scrollY;
};

// if(!detectIt.hasTouch) {
  window.addEventListener("scroll", function() {
    scrollDetect(homeAction, downAction);
  });
// }



// Auto hide header on scroll-down

let scrollTimeout,
		siteHeader = document.getElementsByClassName("site-header")[0],
		dHeight			= 0,
		wHeight			= 0,
		wScrollCurrent	= 0,
		wScrollBefore	= 0,
		wScrollDiff		= 0;

//
window.addEventListener('scroll', function ( event ) {

	if (scrollTimeout) {
		window.cancelAnimationFrame(scrollTimeout);
	}

  // Setup the new requestAnimationFrame()
	scrollTimeout = window.requestAnimationFrame(function () {
		dHeight						= document.body.offsetHeight;
		wHeight						= window.innerHeight;
		wScrollCurrent		= window.pageYOffset;
		wScrollDiff				= wScrollBefore - wScrollCurrent;

		if( wScrollCurrent <= 1 ) {
			siteHeader.classList.remove("is-hidden")
		} else if( wScrollDiff > 0 && siteHeader.classList.contains( "is-hidden" ) ) {
			siteHeader.classList.remove("is-hidden")
		} else if( wScrollDiff < 0 ) {
      if( wScrollCurrent + wHeight >= dHeight && siteHeader.classList.contains( "is-hidden" ) ) // scrolled to the very bottom; element slides in
      	siteHeader.classList.remove("is-hidden")
			else // scrolled down; element slides out
				siteHeader.classList.add("is-hidden")
    }

		wScrollBefore = wScrollCurrent;

	});
});
