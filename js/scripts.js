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

// pizza sizes
const pizzaSizes = [
    {
      size: "small",
      price: 600,
    },
    {
      size: "medium",
      price: 800,
    },
    {
      size: "large",
      price: 1200,
    },
  ];
  
  // pizza crusts
  const pizzaCrusts = [
    {
      name: "crispy",
      price: 200,
    },
    {
      name: "stuffed",
      price: 150,
    },
    {
      name: "Glutten free",
      price: 180,
    },
  ];
  
  //toppings
  const pizzaToppings = ["Mushrooms", "Pineapple", "Bacon"];
  
  const pizzas = [
    { name: "Chicken Tikka" },
    { name: "PeriPeri Pizza" },
    { name: "Raspberry Dessert Pizza" },
    { name: "Chicken Alfredo Pizza" },
    { name: "Sunchoke Pizza" },
    { name: "Buffalo Chicken Sticks" },
  ];
  
 