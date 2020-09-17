import Flickity from 'flickity-fade'
// require('flickity-imagesloaded')

export default class LogoCarousel {
  constructor(el) {
    var flkty = new Flickity( el, {
      cellAlign: 'left',
      pageDots: false,
      wrapAround: true,
      imagesLoaded: true,
      watchCSS: true,
      autoPlay: true,
      prevNextButtons: false,
      autoPlay: 2250,
      pauseAutoPlayOnHover: false
    });


  }
}
