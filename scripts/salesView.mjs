class Cart {
  date;
  cart;
  constructor({ date, cart }) {
    this.date = date;
    this.cart = cart;
  }
  get amount() {
    return this.getAmount();
  }

  getAmount() {
    const amounts = this.cart.map((cartItem) => {
      return cartItem.price * cartItem.quantity;
    });

    const total = amounts.reduce((previous, current) => {
      return previous + current;
    }, 0);

    return total;
  }
}
class SalesPrototype {
  constructor(sales) {
    this.sales = sales;
  }
  get amount() {
    return this.getAmount();
  }

  getAmount() {
    const amounts = this.sales.map((sale) => {
      return new Cart(sale).amount;
    });

    const total = amounts.reduce((previous, current) => {
      return previous + current;
    }, 0);

    return total;
  }
}

class SalesView {
  element;
  data;
  constructor(viewSelector, storageKey, value) {
    this.element = document.querySelector(viewSelector);
    this.stat = document.querySelector(`${viewSelector} #total-sales`);
    this.data = value;
    this.storageKey = storageKey;
  }
  static instantiate(viewSelector, storageKey) {
    const value = this.fetchStorage(storageKey);
    return this.create(viewSelector, storageKey, value);
  }
  static create(viewSelector, storageKey, value) {
    const view = new this(viewSelector, storageKey, value);
    // console.log(view);
    view.loadView();
    return view;
  }
  loadView() {
    this.stat.innerHTML = "";
    this.stat.append(`total sales : ${this.amount}`);
  }
  static fetchStorage(storageKey) {
    if (!window.localStorage.getItem(storageKey)) {
      // create local storage
      window.localStorage.setItem(storageKey, JSON.stringify([]));
      return [];
    }

    return JSON.parse(window.localStorage.getItem(storageKey));
  }
  static salesObjectCaster(storageObj) {
    return new SalesPrototype(storageObj);
  }

  updateStorage(value) {
    const storage = JSON.parse(window.localStorage.getItem(this.storageKey));
    //   updates local storage
    window.localStorage.setItem(
      this.storageKey,
      JSON.stringify([value, ...storage])
    );
    //   updates the component/view data
    this.data = [value, ...this.data];
    // this.loadView();
    console.log(`added ${value} to storage`);
  }
  clearStorage() {
    window.localStorage.setItem(this.storageKey, JSON.stringify([]));
    this.data = [];
    this.loadView();
  }

  get amount() {
    return new SalesPrototype(this.data).amount;
  }

  //   static getStorage(storageKey) {
  //     return JSON.parse(window.localStorage.getItem(storageKey));
  //   }
}

export { Cart, SalesPrototype, SalesView };
