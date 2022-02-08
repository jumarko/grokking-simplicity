/* This is how the chapter starts - with an imperative version of the code */

var shopping_cart = [];
var shopping_cart_total = 0;

function add_item_to_cart(name, price) {
  shopping_cart.push({
    name: name,
    price: price
  });
  // update the total
  calc_cart_total();
}

function calc_cart_total() {
  shopping_cart_total = shopping_cart.reduce((acc, item) => acc + item.price, 0);
  // update the DOM to show the new total
  set_cart_total_dom();
}

function set_cart_total_dom() {
  // update the DOM
}


/* Now we get a new asignment: free shipping */

// we just write a function that adds little icons to all the "Buy Now" buttons
// this new function will be called at the end of calc_cart_total() - after set_cart_total_dom() call
function update_shipping_icons() {
  const buttons = get_buy_buttons_dom();
  buttons.forEach(button => {
    const {item: {price}} = button;
    if (price + shopping_cart_total >= 20) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  });
}


/* Yet another assignment - calculating tax */

function update_tax_dom() {
  set_tax_dom(shipping_cart_total * 0.10);
}
// and again call update_tax_dom() at the aned of `calc_cart_total`


// the final calc_cart_total might look like this
function calc_cart_total() {
  shopping_cart_total = shopping_cart.reduce((acc, item) => acc + item.price, 0);
  // update the DOM to show the new total
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}
