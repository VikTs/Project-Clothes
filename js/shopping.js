'use strict';

if (!window.localStorage){ 
  alert("localStorage is not support");
}

// Create 3 default orders or get them from localStorage
var defaultOrders;
if(JSON.parse(localStorage.getItem("defaultOrders"))){
  defaultOrders=JSON.parse(localStorage.getItem("defaultOrders"));
  insertNewProduct(defaultOrders,1);
} else {
  defaultOrders = [
    {
      name: "FLORAL PLIMSOLL (1st)",
      article: "Ref. 2514/302",
      color: "Black",
      price: 99.95,
      size: 39,
      count: 1,
      id: 1 
    },
    {
      name: "FLORAL PLIMSOLL (2nd)",
      article: "Ref. 2514/302",
      color: "One Color",
      price: 99.95,
      size: "M",
      count: 1,
      id: 2  
    },
    {
      name: "FLORAL PLIMSOLL (3rd)",
      article: "Ref. 2514/302",
      color: "One Color",
      price: 99.95,
      size: "S",
      count: 1,
      id: 3  
    }
  ];
  var Obj = JSON.stringify(defaultOrders);  
  localStorage.setItem("defaultOrders", Obj);  
  insertNewProduct(defaultOrders,1);
}

// Create array with custom orders
var Orders = new Array();
var orders_custom = 0;
var id_custom = 0;

if(JSON.parse(localStorage.getItem("Orders"))){
  Orders=JSON.parse(localStorage.getItem("Orders"));
  orders_custom=localStorage.getItem("orders_custom");
  id_custom=localStorage.getItem("id_custom");
  insertNewProduct(Orders,defaultOrders.length+1);
} 

