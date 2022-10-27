import { getItems } from "./scripts/ajax.mjs";
import { Form } from "./scripts/product.mjs";
import { SalesView, SalesPrototype, Cart } from "./scripts/salesView.mjs";
import { CartView } from "./scripts/cartView.mjs";
import { Checkout } from "./scripts/checkout.mjs";
document.addEventListener("DOMContentLoaded", async () => {
  console.log("dom content loaded");

  const cart = CartView.instantiate(
    {
      viewSelector: "#cartItems",
      tableSelector: "table tbody",
      cartValueSelector: "#cartValue",
    },
    "cart"
  );
  console.log(cart);
  const sales = SalesView.instantiate("#home", "sales");
  console.log(sales.amount);

  const chekoutBtn = Checkout.instantiate(
    ".checkout-section button",
    cart,
    sales
  );
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
