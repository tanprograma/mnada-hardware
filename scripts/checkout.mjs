export class Checkout {
  element;
  constructor(selector) {
    this.element = document.querySelector(selector);
  }
  static instantiate(selector, cart, sales) {
    const checkoutBtn = new this(selector);
    // console.log(checkoutBtn);
    checkoutBtn.addlisteners(cart, sales);
    return checkoutBtn;
  }
  addlisteners(cart, sales) {
    this.handleCheckout(cart, sales);
  }
  handleCheckout(cart, sales) {
    this.element.addEventListener("click", () => {
      // handle sales
      //   handle cart
      // const cartItem = cart.data;
      if (cart.data.length == 0) return;
      const sale = {
        date: new Date().toLocaleDateString(),
        cart: cart.data,
      };
      console.log("before sales update");

      sales.updateStorage(sale);
      sales.loadView();
      console.log("after sales update");
      cart.clearStorage();
    });
  }
}
