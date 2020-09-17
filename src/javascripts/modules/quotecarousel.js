import Flickity from 'flickity-fade'
import detectIt from 'detect-it'
// require('flickity-imagesloaded')

export default class QuoteCarousel {
  constructor(el) {

    let carouselCells = el.getElementsByClassName('single-quote')
    let numCarouselCells = carouselCells.length
    let flkty

    if(numCarouselCells > 1) {

      flkty = new Flickity( el, {
        pageDots: false,
        wrapAround: true,
        adaptiveHeight: true,
        imagesLoaded: true,
        cellAlign: 'left',
        prevNextButtons: (detectIt.hasTouch) ? false : true
      });

    }

  }
}
