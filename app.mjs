import { getItems } from "./scripts/ajax.mjs";
import { Form } from "./scripts/product.mjs";
import { SalesView, SalesPrototype, Cart } from "./scripts/salesView.mjs";
import { CartView } from "./scripts/cartView.mjs";
import { Checkout } from "./scripts/checkout.mjs";
document.addEventListener("DOMContentLoaded", async () => {
  console.log("dom content loaded");
  // const urls = ["bati.jpg", "superset.jpg", "rangi.jpg"];
  // function change(urls) {
  //   if (i > urls.length) {
  //     i = 0;
  //   }
  //   const mainBody = document.querySelector("#mainBody");
  //   mainBody.style.backgroundImage = ` url('./images/${urls[i]}')`;
  //   i++;
  // }
  // function changeBackground(urls) {
  //   setInterval(() => {
  //     change(urls);
  //   }, 600);
  // }
  // changeBackground(urls);

  // inititializations
  //  localstorage
  // legacy codes
  const cart = CartView.instantiate(
    {
      viewSelector: "#cart",
      tableSelector: "table tbody",
      cartValueSelector: "#cartValue",
    },
    "cart"
  );
  const sales = SalesView.instantiate("#sale-section", "sales");
  console.log(sales.amount);
  // const saleMapped = sales.data.map((item) => {
  //   const mapped = item.cart.map((product) => {
  //     return new product.amount();
  //     return product.price * product.quantity;
  //   });
  //   const cartValue = mapped.reduce((previous, current) => {
  //     return previous + current;
  //   }, 0);

  //   return cartValue;
  // });
  // console.log(saleMapped);
  const chekoutBtn = Checkout.instantiate(".section4 button", cart, sales);
  const dependencies = {
    cart,
    chekoutBtn,
  };

  const url = "db.json";
  const data = await getItems(url);
  const form = Form.BootForm("form", data, dependencies);
});

// tests passed
// test.clearform passed
// test.getFormData passed
//test.changeInputBorderColor
//test.changeInputPlaceholder;
// test.autoFillUnitAndPrice
