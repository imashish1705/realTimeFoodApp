
import axios from 'axios'
import Noty from "noty"
let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.getElementById("cartCounter");

function updateCart(pizza) {
  // AJAX call
  axios.post("/update-cart",pizza)
  .then(res =>{
    //console.log(res);
    cartCounter.innerText = res.data.totalQty
    new Noty({
      text: "Item added to cart"
    }).show();
  })
}

addToCart.forEach((btn) => {
    btn.addEventListener("click",(e) => {
        console.log(e);
         //let pizza = btn.dataset.pizza; // iseh hum data mil jayega JSON k formate mei
        let pizza = JSON.parse(btn.dataset.pizza);
         //console.log(pizza);
         updateCart(pizza);
    })
})