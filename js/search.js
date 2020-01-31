'use strict';

// Onclick event search
// Show focused input when button is clicked firstly
// Hide input when button is clicked and the are no content in input
// Load page 'category.html' when input contains something
document.getElementById('submit_search').onclick=function(){
var get_input = document.getElementById('search_input');
if(get_input.style.width!=''){
  document.getElementById("search_input").blur();
  if(get_input.value==""){
    showSearch(get_input);
  } else {
    get_input.value="";
    return location.href = 'category.html';
  }
} else {
  document.getElementById("search_input").focus();
  if(window.innerWidth>=768){  
    get_input.style.width='190px';
  } else {
    if(document.getElementById('breadcrumbs')){
      document.getElementById('breadcrumbs').style.marginTop = '220px';
    }
    if(document.getElementById('headline')){
      document.getElementById('headline').style.marginTop = '220px';
    }
    get_input.style.width='calc(91vw - 22px)';
    document.getElementById('search').style.position = 'absolute';
    document.getElementById('search').style.top = '100px';
    document.getElementById('Menu').style.top='150px';
  }
  document.getElementById('submit_search').style.backgroundColor='#606060';
  document.querySelector('#submit_search img').src='img/search_active.gif';
}
};

// Key event of search input
// If 'Enter' was clicked and there are some content in input the page 'category' is load
// If 'Escape' was clicked the input hides
document.getElementById("search_input").addEventListener("keyup", 
  function(event) {
    var search_input = document.getElementById("search_input");
  if (event.keyCode === 13&&search_input.value!="") {
   return location.href = 'category.html';
  }
  else if(event.keyCode === 27){
    document.getElementById("search_input").blur();
    showSearch(search_input);
  }
});


// Show search input after clicking button
function showSearch(get_input){
      get_input.style.width='';
      document.getElementById('search').style.position = 'relative';
      document.getElementById('search').style.top = '0px';
      document.getElementById('submit_search').style.backgroundColor='white';
      document.querySelector('#submit_search img').src='img/search.gif';
      
      if(window.innerWidth<768){  
        document.getElementById('Menu').style.top='100px';
        if(document.getElementById('breadcrumbs')){
          document.getElementById('breadcrumbs').style.marginTop = '165px';
        }
        if(document.getElementById('headline')){
          document.getElementById('headline').style.marginTop = '165px';
        }
      }
}