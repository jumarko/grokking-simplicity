// We take all the code from free-shipping_functional.js
// and try to improve it

// Start by looking at get-free-shipping
// The problem is that it's not what business wants:
// - they want to know if the whole _cart_ gets free shipping



// These global vars are no longer needed after our refactoring!!!
// var shopping_cart = [];
// var shopping_cart_total = 0;


// take this:
// function gets_free_shipping(total, item_price) {
//   return total + item_price >= 20;
// }

// ... and convert it to this:
function gets_free_shipping(cart) {
  return calc_total(cart) >= 20;
}

// now update the action: update_shipping_icons refactored on p. 84-5
// also we make cart an explicit arg instead of implicitly using `shopping_cart` (p. 92)
function update_shipping_icons(cart, buttons) {
  buttons.forEach(button => {
    const {item: {price, name}} = button;
    // this is the update - making new_cart and passing it as an arg
    const new_cart = add_item(cart, name, price);
    if (gets_free_shipping(new_cart)) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  });
}

function calc_total(cart) {
  return cart.reduce((acc, item) => acc + item.price, 0);
}


// Note we got rid of calc_card_total and moved the implicit outputs here
// This function is called from the DOM event handler!
function add_item_to_cart(cart, buttons, name, price) {
  new_cart = add_item(cart, name, price);
  const cart_total = calc_total(cart);

  // update the DOM to show the new total
  set_cart_total_dom(cart_total);
  update_shipping_icons(cart, buttons);
  update_tax_dom(cart_total);
}

function add_item(cart, name, price) {
  // notice we can use slice() or Array.from() to create a shallow copy to avoid modifying the argument
  // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
  // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  // - https://levelup.gitconnected.com/how-to-copy-an-array-in-javascript-with-array-from-298c7e66eebc
  // See also: https://stackoverflow.com/questions/3978492/fastest-way-to-duplicate-an-array-in-javascript-slice-vs-for-loop
  let new_cart = Array.from(cart);
  new_cart.push({
    name: name,
    price: price
  });
  return new_cart;
}


/* Now some exercises starting on p. 79 */

// tax calculation refactoring
// accounting department wants to reuse the tax calculation
function update_tax_dom(cart_total) {
  set_tax_dom(calc_tax(cart_total));
}

function set_tax_dom(tax) {
  // just a shim to have something
  console.log("set_tax_dom() called with tax: " + tax);
}

function calc_tax(amount) {
  return amount * 0.10;
}


function set_cart_total_dom(total) {
  // just a shim to have something
  console.log("set_cart_total_dom() called with total: " + total);
}



// you can try the whole thing with this:
//
function make_button(item) {
  return {item: item,
          show_free_shipping_icon: function() {console.log("show free shipping for " + item.name);},
          hide_free_shipping_icon: function() {console.log("hide free shipping for " + item.name);}};
}

function get_buy_buttons_dom() {
  return my_items.map(make_button);
}

let my_items = [{name: "pen", price: 2}, {name: "book", price: 20}, {name: "computer", price: 2000}, {name: "headphones", price: 200}];
add_item_to_cart(my_items, get_buy_buttons_dom(), "airplane", 2000000);

