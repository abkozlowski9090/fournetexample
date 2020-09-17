import Flickity from 'flickity-fade'
// require('flickity-imagesloaded')

export default class MediaGalleryCarousel {
  constructor(el) {

    let flkty

    let loadedCount = 0
    let carouselCells = el.getElementsByClassName('carousel-cell')
    let numCarouselCells = carouselCells.length

    if(numCarouselCells > 1) {
      document.addEventListener('lazyloaded', function(e) {
        if(e.srcElement.classList.contains("carousel-cell-image")) {
          loadedCount++
        }

        if(loadedCount == numCarouselCells) {
          flkty = new Flickity( el, {
            pageDots: false,
            wrapAround: true,
            adaptiveHeight: true,
            imagesLoaded: true,
            cellAlign: 'left',
            prevNextButtons: true
          });

        }
      })
    }






  }
}
