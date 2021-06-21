var productList = [];

//function add the product
var addNewProduct = function () {
  var id = document.querySelector("#inputId").value;
  var img = document.querySelector("#inputImage").value;
  var type = document.querySelector("#inputType").value;
  var name = document.querySelector("#inputProduct").value;
  var price = document.querySelector("#inputPrices").value;
  var screen = document.querySelector("#inputScreen").value;
  var backScreen = document.querySelector("#inputBack").value;
  var frontScreen = document.querySelector("#inputFront").value;
  var desc = document.querySelector("#inputDesc").value;

  if (!validateForm()) {
    return;
  }
  var newProduct = new Product(
    id,
    name,
    price,
    img,
    screen,
    backScreen,
    frontScreen,
    desc,
    type
  );
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "POST",
    data: newProduct,
  })
    .then(function (res) {
      fetchProduct();
      alert("Add new product success");
    })
    .catch(function (err) {
      console.log(err);
    });
};
var validateForm = function () {
  var id = document.querySelector("#inputId").value;
  var img = document.querySelector("#inputImage").value;
  var type = document.querySelector("#inputType").value;
  var name = document.querySelector("#inputProduct").value;
  var price = document.querySelector("#inputPrices").value;
  var screen = document.querySelector("#inputScreen").value;
  var backScreen = document.querySelector("#inputBack").value;
  var frontScreen = document.querySelector("#inputFront").value;
  var desc = document.querySelector("#inputDesc").value;
  var isValid = true;
  isValid &= checkRequired(id, "#idError") && checkLength(id, "#idError", 2, 4);
  isValid &= checkRequired(img,"#imgError");
  isValid &= checkRequired(name,"#nameError");
  isValid &= checkRequired(price,"#priceError") && checkNumber(price, "#priceError");
  isValid &= checkRequired(screen,"#srceenError");
  isValid &= checkRequired(backScreen,"#backError");
  isValid &= checkRequired(frontScreen,"#frontError");
  isValid &= checkRequired(desc,"#descError");
  return isValid;
};
//function edit data product
var getProductToUpdate = function (id) {
  axios({
    url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
    method: "GET",
    params: {
      id: id,
    },
  })
    .then(function (res) {
      document.querySelector("#inputId").value = res.data.id;
      document.querySelector("#inputImage").value = res.data.img;
      document.querySelector("#inputType").value = res.data.type;
      document.querySelector("#inputProduct").value = res.data.name;
      document.querySelector("#inputPrices").value = res.data.price;
      document.querySelector("#inputScreen").value = res.data.screen;
      document.querySelector("#inputBack").value = res.data.backCamera;
      document.querySelector("#inputFront").value = res.data.frontCamera;
      document.querySelector("#inputDesc").value = res.data.desc;

      document.querySelector("#inputId").setAttribute("disabled", true);
      document.querySelector("#btn-add").style.display = "none";
      document.querySelector("#btn-update").style.display = "block";
    })
    .catch(function (err) {
      console.log(err);
    });
};
var updateProduct = function () {
  var id = document.querySelector("#inputId").value;
  var img = document.querySelector("#inputImage").value;
  var type = document.querySelector("#inputType").value;
  var name = document.querySelector("#inputProduct").value;
  var price = +document.querySelector("#inputPrices").value;
  var screen = document.querySelector("#inputScreen").value;
  var backScreen = document.querySelector("#inputBack").value;
  var frontScreen = document.querySelector("#inputFront").value;
  var desc = document.querySelector("#inputDesc").value;
  
  if (!validateForm()) {
    return;
  }
  var updateProduct = new Product(
    id,
    name,
    price,
    img,
    screen,
    backScreen,
    frontScreen,
    desc,
    type
  );
  axios({
    url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
    method: "PUT",
    params: {
      id: id,
    },
    data: updateProduct,
  })
    .then(function (res) {
      fetchProduct();
      alert("Update product success");
      document.querySelector("#btnReset").click();
      document.querySelector("#btn-add").style.display = "block";
      document.querySelector("#btn-update").style.display = "none";
      document.querySelector("#inputId").removeAttribute("disabled");
    })
    .catch(function (err) {
      console.log(err);
    });
};
//function delete product
var deleteProduce = function (id) {
  axios({
    url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
    method: "DELETE",
    params: {
      id: id,
    },
  })
    .then(function (res) {
      fetchProduct();
      alert("Delete product success");
    })
    .catch(function (err) {
      console.log(err);
    });
};
//function show product
var showListProduct = function (data) {
  if (!data) {
    data = productList;
  }
  var content1 = "";
  for (var i = 0; i < data.length; i++) {
    content1 += `
              <tr>
                <th style="width: 10%;">${data[i].id}</th>
                <th style="width: 20%;"><img style="width:100%" src="${
                  data[i].img
                }" /></th>
                <th style="width: 20%;">${data[i].type}</th>
                <th style="width: 10%;">${data[i].name}</th>
                <th style="width: 20%;">${data[i].price + "$"} </th>
                <th style="width: 20%;">${data[i].screen}</th>
                <th style="width: 20%;">${data[i].backCamera}</th>
                <th style="width: 20%;">${data[i].frontCamera}</th>
                <th style="width: 20%;">${data[i].desc}</th>
                <th>
                <button  style = "width:100%" class="btn btn-danger" onclick="deleteProduce('${
                  data[i].id
                }')">Delete</button> 
                <a href="#editInput"><button class="btn btn-primary" style = "width:100%" onclick="getProductToUpdate('${
                  data[i].id
                }')">Edit </button></a>
                </th>
              </tr>
              `;
    document.querySelector("#tbodyProduct").innerHTML = content1;
  }
};
//function filter product
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
var findProduct = function () {
  var foundProducts = [];
  var keyword = document.getElementById("search").value;

  for (var i = 0; i < productList.length; i++) {
    if (
      parseInt(productList[i].id) == keyword ||
      productList[i].name.toLowerCase().includes(keyword.toLowerCase())
    ) {
      foundProducts.push(productList[i]);
    }
  }
  showListProduct(foundProducts);
};

//---------Check Validation----------
var checkRequired = function (value, errorId) {
  if (value.length > 0) {
    document.querySelector(errorId).innerHTML = "";
    return true;
  }
  document.querySelector(errorId).innerHTML =
    "*In this case, entry is required ";
  return false;
};
var checkLength = function (value, errorId, min, max) {
  if (value.length >= min && value.length <= max) {
    document.querySelector(errorId).innerHTML = "";
    return true;
  }
  document.querySelector(
    errorId
  ).innerHTML = `*The value from ${min} to ${max} character`;
  return false;
};
var checkNumber = function(value, errorId){
  var pattern = /[0-9]/g;
  if(pattern.test(value)){
    document.querySelector(errorId).innerHTML = "";
    return true;
  }
  document.querySelector(errorId).innerHTML = "Please input the number";
  // return false ;
}
//lấy data từ database
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
fetchProduct();
