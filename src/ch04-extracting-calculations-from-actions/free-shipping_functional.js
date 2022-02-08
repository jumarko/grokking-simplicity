// Imaging we have this function implemented in the imperative version of our code

var shopping_cart = [];
var shopping_cart_total = 0;

function calc_cart_total() {
  // in the book they extract this as a separate function
  // because they use verbose loop instead of reduce
  const shopping_cart_total = calc_total(shopping_cart);

  // update the DOM to show the new total
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}

function calc_total(cart) {
  cart.reduce((acc, item) => acc + item.price, 0);
}


// let's refactor add_item_to_cart now
function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, name, price);
  // update the total
  calc_cart_total();
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
function update_tax_dom() {
  set_tax_dom(calc_tax(shipping_cart_total));
}
function calc_tax(amount) {
  return amount * 0.10;
}


// update_shipping_icons refactored on p. 84-5
function update_shipping_icons() {
  const buttons = get_buy_buttons_dom();
  buttons.forEach(button => {
    const {item: {price}} = button;
    if (gets_free_shipping(price, shipping_cart_total)) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  });
}

function gets_free_shipping(total, item_price) {
  return total + item_price >= 20;
}

