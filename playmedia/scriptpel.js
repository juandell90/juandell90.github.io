
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

/*-------boton tabs---------*/

$(document).ready(function() { 

	(function ($) { 
		$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
		
		$('.tab ul.tabs li a').click(function (g) { 
			var tab = $(this).closest('.tab'), 
				index = $(this).closest('li').index();
			
			tab.find('ul.tabs > li').removeClass('current');
			$(this).closest('li').addClass('current');
			
			tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
			tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
			
			g.preventDefault();
		} );
	})(jQuery);

});

/*-------boton tabs---------*/
