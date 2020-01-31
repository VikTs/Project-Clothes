'use strict';

// Update the number of orders
window.onload = function()
{
  if(!localStorage.getItem("basket_count")){
    localStorage.setItem("basket_count", 3);
  }
  var basket_count = localStorage.getItem("basket_count");
  document.querySelector('#basket a').innerHTML = "Basket (" + basket_count + ")";
}

// HOME

// Events after clicking on images on home page
// If image contains text the details_additional page is loaded, 
// else - category page
if (document.getElementById('photoes')){
  var photo_blocks = document.getElementById('photoes').children;
  for(var i=0;i<photo_blocks.length;i++) {
    if(photo_blocks[i].children.length==1){
      photo_blocks[i].onclick = function() {return location.href = 'category.html';}
    }
    else {
      photo_blocks[i].onclick = function() {return location.href = 'details_additional.html';}
    }
  }
}

// CATEGORY

// Load 'details.html' after clicking on block in categories
if(document.getElementsByClassName('category_imgs')) {
  var categories = document.getElementsByClassName('categories');
  for(var i=0;i<categories.length;i++) {
    var category_imgs = document.getElementsByClassName('category_imgs')[i].children;
    for(var j=0;j<category_imgs.length;j++){
      category_imgs[j].onclick = function() {return location.href = 'details.html';}
    }
  }
}


// DETAILS

// Event of replacing picture after clicking on miniatures
var choosed_size=-1;
if(document.getElementById('details_photo')){
  var miniatures = document.getElementById('details_photo').children[1].children;
  for(var i=0;i<miniatures.length;i++){
    miniatures[i].addEventListener('click', replacePicture);
  }
}

// Event of choosing size of order
if(document.getElementById('sizes')){
  var sizes = document.getElementById('sizes').children;
  var active = -1;
  
  for(var i=0;i<sizes.length;i++){
    sizes[i].addEventListener('click', chooseSize);
  }
}


// SHOPPING

// Recalculate price and number of orders after load 
if(document.getElementById('subtoral_price')) {
  calculatePrice();
  calculateNumber();
}


// Calculate number of orders and replace it in top right text
function calculateNumber(){
  var orders = document.getElementById('table').children;
  var count_all = 0;
  for(var i=0;i<orders.length;i++){
    var count = parseInt(document.querySelectorAll(".input_count_mobile input")[i].value);
    count_all += count;
  }
  document.querySelector('#basket a').innerHTML = "Basket (" + count_all + ")";
  localStorage.setItem("basket_count",count_all);
}

// Calculate total price and replace it on the bottom text
function calculatePrice(){
  var orders = document.getElementById('table').children;
  var price_all = 0;
  for(var i=0;i<orders.length;i++){
    var price = orders[i].children[orders[i].children.length-1].innerHTML;
    var count = document.querySelectorAll(".input_count_mobile input")[i].value;
    price = price.replace(',', '.');
    price = parseFloat(price.replace(/[^0-9.]+/g,""));
    price_all += price*count;
  }
  price_all = price_all.toFixed(2);
  document.getElementById('Summ').children[0].innerHTML=price_all+'$';
  document.getElementById('subtoral_price').innerHTML=price_all+'$';
}


// Replace button`s background and text
// Increase the amount of orders
// Create new product or increase the count of existing product
function addToCard() {
  if(choosed_size==-1) {
    alert("Choose size");
  } else {
      document.getElementById('add_card').style.backgroundColor = "#009900";
      document.getElementById('add_card').innerHTML = "PRODUCT ADDED";
      var basket_count = localStorage.getItem("basket_count");
      basket_count++;
      document.querySelector('#basket a').innerHTML = "Basket (" + basket_count + ")";
      localStorage.setItem("basket_count",basket_count);
      createNewProduct();
    }
}

// Create array with custom orders
var Orders = new Array();
var orders_custom = 0;
var id_custom = 0;

if(JSON.parse(localStorage.getItem("Orders"))){
  Orders=JSON.parse(localStorage.getItem("Orders"));
  orders_custom=localStorage.getItem("orders_custom");
  id_custom=localStorage.getItem("id_custom");
} 

