/* Here's just a part of the code centered around addItem
   and trying to pull things apart - see p. 99 */

// this function knows both the structure of the cart
// AND the structure of the item
function add_item(cart, name, price) {
  let new_cart = Array.from(cart);
  new_cart.push({
    name: name,
    price: price
  });
  return new_cart;
}


// => create a "constructor" function
function add_item(cart, item) {
  let new_cart = Array.from(cart);
  new_cart.push(item);
  return new_cart;
}

function make_cart_item(name, price) {
  return {
    name: name,
    price: price
  };
}

// adjust the calling code

function add_item_to_cart(cart, buttons, name, price) {
  // this is the update: call make_cart_item
  new_cart = add_item(cart, make_cart_item(name, price));
  const cart_total = calc_total(cart);
  // update the DOM to show the new total
  set_cart_total_dom(cart_total);
  update_shipping_icons(cart, buttons);
  update_tax_dom(cart_total);
}

function update_shipping_icons(cart, buttons) {
  buttons.forEach(button => {
    const {item: {price, name}} = button;
    // this is the update: call make_cart_item
    const new_cart = add_item(cart, make_cart_item(name, price));
    if (gets_free_shipping(new_cart)) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  });
}
