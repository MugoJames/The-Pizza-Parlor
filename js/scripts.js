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

    // initialize an empty cart
    const cart = [];

    $("#order-form").on("submit", function (e) {
        //prevent default action
        e.preventDefault();

        const selectedPizzaName = $("#pizza").val();
        const selectedSize = $("#size").val();
        const selectedCrust = $("#crust").val();
        const selectedToppings = $("input[name='toppings[]']:checkbox:checked")
            .map(function () {
                return $(this).val();
            })
            .get();

        // validation for all fields
            
        // cart details
        //check if selected pizza exists in cart
        const cartPizza = cart.find((pizza) => {
            const sameToppings =
                JSON.stringify(pizza.toppings) == JSON.stringify(selectedToppings);

            return (
                pizza.name == selectedPizzaName &&
                pizza.size.size == selectedSize &&
                sameToppings
            );
        });
        //if it exists increase quantity
        if (cartPizza) {
            cartPizza.setQuantity(cartPizza.quantity + 1);
        } else {
            const pizza = new Pizza(selectedPizzaName);
            pizza.setSize(selectedSize);
            pizza.setCrust(selectedCrust);
            pizza.setTopings(selectedToppings);

            cart.push(pizza);
        }
        // empty tbody first
        $(".order-table tbody").html("");
        //loop and append
        cart.forEach((pizza, cartIndex) => {
            $(".order-table tbody").append(`
            <tr>
                <td>${pizza.name}</td>
                <td>${pizza.size.size}</td>
                <td>${pizza.crust.name}</td>
                <td>${pizza.toppings.join(", ")}</td>
                <td>
                    <input type="number" min="1" class="input-sm form-control pizza-quantity" data-cart-index="${cartIndex}" value="${pizza.quantity
                }" />
                </td>
                <td>${pizza.price}</td>
            </tr>
        `);

            //update grand total
            calculateGrandTotal();
        });
    });
    //pizza quantity change event
    $("body").on("change", ".pizza-quantity", function () {
        const quantity = $(this).val();
        const cartIndex = $(this).data("cart-index");
        const pizza = cart[cartIndex];

        if (quantity > 0) {
            pizza.setQuantity(quantity);
            // update line total
            $(this).parent().next().text(pizza.price);
        }

        //update grand total
        calculateGrandTotal();
    });


});
