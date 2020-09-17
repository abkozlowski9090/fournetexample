export default class jobs {
  constructor(el) {
    el.addEventListener('click', function() {

      this.classList.toggle("jobs__button--active");

      var readBtn = applyBtn.previousElementSibling;

      var applyBtn = this.previousElementSibling;
      applyBtn.classList.toggle("apply__button--active");

      if (readBtn.innerHTML === "Close") {
        readBtn.innerHTML = "Read More";
      } else {
        readBtn.innerHTML = "Close";
      }

      var panel = this.nextElementSibling;
      panel.classList.toggle("accordion__panel--active");

      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    })
  }
}
// for(var i=0;i<readBtns.length;i++){
//   readBtn = readBtns[i];
//   document.getElementById("read-btn").innerHTML= "Close";
// }
