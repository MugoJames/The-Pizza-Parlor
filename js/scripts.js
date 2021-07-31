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
  
  $(function () {
    // append pizzas
    pizzas.forEach((pizza) => {
      $("#pizza").append(`<option value="${pizza.name}">${pizza.name}</option>`);
    });
    // append pizza sizes
    pizzaSizes.forEach((pizzaSize) => {
      $("#size").append(
        `<option value="${pizzaSize.size}">${pizzaSize.size}-${pizzaSize.price}</option>`
      );
    });
  
    // append pizza crusts
    pizzaCrusts.forEach((pizzaCrust) => {
      $("#crust").append(
        `<option value="${pizzaCrust.name}">${pizzaCrust.name}-${pizzaCrust.price}</option>`
      );
    });
  
    //append pizza toppings
    pizzaToppings.forEach((topping) => {
      $(".toppings").append(`<div class="col-md-6">
        <div class="form-check">
          <input class="form-check-input" name="toppings[]" type="checkbox" id="${topping}" value="${topping}">
          <label class="form-check-label" for="${topping}">
              ${topping}
          </label>
          </div>
        </div>`);
    });
  
    // function to calculate grand total
    function calculateGrandTotal() {
        let total = 0;
        cart.forEach((pizza) => {
          total += pizza.price;
        });
    
        $(".grand-total").text(total);
      }
    
    
    
  });
  