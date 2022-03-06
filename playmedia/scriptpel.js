
 /*-------boton visto---------*/
 var boxes = document.querySelectorAll("input[type='checkbox']"); for (var i = 0; i < boxes.length; i++) {     var box = boxes[i];     if (box.hasAttribute("store")) {         setupBox(box);     } } function setupBox(box) {     var storageId = box.getAttribute("store");     var oldVal    = localStorage.getItem(storageId);     box.checked = oldVal === "true" ? true : false;      box.addEventListener("change", function() {         localStorage.setItem(storageId, this.checked);      }); }
  /*-------boton visto---------*/
  
  
  /*-------boton ver---------*/
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}
/*-------boton ver---------*/