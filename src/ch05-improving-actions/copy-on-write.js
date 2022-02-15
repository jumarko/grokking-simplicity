// take this which is cart-specific
function add_item(cart, item) {
  let new_cart = Array.from(cart);
  new_cart.push(item);
  return new_cart;
}

// ... and make a generic function for adding element to an array
function add_element_last(array, element) {
  let new_arr = Array.from(array);
  new_arr.push(elemeent);
  return new_arr;
}

function add_item(cart, item) {
  add_element_last(cart, item);
}
