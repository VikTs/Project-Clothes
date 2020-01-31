'use strict';

var lis = document.getElementById('images').children;
var width_img = 200;
var carousel = document.getElementById('carousel');
var list = carousel.querySelector('ul');
var listElems = carousel.querySelectorAll('li');
var position = 0;

// Event after clicking on left button of carousel
// If there are no pictures on the left part the button is ignore
carousel.querySelector('.prev').onclick = function() {
  position = Math.min(position + width_img, 0)
  list.style.marginLeft = position + 'px';
  };

// Event after clicking on right button of carousel
// If there are no pictures on the right part the button is ignore
carousel.querySelector('.next').onclick = function() {  
  var width_carousel = document.getElementsByClassName('gallery')[0].offsetWidth; 
  var visible_pictures = parseInt(width_carousel/width_img);
  var width_block = document.getElementById('images').offsetWidth;

  if (width_img * listElems.length + position < width_img*(visible_pictures+2)) {
    position = -width_img * listElems.length + width_carousel;
    list.style.marginLeft = position + 'px';   
  }

  else if(-position + width_img * visible_pictures <= width_img * listElems.length){
    position = position - width_img;
    list.style.marginLeft = position + 'px';
  }
};

// Events after click on pictures in carousel
// If number of image is even the category page is loaded, 
// else - details page
for (var i=0;i<lis.length;i++) {
  if(i%2==0){
    lis[i].children[0].onclick = function() {return location.href = 'category.html';}
  }
  else{
    lis[i].children[0].onclick = function() {return location.href = 'details.html';}
  }
}