// Insert products to shopping bag from localStorage
// afted the page has loaded to desktop and mobile tables
function insertNewProduct(Order,start) {

  var create;
  var basket_picture = "img/shopping_shoes.jpg";

  // create products for desktop table
  for(var i=0;i<Order.length;i++){
    var custom_number = i+start;

    create = document.createElement('tr');
    create.className = "order"+custom_number;
    var children = document.querySelector("tbody").children;
    document.querySelector("tbody").insertBefore(create, children[children.length-1]);

    // create img
    create = document.createElement('td');
    document.getElementsByClassName("order"+custom_number)[0].appendChild(create);
    create = document.createElement('img');
    create.alt="basket_shoes";
    create.src=basket_picture;
    create.width="100";
    create.height="100";
    document.getElementsByClassName("order"+custom_number)[0].children[0].appendChild(create);

    // create name and article
    create = document.createElement('td');
    document.getElementsByClassName("order"+custom_number)[0].appendChild(create);
    create = document.createElement('h3');
    create.innerHTML = Order[i].name;
    document.getElementsByClassName("order"+custom_number)[0].children[1].appendChild(create);
    create = document.createElement('p');
    create.innerHTML = Order[i].article;
    document.getElementsByClassName("order"+custom_number)[0].children[1].appendChild(create);

    // create color
    create = document.createElement('td');
    create.innerHTML = Order[i].color;
    document.getElementsByClassName("order"+custom_number)[0].appendChild(create);

    // create size
    create = document.createElement('td');
    create.innerHTML = Order[i].size;
    document.getElementsByClassName("order"+custom_number)[0].appendChild(create);

    // create input and buttons
    create = document.createElement('td');
    create.className = "input_count";
    document.getElementsByClassName("order"+custom_number)[0].appendChild(create);
    create = document.createElement('input');
    create.id = "shopping_big"+custom_number;
    create.type = "text";
    create.value = Order[i].count;
    create.onkeydown=function(){return false;};
    document.getElementsByClassName("order"+custom_number)[0].children[4].appendChild(create);
    create = document.createElement('button');
    create.className = "up";
    create.innerHTML="&#9650;";
    create.id = "shopping_big_up"+custom_number;
    create.onclick=function(){Count('up', this.id);};
    document.getElementsByClassName("order"+custom_number)[0].children[4].appendChild(create);
    create = document.createElement('button');
    create.className = "down";
    create.innerHTML="&#9660;";
    create.id = "shopping_big_down"+custom_number;
    create.onclick=function(){Count('down', this.id);};
    document.getElementsByClassName("order"+custom_number)[0].children[4].appendChild(create);

    // create price
    create = document.createElement('td');
    create.innerHTML = "&#8364;"+Order[i].price;
    document.getElementsByClassName("order"+custom_number)[0].appendChild(create);

    //create delete button
    create = document.createElement('td');
    document.getElementsByClassName("order"+custom_number)[0].appendChild(create);
    create = document.createElement('button');
    create.innerHTML = "&times;";
    create.id=custom_number;
    create.onclick=function(){deleteOrder(this.id)};
    document.getElementsByClassName("order"+custom_number)[0].children[6].appendChild(create);

  }

  // create products for mobile table
  for(var i=0;i<Order.length;i++){
    var custom_number = i+start;

    var create;
    create = document.createElement('div');
    create.className = "order"+custom_number;
    var children = document.querySelector("#table").children;
    document.querySelector("#table").appendChild(create);

    // create img
    create = document.createElement('img');
    create.alt="basket_shoes";
    create.src=basket_picture;
    create.alt = "";
    create.width="100";
    create.height="100";
    document.getElementsByClassName("order"+custom_number)[0].appendChild(create);

    // create name, article, color, size
    create = document.createElement('div');
    document.getElementsByClassName("order"+custom_number)[0].appendChild(create);
    create = document.createElement('h3');
    create.innerHTML = Order[i].name;
    document.getElementsByClassName("order"+custom_number)[0].children[1].appendChild(create);
    create = document.createElement('p');
    create.innerHTML = Order[i].article;
    document.getElementsByClassName("order"+custom_number)[0].children[1].appendChild(create);
    create = document.createElement('p');
    create.innerHTML = Order[i].color;
    document.getElementsByClassName("order"+custom_number)[0].children[1].appendChild(create);
    create = document.createElement('p');
    create.innerHTML = Order[i].size;
    document.getElementsByClassName("order"+custom_number)[0].children[1].appendChild(create);

    // create input
    create = document.createElement('div');
    create.className = "input_count_mobile";
    document.getElementsByClassName("order"+custom_number)[0].children[1].appendChild(create);
    create = document.createElement('input');
    create.id = "shopping_small"+custom_number;
    create.type = "text";
    create.value = Order[i].count;
    create.onkeydown=function(){return false;};
    document.getElementsByClassName("order"+custom_number)[0].children[1].children[4].appendChild(create);
    create = document.createElement('button');
    create.className = "up_mobile";
    create.innerHTML="&#9650;";
    create.id = "shopping_small_up"+custom_number;
    create.onclick=function(){Count('up', this.id);};    
    document.getElementsByClassName("order"+custom_number)[0].children[1].children[4].appendChild(create);
    create = document.createElement('button');
    create.className = "down_mobile";
    create.id = "shopping_small_down"+custom_number;
    create.innerHTML="&#9660;";
    create.onclick=function(){Count('down', this.id);};
    document.getElementsByClassName("order"+custom_number)[0].children[1].children[4].appendChild(create);

    //create delete button
    create = document.createElement('button');
    create.className = "delete";
    create.innerHTML = "&times;";
    create.id=custom_number;
    create.onclick=function(){deleteOrder(this.id)};
    document.getElementsByClassName("order"+custom_number)[0].appendChild(create);

    // create price
    create = document.createElement('p');
    create.innerHTML = "&#8364;"+Order[i].price;
    document.getElementsByClassName("order"+custom_number)[0].appendChild(create);

  }
} 
var basket_count = localStorage.getItem("basket_count");

