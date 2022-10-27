class Form {
  constructor(selector, data) {
    this.product = document.querySelector(`${selector} input[name="product"]`);
    this.unit = document.querySelector(`${selector} input[name="unit"]`);
    this.price = document.querySelector(`${selector} input[name="price"]`);
    this.quantity = document.querySelector(
      `${selector} input[name="quantity"]`
    );
    this.button = document.querySelector(`${selector} button`);
    this.datalist = document.querySelector(`${selector} datalist`);

    this.datalistData = data;
  }
  // start form initializations
  static BootForm(selector, data, dependencies) {
    // console.log(dependencies);
    // this.staticBootCart(cartView, cartX);
    return this.create(selector, data, dependencies);
  }
  static async create(selector, data, dependencies) {
    const form = new this(selector, data);
    form.instantiate(dependencies.cart);
    return form;
  }

  instantiate(cart) {
    this.populateDatalist();
    this.addListeners(cart);
  }

  // populate datalist
  populateDatalist() {
    // const datalist = this.rawRoot.querySelector("datalist");
    this.datalistData.forEach((product) => {
      const option = document.createElement("option");
      option.append(product.itemName);
      this.datalist.append(option);
    });
  }
  addListeners(cart) {
    this.handleProductInput();
    this.handleSubmit(cart);
    // this.handleCheckout(cart);
  }
  // end form initializations

  handleProductInput() {
    this.product.addEventListener("blur", () => {
      if (!this.product.value) return;
      this.autoFillUnitAndPrice();
    });
  }
  handleSubmit(cart) {
    this.button.addEventListener("click", (e) => {
      //   this.autoFillUnitAndPrice();
      e.preventDefault();
      this.submit(cart);
    });
  }
  autoFillUnitAndPrice() {
    const product = this.datalistData.find((dataItem) => {
      return dataItem.itemName == this.product.value;
    });
    this.price.value = product.price;
    this.unit.value = product.unit;
  }
  submit(cart) {
    const cartItem = this.readInputs();
    // check validity
    if (cartItem.quantity == "") {
      this.showErrorOnInputSubmission();
      return;
    }
    cart.updateStorage(cartItem);
    // this.bootCart(dependencies.cartView, dependencies.cartX);
    this.clearForm();
    console.log(cartItem);
  }
  readInputs() {
    const inputs = {
      product: this.product.value,
      unit: this.unit.value,

      quantity: this.quantity.value,
      price: this.price.value,
    };
    return inputs;
  }
  // error handling code
  changeInputBorderColor(element, color) {
    element.style.border = color;
  }
  showErrorOnInputSubmission() {
    const color = "2px solid red";
    const message = "this field is required";
    const element = this.quantity;
    this.changeInputBorderColor(element, color);
    this.changeInputPlaceholder(element, message);
  }

  changeInputPlaceholder(input, message) {
    input.placeholder = message;
  }

  // error handling ends
  clearForm() {
    const inputs = this.getForm();
    inputs.forEach((item) => {
      const name = item.name;
      item.value = "";
      item.placeholder = name;
      item.style.border = "1px black";
      item.style.borderLeft = "1px solid black";
      item.style.borderBottom = "1px solid black";
    });
  }
  getForm() {
    return [this.product, this.unit, this.price, this.quantity];
  }
  handleCheckout(cart) {
    chekoutBtn.addEventListener("click", () => {
      console.log(cart);
    });
  }
}

export { Form };
