(function(win,doc){

// Emergency exit:
if (!isSupportedBrowser()) {
  return;
}

/**
 Whether this browser is supported
 */
function isSupportedBrowser() {
  return !!(doc.querySelectorAll && doc.addEventListener && [].filter && [].forEach);
}

const PRODUCT_EXCERPT_SEL = '.product-excerpt';
const PRODUCT_GALLERY_SEL = '#productGallery';
const PRODUCT_PRICE_SEL = '.product-price';
const PRODUCT_QUANTITY_SEL = '.product-quantity-input';
const PRODUCT_FORM_SEL = '.sqs-async-form-content';
const ADD_TO_CART_BUTTON_SEL = '.sqs-add-to-cart-button';
const ADD_TO_CART_INNER_SEL = '.sqs-add-to-cart-button-inner';
const ADD_TO_CART_HTML = 'Choose Details…';

/**
 jQuery-like alias for querySelectorAll.
 */
function $(selector, root) {
  return (root || doc).querySelectorAll(selector);
}

/**
 Appends the HTML under the parent node.
 */
function appendHTML(parentNode, html) {
  var div = doc.createElement('div');
  div.innerHTML = html;

  while (div.firstChild) {
    parentNode.appendChild(div.firstChild);
  }
}

/**
 Callback for when the product page loads.
 */
function productPageLoaded() {
  // Move product excerpt to the left column:

  var excerpt = $(PRODUCT_EXCERPT_SEL)[0];
  var gallery = $(PRODUCT_GALLERY_SEL)[0];

  if (excerpt && gallery) {
    gallery.appendChild(excerpt);
  }

  // Move price below the variant selectors:

  var price = $(PRODUCT_PRICE_SEL)[0];
  var quantity = $(PRODUCT_QUANTITY_SEL)[0];

  if (price && quantity) {
    quantity.parentNode.insertBefore(price, quantity);
  }

  // Change text of the "Add to Cart" button:

  var addToCart = $(ADD_TO_CART_INNER_SEL)[0];

  if (addToCart) {
    addToCart.innerHTML = ADD_TO_CART_HTML;
  }
}

/**
 Callback for when the "Add to Cart" button is clicked.
 */
function addToCartClicked() {
  setTimeout(function () {
    if ($(PRODUCT_FORM_SEL)[0]) {
      productFormLoaded();
    }
  }, 500);
}

/**
 Callback for when the Product Form is loaded.
 */
function productFormLoaded() {
  var form = $(PRODUCT_FORM_SEL)[0];
}

/**
 Initialize this stuff.
 */
doc.addEventListener('DOMContentLoaded', function () {
  productPageLoaded();

  var addToCartBtn = $(ADD_TO_CART_BUTTON_SEL)[0];

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', addToCartClicked);
  }
});

})(window,document);
