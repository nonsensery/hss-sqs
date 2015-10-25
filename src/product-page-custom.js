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

const PRODUCT_LIST_SEL = '#productList';
const PHOTO_ALBUMS_CALLOUT_HTML = (
  '<p class="hss-albums-callout">' +
    'Looking for Hinged Strung Stitched photo albums? ' +
    '<a href="https://www.etsy.com/shop/HingedStrungStitched">Find them on Etsy.</a>' +
  '</p>'
);
const PRODUCT_EXCERPT_SEL = '.product-excerpt';
const PRODUCT_GALLERY_SEL = '#productGallery';
const PRODUCT_PRICE_SEL = '.product-price';
const PRODUCT_QUANTITY_SEL = '.product-quantity-input';
const PRODUCT_FORM_SEL = '.sqs-async-form-content';
const ADD_TO_CART_BUTTON_SEL = '.sqs-add-to-cart-button';
const ADD_TO_CART_INNER_SEL = '.sqs-add-to-cart-button-inner';
const ADD_TO_CART_HTML = 'Choose Details…';
const CLOTH_COLOR_INJECT_HTML = (
  '<span class="hss-cloth-color-swatch"></span>' +
  '<span class="hss-cloth-color-info"><a href="/swatches" target="_blank">' +
    'Learn more about our cloth colors…' +
  '</a></span>'
);

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
 Callback for when the product index loads
 */
function productIndexLoaded() {
  var productList = $(PRODUCT_LIST_SEL)[0];

  if (productList) {
    appendHTML(productList.parentNode, PHOTO_ALBUMS_CALLOUT_HTML);
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

  if (form.dataset.hss_swatches_setup) {
    return;
  }
  form.dataset.hss_swatches_setup = 'true';

  var formItems = $('.form-item.field.select', form);
  formItems = [].slice.call(formItems);

  formItems.forEach(function (formItem) {
    var label = $('label.title', formItem)[0];
    var select = $('select', formItem)[0];

    if (!label || !select || !isClothColorLabel(label)) {
      return;
    }

    appendHTML(formItem, CLOTH_COLOR_INJECT_HTML);

    select.addEventListener('change', clothColorSelectChanged);
    clothColorSelectChanged.call(select);
  });
}

/**
 Whether the label is for a cloth color field.
 */
function isClothColorLabel(label) {
  return (/\bcloth\s+color\b/i).test(label.innerHTML);
}

/**
 Callback for changes to cloth color select elements.
 */
function clothColorSelectChanged() {
  var select = this;
  var swatch = $('.hss-cloth-color-swatch', this.parentNode)[0];

  if (!select || !swatch) {
    return;
  }

  removeSwatchColorClassNames(swatch);

  var selectedOpt = select.options[select.selectedIndex];

  if (selectedOpt) {
    addSwatchColorClassName(swatch, selectedOpt.value);
  }
}

/**
 Removes all cloth color class names from the element.
 */
function removeSwatchColorClassNames(el) {
  var regexp = /^hss-x-/;

  el.className = el.className.split(/\s+/).filter($0 => !regexp.test($0)).join(' ');
}

/**
 Adds a specific cloth color name to the element.
 */
function addSwatchColorClassName(el, color) {
  el.className += ' hss-x-' + color.toLowerCase().replace(/\s+/g, '-');
}

/**
 Initialize this stuff.
 */
doc.addEventListener('DOMContentLoaded', function () {
  productIndexLoaded();
  productPageLoaded();

  var addToCartBtn = $(ADD_TO_CART_BUTTON_SEL)[0];

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', addToCartClicked);
  }
});

})(window,document);
