// this function is doing a lot of things...
// 1. It operates on 'buy buttons'
// 2. It does cart & item operations - adding new item, checking free shipping
// 3. It manipulates the DOM: hide/show free shipping icons
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

// Let's try to refactor it...

// 1. button operations
function update_shipping_icons(cart, buttons) {
  buttons.forEach(button => {
    const {item} = button;
    update_free_shipping_icon(button, gets_free_shipping_with_item(new_cart));
  });
}

// 2. cart & item operations
function gets_free_shipping_with_item(cart, item) {
  const new_cart = add_item(cart, item);
  return gets_free_shippiing(new_cart);
}

// 3. Manipulating the DOM
function update_free_shipping_icon(button, isShown) {
  if (isShown) {
    button.show_free_shipping_icon();
  } else {
    button.hide_free_shipping_icon();
  }
}

// this is here just for completeness
function gets_free_shipping(cart) {
  return calc_total(cart) >= 20;
}
