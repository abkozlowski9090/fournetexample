import detectIt from 'detect-it'
import emergence from 'emergence.js'

export default class SolutionsServicesPanel {
  constructor(el) {
    if(detectIt.hasTouch) {
      document.body.classList.add("has-touch")
      emergence.init({
        reset: true,
        elemCushion: 1,
      })
    }
  }
}
