var productList = [];
var cartList = [];
//function add product to cart
var addProductToCart = function (id) {
  var indexProduct = productList.findIndex((item) => {
    return item.id === id;
  });
  var index = cartList.findIndex((item) => {
    return item.id === id;
  });
  if (index === -1) {
    cartList.push(
      new Product(productList[indexProduct].id,productList[indexProduct].name,productList[indexProduct].price,productList[indexProduct].img)
    );
    createCart();
    saveData();
  } else {
    cartList[index].quantity++;
    createCart();
    saveData();
  }
  alert("Add to the cart succesfully");
};
//function delete product
var deleteProductCart = function(id){
  var index = cartList.findIndex((item) => {
    return item.id === id;
  });
  if(cartList.length === 1){
    cartList.splice(index,1);
    saveData();
    refeshCart();
    alert("Delete product successfully ");
    return;
  }
  cartList.splice(index,1);
  createCart();
  saveData();
  alert("Delete product successfully ");
}
//function payment 
var payment = function(){
  cartList.splice(0,cartList.length);
  alert("Payment success")
  saveData()
  refeshCart();
}
//function increase quantity;
var increaseQuantity = function(id){
    for(var i = 0; i < cartList.length; i++){
      if(cartList[i].id === id){
        cartList[i].quantity++
        createCart();
        saveData();
      }
    }
}
//function decrease quantity;
var decreaseQuantity = function(id){
  for(var i = 0; i < cartList.length; i++){
    if(cartList[i].quantity < 1){
      deleteProductCart(id);
      return;
    }
    if(cartList[i].id === id){
      cartList[i].quantity--;
      createCart();
      saveData();
      return;
    }
  }
}
//function refesh cart list
var refeshCart = function(){
  var delete1 = "";
  document.querySelector("#tbodyProduct").innerHTML = delete1;
  document.querySelector("#totalPrices").style.display = "none";

}
//Function : create cart of products
var createCart = function () {
  var content1 = "";
  var totalPrices = 0 ;
    for(var i = 0; i < cartList.length; i++){
      var total = (cartList[i].price) * (cartList[i].quantity);
      content1 += `
            <tr>
              <th style="width: 10%;">${cartList[i].id}</th>
              <th style="width: 20%;"><img style="width:100%" src="${
                cartList[i].img
              }" /></th>
              <th style="width: 20%;">${cartList[i].name}</th>
              <th style="width: 10%;">${cartList[i].price + "$"}</th>
              <th style="width: 20%;">${
                cartList[i].quantity
              }<button class="btn btn-secondary" onclick="decreaseQuantity('${cartList[i].id}')">-</button> <button  class="btn btn-secondary" onclick="increaseQuantity('${cartList[i].id}')">+</button> </th>
              <th style="width: 20%;">${total + "$"}</th>
              <th><button class="btn btn-danger" onclick="deleteProductCart('${cartList[i].id}')">Delete</button></th>
            </tr>
            `;
            totalPrices += total;
    document.querySelector("#tbodyProduct").innerHTML = content1;
    document.querySelector("#totalPrices").style.display = "block";
    document.querySelector("#spanNumber").innerHTML = totalPrices + "$";
    }
  }
//function1 : show the list product
var showListProduct = function (data) {
  if (!data) {
    data = productList;
  }
  var content = "";
  for (var i = 0; i < data.length; i++) {
    content += `<div class="header__product">
    <img src="${data[i].img}" />
    <p>Name: ${data[i].name} </p>
    <p>Type: ${data[i].type} </p>
    <p>Price: ${data[i].price} </p>
    <p>Id: ${data[i].id} </p>
    <p>24 months warranty period</p>
    <button onclick="addProductToCart('${data[i].id}')">Add to cart</button>
  </div>`;
  }
  document.querySelector("#producList").innerHTML = content;
  
};
// function 2 : filter product
var filterProduct = function () {
  var foundProduct = [];
  var keyword = document.getElementById("typePhone").value;
  if (keyword != "all") {
    for (var i = 0; i < productList.length; i++) {
      if (productList[i].type === keyword) {
        foundProduct.push(productList[i]);
      }
    }
    showListProduct(foundProduct);
  } else {
    showListProduct();
  }
};
//take the data on database
var fetchProduct = function () {
   axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "GET",
  })
    .then(function (res) {
      productList = res.data;
      showListProduct();
    })
    .catch(function (err) {
      console.log(err);
    });
};
//function save data in localstorage CartList
var saveData = function(){
  localStorage.setItem("products",JSON.stringify(cartList));
}
var fetchCartList = function(){
  var productCart = localStorage.getItem("products");
  if(productCart){
    cartList = JSON.parse(productCart);
    createCart();
  }
}
fetchCartList();
fetchProduct();




