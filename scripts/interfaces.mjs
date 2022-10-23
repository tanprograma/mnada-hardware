class Item {
  name;
  price;
  constructor({ name, price }) {
    this.name = name;
    this.price = price;
  }
}
class CartItem {
  itemName;
  unit;

  quantity;
  price;
  constructor({ product, quantity, unit, price }) {
    this.itemName = product;
    this.unit = unit;

    this.quantity = quantity;
    this.price = price;
  }
  get amount() {
    return this.getAmount();
  }

  getAmount() {
    return this.price * this.quantity;
  }
}
class Cart {
  date;
  items;
  constructor() {
    this.date = new Date().toLocaleDateString();
    this.items = [];
  }
  get amount() {
    return this.getAmount();
  }

  getAmount() {
    const amounts = this.items.map((item) => {
      return item.amount;
    });

    const total = amounts.reduce((previous, current) => {
      return previous + current;
    }, 0);

    return total;
  }
  addItem(items) {
    this.items = items;
  }
}
class Sales {
  carts;
  constructor() {
    this.items = [];
  }
  get amount() {
    return this.getAmount();
  }

  getAmount() {
    const amounts = this.items.map((item) => {
      return item.amount;
    });

    const total = amounts.reduce((previous, current) => {
      return previous + current;
    }, 0);

    return total;
  }

  addItem(carts) {
    this.items = carts;
  }
}

export { Item, CartItem, Cart, Sales };
