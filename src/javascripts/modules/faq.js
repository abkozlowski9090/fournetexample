

export default class Faq {
  constructor(el) {
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      if(e.target.nodeName != 'A') {
        this.classList.toggle("accordion__button--active");


        var panel = this.nextElementSibling;
        panel.classList.toggle("accordion__panel--active");

        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    })
  }
}
