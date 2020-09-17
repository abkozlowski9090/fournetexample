import Flickity from 'flickity-fade'

export default class SectorCarousel {
  constructor(el) {
    let imageCarouselWrapper = el.getElementsByClassName('js-image-carousel')[0]
    let slideTitleButtons = el.getElementsByClassName('js-slide-title')
    let navItems = el.getElementsByClassName('js-nav-item')
    let activeSectionEl

    if(navItems.length > 1) {

      let imageFlickity = new Flickity( imageCarouselWrapper, {
        fade: true,
        pageDots: false,
        wrapAround: false,
        imagesLoaded: true,
        draggable: false,
        cellAlign: 'left',
        prevNextButtons: false,
        autoPlay: ( el.classList.contains('js-hover-only') ) ? false : 8000,
        pauseAutoPlayOnHover: false
      });

      imageFlickity.on( 'change', function( index ) {

        imageFlickity.playPlayer() // start the autoplaying

        activeSectionEl = slideTitleButtons[ index ].parentElement

        for(let navItem of navItems) {
          navItem.classList.remove('is-active')
        }

        if(activeSectionEl) {
          activeSectionEl.classList.add('is-active')
        }
      });

      for(let slideTitleButton of slideTitleButtons) {
        if( !slideTitleButton.classList.contains('js-hover-version') ) {
          slideTitleButton.addEventListener('click', (e) => {
            if( !e.currentTarget.contains('js-direct-link') ) {
              e.preventDefault()
              imageFlickity.stopPlayer() // stop the autoplaying
              imageFlickity.select( e.currentTarget.getAttribute('data-slide-num') )
            }
          })
        } else {
          slideTitleButton.addEventListener('mouseover', (e) => {
            e.preventDefault()
            imageFlickity.stopPlayer() // stop the autoplaying
            imageFlickity.select( e.currentTarget.getAttribute('data-slide-num') )
          })
        }

      }

    }

  }
}
