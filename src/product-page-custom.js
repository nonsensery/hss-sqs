(function(win,doc){

const ADD_TO_CART_BUTTON_TEXT = 'Choose Details…';

// Emergency exit:
if (!supported()) {
  return;
}

/**
 Whether this browser is supported
 */
function supported() {
  return !!(doc.querySelectorAll && doc.addEventListener);
}

/**
 jQuery-like alias for querySelectorAll.
 */
function $(selector, root) {
  return (root || doc).querySelectorAll(selector);
}

/**
 Initializes this stuff.
 */
function start() {
  productPageLoaded();

  var addToCartBtn = $('.sqs-add-to-cart-button')[0];

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', addToCartClicked);
  }
}

/**
 Callback for when the product page loads.
 */
function productPageLoaded() {
  var excerpt = $('.product-excerpt')[0];
  var gallery = $('#productGallery')[0];

  if (excerpt && gallery) {
    gallery.appendChild(excerpt);
  }

  var price = $('.product-price')[0];
  var quantity = $('.product-quantity-input')[0];

  if (price && quantity) {
    quantity.parentNode.insertBefore(price, quantity);
  }

  var addToCart = $('.sqs-add-to-cart-button-inner')[0];

  if (addToCart) {
    addToCart.innerHTML = ADD_TO_CART_BUTTON_TEXT;
  }
}

/**
 Callback for when the "Add to Cart" button is clicked.
 */
function addToCartClicked() {
  setTimeout(productFormLoaded, 200);
}

/**
 Callback for when the Product Form is loaded.
 */
function productFormLoaded() {
  var form = $('.sqs-async-form-content');
}

// Start it up!
doc.addEventListener('DOMContentLoaded', start);

})(window,document);
