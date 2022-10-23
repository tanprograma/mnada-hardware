class Item {
  itemName;
  unit;
  quantity;
  price;
  constructor({ product, unit, quantity, price }) {
    this.itemName = product;
    this.unit = unit;
    this.quantity = quantity;
    this.price = price;
  }
  get amount() {
    return this.getAmount();
  }
  getAmount() {
    return this.quantity * this.price;
  }
}

export class CartView {
  element;
  data;
  constructor(
    { viewSelector, tableSelector, cartValueSelector },
    storageKey,
    value
  ) {
    this.element = document.querySelector(viewSelector);
    this.table = document.querySelector(tableSelector);
    this.cartValueView = document.querySelector(cartValueSelector);
    this.data = value;
    this.storageKey = storageKey;
  }
  static instantiate(viewSelector, storageKey) {
    const value = this.fetchStorage(storageKey).map((item) => {
      return new Item(item);
    });
    return this.create(viewSelector, storageKey, value);
  }
  static create(viewSelector, storageKey, value) {
    const view = new this(viewSelector, storageKey, value);
    // console.log(view);
    view.loadView();
    return view;
  }
  loadView() {
    this.loadCartSummary();
    this.loadTable();
  }
  static fetchStorage(storageKey) {
    if (!window.localStorage.getItem(storageKey)) {
      // create local storage
      window.localStorage.setItem(storageKey, JSON.stringify([]));
      return [];
    }

    return JSON.parse(window.localStorage.getItem(storageKey));
  }

  updateStorage(value) {
    const storage = JSON.parse(window.localStorage.getItem(this.storageKey));
    //   updates local storage
    window.localStorage.setItem(
      this.storageKey,
      JSON.stringify([value, ...storage])
    );
    //   updates the component/view data
    this.data = [new Item(value), ...this.data];
    this.loadView();
    console.log(`added ${value} to storage`);
  }
  clearStorage() {
    window.localStorage.setItem(this.storageKey, JSON.stringify([]));
    this.data = [];
    this.loadView();
  }

  get amount() {
    return this.getAmount();
  }
  getAmount() {
    const amounts = this.data.map((cartItem) => {
      return cartItem.amount;
    });

    const total = amounts.reduce((previous, current) => {
      return previous + current;
    }, 0);

    return total;
  }
  // tableview
  createRow(item) {
    const tr = document.createElement("tr");
    const subTotal = item.amount;
    const td = document.createElement("td");
    td.append(subTotal);
    Object.values(item).forEach((dataItem) => {
      const td = document.createElement("td");
      td.append(dataItem);
      tr.append(td);
    });
    tr.append(td);
    this.table.append(tr);
  }
  loadTable() {
    this.table.innerHTML = "";
    this.data.forEach((cartItem) => {
      this.createRow(cartItem);
    });
  }
  loadCartSummary() {
    this.element.innerHTML = "";
    this.cartValueView.innerHTML = "";
    this.element.append(this.data.length);
    this.cartValueView.append(this.amount);
  }

  // addToSales(cart) {
  //   const cart = {
  //     date: new Date().toLocaleDateString(),
  //     cart : this.data
  //   }
  //   sales
  // }
  //   static getStorage(storageKey) {
  //     return JSON.parse(window.localStorage.getItem(storageKey));
  //   }
}
