import * as basicLightbox from 'basiclightbox'
import * as bodyScrollLock from 'body-scroll-lock'

export default class TeamProfile {
  constructor(el) {
    let toggleLightBoxButtons = el.getElementsByClassName('js-toggle-lightbox-button')

    const disableBodyScroll = bodyScrollLock.disableBodyScroll
    const enableBodyScroll = bodyScrollLock.enableBodyScroll
    let targetElement
    targetElement = document.getElementsByClassName("basicLightbox")[0]

    const profileLightBoxInstance = basicLightbox.create(el.getElementsByClassName('js-profile-lightbox')[0], {
      onShow: (instance) => {
        disableBodyScroll(targetElement);
      },
      onClose: (instance) => {
        enableBodyScroll(targetElement);
      }
    })

    for(let toggleLightBoxButton of toggleLightBoxButtons) {

      toggleLightBoxButton.addEventListener('click', (e) => {
        e.preventDefault()

        profileLightBoxInstance.show()

      })

    }

  }
}
