let navbar = document.querySelector(".navbar");
document.querySelector("#menu-btn").onclick = function () {
  cartItemContainer.classList.remove("active");
  searchForm.classList.remove("active");
  navbar.classList.toggle("active");
};

let cartItemContainer = document.querySelector(".cart-items-container");
document.querySelector("#cart-btn").onclick = function () {
  searchForm.classList.remove("active");
  navbar.classList.remove("active");
  cartItemContainer.classList.toggle("active");
};

let searchForm = document.querySelector(".search-form");
document.querySelector("#search-btn").onclick = function () {
  navbar.classList.remove("active");
  cartItemContainer.classList.remove("active");
  searchForm.classList.toggle("active");
};

window.onscroll = function () {
  navbar.classList.remove("active");
  cartItemContainer.classList.remove("active");
  searchForm.classList.remove("active");
};

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

/* cart part */
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let removeCartItemButtons = document.getElementsByClassName("cart-remove");

  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let button = quantityInputs[i];
    button.addEventListener("change", quantityChanged);
  }

  let addToCartButtons = document.getElementsByClassName("add-to-cart");
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  //alert("Thank You For Your Purchase");
  show_pop_conformation();
  var cartItemContainer = document.querySelector(".cart-items-container");
  while (cartItemContainer.children.length > 1) {
    cartItemContainer.removeChild(cartItemContainer.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement;
  let title = shopItem.getElementsByClassName("product-title")[0].innerText;
  let price = shopItem.getElementsByClassName("price")[0].innerText;
  let imageSrc = shopItem.getElementsByClassName("product-img")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-item");
  let cartItemContainer = document.getElementsByClassName(
    "cart-items-container"
  )[0];
  let cartItemContainerNames =
    cartItemContainer.getElementsByClassName("cart-item-title");

  // console.log(cartItemContainerNames);
  for (let i = 0; i < cartItemContainerNames.length; i++) {
    let element = cartItemContainerNames[i];
    if (element.innerText == title) {
      //alert("This Item Is Already Added To The Cart");
      show_pop_warning();
      return;
    }
  }
  // console.log(cartItemContainer);
  var cartRowContents = `
  <div class="cart-item-img">
            <img src="${imageSrc}" alt="" />
          </div>

          <div class="cart-item-description">
            <span class="fas fa-times cart-remove"> </span>
            <h3 class="cart-item-title">${title}</h3>
            <span class="cart-price">${price}</span>
            <input class="cart-quantity" type="number" value="1" />`;
  cartRow.innerHTML = cartRowContents;
  cartItemContainer.prepend(cartRow);
  cartRow
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  let cartRows = document.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName("cart-quantity")[0];
    // console.log(priceElement);
    // console.log(quantityElement);
    let price = parseFloat(priceElement.innerText.replace("$", ""));

    let quantity = quantityElement.value;
    // console.log(price);
    // console.log(quantity);
    // console.log(price * quantity);
    total = total + price * quantity;
  }

  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$ " + total;
}

/* pop up */

function show_pop_conformation() {
  document.querySelector(".pop-up-container").classList.add("open");
  document.querySelector(".card-confirmation").classList.add("open");
}

function hide_pop_conformation() {
  document.querySelector(".pop-up-container").classList.remove("open");
  document.querySelector(".card-confirmation").classList.remove("open");
}

function show_pop_warning() {
  document.querySelector(".pop-up-container").classList.add("open");
  document.querySelector(".card-warning").classList.add("open");
}

function hide_pop_warning() {
  document.querySelector(".pop-up-container").classList.remove("open");
  document.querySelector(".card-warning").classList.remove("open");
}