// Calculate the count of orders after clicking button 'up' or 'down'
// near the order count in shopping bag
function Count(up_down, id) {

  if (id.indexOf("shopping_small_up") != -1){
    id = id.replace("shopping_small_up","shopping_small")
  }
  else if(id.indexOf("shopping_small_down") != -1){
    id = id.replace("shopping_small_down","shopping_small")
  }
  else if(id.indexOf("shopping_big_down") != -1){
    id = id.replace("shopping_big_down","shopping_big")
  }
  else if(id.indexOf("shopping_big_up") != -1){
    id = id.replace("shopping_big_up","shopping_big")
  }
   
    var step = 1;
    var desktop = "shopping_big";
    var mobile = "shopping_small";
    var version;
    var another_version;
    var number_id = parseInt(id.replace(/[^0-9]+/g,""));
    var new_value;
    var current_number = parseInt(document.querySelector('#'+id).value);

    if (id.indexOf(desktop) != -1){
      version = 'desktop';
      another_version = mobile + number_id;
    }
    else if(id.indexOf(mobile) != -1) {
      version = 'mobile';
      another_version = desktop + number_id;
    }
    
    if(up_down=="up"&&current_number+step<100){
      new_value = current_number+step;
      document.querySelector('#'+id).value=new_value;
      document.querySelector('#'+another_version).value=new_value;
    }  
    else if(up_down=="down"&&current_number>step) {
      new_value = current_number-step;
      document.querySelector('#'+id).value=new_value;
      document.querySelector('#'+another_version).value=new_value;
    }
    else if((up_down=="down"&&current_number<=step)||(up_down=="up"&&current_number+step>=100)) {
      new_value = current_number;
    }

    if(number_id<=defaultOrders.length){
      for(var i=0;i<defaultOrders.length;i++){
        if(defaultOrders[i].id==number_id){
          defaultOrders[i].count=new_value;
          var Obj = JSON.stringify(defaultOrders);  
          localStorage.setItem("defaultOrders", Obj);
        }
      }
    }
    else{
      for(var i=0;i<Orders.length;i++){
        if(Orders[i].id==number_id){
          Orders[i].count=new_value;
          var Obj = JSON.stringify(Orders);  
          localStorage.setItem("Orders", Obj);
        }
      }
    };
    calculatePrice();
    calculateNumber();
}

// Delete order from table and from localStorage
function deleteOrder(id) {

  if(defaultOrders.length==1&&id<=3){
    defaultOrders.splice(0, 1);
    localStorage.removeItem("defaultOrders");
  }

  if(Orders.length==1&&id>3){
    Orders.splice(0, 1);
    localStorage.removeItem("Orders");
  }

  if(id<=defaultOrders.length&&JSON.parse(localStorage.getItem("defaultOrders"))){
      for(var i=0;i<defaultOrders.length;i++){
        if(defaultOrders[i].id==id){
          defaultOrders.splice(i, 1);
          var Obj = JSON.stringify(defaultOrders);  
          localStorage.setItem("defaultOrders", Obj);
        }
      }
    }
    else if(id>defaultOrders.length&&JSON.parse(localStorage.getItem("Orders"))){
      for(var i=0;i<Orders.length;i++){
        if(Orders[i].id==id) {
          Orders.splice(i, 1);
          var Obj = JSON.stringify(Orders);  
          localStorage.setItem("Orders", Obj);
          var orders_custom = localStorage.getItem("orders_custom");
          localStorage.setItem("orders_custom", orders_custom-1);
        }
      }
    };

  var getMobile = document.getElementById('table').children;
  var getDesktop = document.getElementsByTagName('tr');

  var removed = document.getElementsByClassName("order"+id)[0];
  removed.parentNode.removeChild(removed);
  removed = document.getElementsByClassName("order"+id)[0];
  removed.parentNode.removeChild(removed);
  calculatePrice();
  calculateNumber();

  for(var i=0;i<defaultOrders.length;i++){
    defaultOrders[i].id=i+1;
  }
  if(defaultOrders.length>0){
    var Obj = JSON.stringify(defaultOrders);  
    localStorage.setItem("defaultOrders", Obj);
  }

  for(var i=0;i<Orders.length;i++){
    Orders[i].id=i+4;
  }
  if(Orders.length>0){
    var Obj = JSON.stringify(Orders);  
    localStorage.setItem("Orders", Obj);
  }

  if(defaultOrders.length!=0){
    location.reload();
  }
}
