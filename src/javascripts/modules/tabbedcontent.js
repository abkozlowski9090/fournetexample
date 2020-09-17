import Flickity from 'flickity'
// require('flickity-imagesloaded')

export default class TabbedContent {
  constructor(el) {
    let flkty
    let tabbedCarousel = el.getElementsByClassName('js-tab-carousel')[0]

    let loadedCount = 0
    let carouselCells = tabbedCarousel.getElementsByClassName('carousel-cell')
    let numCarouselCells = carouselCells.length

    let tabButtons = el.getElementsByClassName('js-tab-button')

    for(let carouselCell of carouselCells) {
      if(carouselCell.getAttribute("data-slide-type") == "text") {
        loadedCount++
      }
    }


    // Check if every image that contains the class `.carousel-cell-image` has loaded
    // before initializing the flickity carousel...
    // console.log(numCarouselCells);
    console.log("loadedCount = "+loadedCount);
    // If no images
    if(loadedCount == numCarouselCells) {
      console.log("initialiseFlickity");
      initialiseFlickity()
    } else {
      document.addEventListener('lazyloaded', function(e) {
        if(e.srcElement.classList.contains("carousel-cell-image")) {
          loadedCount++
        }
        if(loadedCount == numCarouselCells) {
          initialiseFlickity()
        }
      })

    }


    function initialiseFlickity() {

      flkty = new Flickity( tabbedCarousel, {
        pageDots: false,
        wrapAround: false,
        draggable: false,
        adaptiveHeight: true,
        cellAlign: 'left',
        autoPlay: false,
        prevNextButtons: false,
        pauseAutoPlayOnHover: false
      });

      for(let tabButton of tabButtons) {
        tabButton.addEventListener('click', (e) => {
          e.preventDefault()

          let currButton = e.currentTarget

          for(let tabButton of tabButtons) {
            tabButton.classList.remove('is-active')
          }
          currButton.classList.add('is-active')

          flkty.select( Number(currButton.getAttribute('data-tab-num') - 1 ) )


        })
      }

    }

  }
}
