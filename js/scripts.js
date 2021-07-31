// pizza constructor
function Pizza(name) {
    this.name = name;
    this.price = 0;
    this.quantity = 1;
    this.toppings = [];
}

// set pizza size
Pizza.prototype.setSize = function (size) {
    const pizzaSize = pizzaSizes.find((pizzaSize) => pizzaSize.size == size);
    if (pizzaSize) {
        this.size = pizzaSize;
        this.calculateTotal();
    }
};

//set pizza crust
Pizza.prototype.setCrust = function (name) {
    const pizzaCrust = pizzaCrusts.find((pizzaCrust) => pizzaCrust.name == name);
    if (pizzaCrust) {
        this.crust = pizzaCrust;
        this.calculateTotal();
    }
};

Pizza.prototype.setTopings = function (toppings) {
    this.toppings = toppings;
    this.calculateTotal();
};

//set quantity
Pizza.prototype.setQuantity = function (quantity) {
    this.quantity = +quantity;
    this.calculateTotal();
};

// calculate pizza total
Pizza.prototype.calculateTotal = function () {
    const toppingPrice = 50;

    if (this.size) {
        this.price = this.size.price;
    }

    if (this.crust) {
        this.price = this.price + this.crust.price;
    }

    // add the price of toppings
    this.price += this.toppings.length * toppingPrice;

    this.price *= this.quantity;
};