// Create new order
function createNewProduct() {

  var defaultLen;
  if(JSON.parse(localStorage.getItem("defaultOrders"))){
    var defOrders=JSON.parse(localStorage.getItem("defaultOrders"));
    defaultLen = defOrders.length;
  } else {
    defaultLen = 3;
  }

  var details_info = document.getElementById('details_info');
  var name = details_info.children[0].innerHTML;
  var article = details_info.children[1].innerHTML;
  article = parseInt(article.replace(/[^0-9.]+/g,""));
  var price = details_info.children[2].innerHTML.replace(',', '.');
  price = parseFloat(price.replace(/[^0-9.]+/g,""));
  var size = parseInt(choosed_size);
  var default_color = "White";

  var similar=false;
  if(Orders.length==0) {
  id_custom = parseInt(id_custom);
    Orders[orders_custom]=new Object(); 

    Orders[orders_custom].color=default_color;
    Orders[orders_custom].id=defaultLen+1+id_custom;
    Orders[orders_custom].name=name;
    Orders[orders_custom].article=article;
    Orders[orders_custom].price=price;
    Orders[orders_custom].size=size;
    Orders[orders_custom].count=1;
    alert("Your order '" + name +"' with size " + size + " added to basket!");

    orders_custom++;
    id_custom++;
    localStorage.setItem("orders_custom", orders_custom);
    localStorage.setItem("id_custom", id_custom);
  }

else {
  for(var i=0;i<Orders.length;i++){
    if(name==Orders[i].name&&size==Orders[i].size){
      similar=true;
      Orders[i].count++;      
    } 
  }
  if(similar==false){
      id_custom = parseInt(id_custom);
      Orders[orders_custom]=new Object(); 
      Orders[orders_custom].color=default_color;
      Orders[orders_custom].id=defaultLen+1+id_custom;
      Orders[orders_custom].name=name;
      Orders[orders_custom].article=article;
      Orders[orders_custom].price=price;
      Orders[orders_custom].size=size;
      Orders[orders_custom].count=1;

      orders_custom++;
      id_custom++;
      localStorage.setItem("orders_custom", orders_custom);
      localStorage.setItem("id_custom", id_custom);
      
      alert("Your order '" + name +"' with size " + size + " added to basket!");
    }
  }  
  var Obj = JSON.stringify(Orders);  
  localStorage.setItem("Orders", Obj);    
}

// Delete all orders in localStorage and
// load page with thank
function orderNow() {
  if(JSON.parse(localStorage.getItem("defaultOrders"))){
    defaultOrders.splice(0,defaultOrders.length);
    localStorage.removeItem("defaultOrders");
  } 
  if(JSON.parse(localStorage.getItem("Orders"))){
    Orders.splice(0,Orders.length);
    localStorage.removeItem("Orders");
  }  
  localStorage.setItem("basket_count",0);

  return location.href = 'thank.html';
}

// Choose one size and make its background grey.
// Previously chosed size makes white background
function chooseSize() {
  for(var i=0;i<sizes.length;i++){
    if(sizes[i].getAttribute('style') != null && sizes[i].style.backgroundColor!='white') {
      active = i;
    }
  }
  if(active!=-1){
    sizes[active].style.backgroundColor='white';
  }
  choosed_size=this.innerHTML;
    this.setAttribute("style", "background-color: rgb(229,229,229);");
    document.getElementById('add_card').style.backgroundColor = '#f68236';
    document.getElementById('add_card').innerHTML = 'ADD TO CARD';
  }


// Replace main picture and its description with clicked picture
function replacePicture(){
  var clicked_img = this.src;
  var current_img = document.getElementById('main_pict').src;
  this.src=current_img;
  document.getElementById('main_pict').src=clicked_img;

  var clicked_img_alt = this.alt;
  var current_img_alt = document.getElementById('main_pict').alt;
  this.alt=current_img_alt;
  document.getElementById('main_pict').alt=clicked_img_alt;
}