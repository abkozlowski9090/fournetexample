import Flickity from 'flickity-fade'
// require('flickity-imagesloaded')

export default class TeamCarousel {
  constructor(el) {

    let flkty
    let profileCarouselEl = el.getElementsByClassName('js-team-profile-carousel')[0]

    let loadedCount = 0
    let carouselCells = profileCarouselEl.getElementsByClassName('carousel-cell')
    let numCarouselCells = carouselCells.length

    document.addEventListener('lazyloaded', function(e) {
      if(e.srcElement.classList.contains("carousel-cell-image")) {
        loadedCount++
      }

      if(loadedCount == numCarouselCells) {
        flkty = new Flickity( profileCarouselEl, {
          pageDots: false,
          wrapAround: false,
          imagesLoaded: true,
          cellAlign: 'left',
          prevNextButtons: true
        });

      }
    })




  }
}
