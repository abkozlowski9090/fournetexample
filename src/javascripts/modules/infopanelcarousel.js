import Flickity from 'flickity-fade'
// require('flickity-imagesloaded')

export default class InfoPanelCarousel {
  constructor(el) {

    let flkty
    let carouselEl = el.getElementsByClassName('js-info-panel-carousel')[0]

    flkty = new Flickity( carouselEl, {
      pageDots: false,
      wrapAround: false,
      watchCSS: true,
      cellAlign: 'left',
      prevNextButtons: true
    });




  }
}
