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
const SUBMIT_PRODUCT_FORM_BUTTON_SEL = '.sqs-system-button';
const LOGO_FIELD_SEL = 'select[data-variant-option-name=Logo]';
const DEBOSS_SIZE_INFO_HTML = (
  '<span class="hss-field-description">' +
    'Please note: Deboss logos over 1.25&times;5.5&Prime; may incur an additional charge.' +
  '</span>'
);
const ADD_TO_CART_BUTTON_SEL = '.sqs-add-to-cart-button';
const ADD_TO_CART_INNER_SEL = '.sqs-add-to-cart-button-inner';
const ADD_TO_CART_HTML = 'Choose Details…';
const CLOTH_COLOR_INJECT_HTML = (
  '<span class="hss-cloth-color-swatch"></span>' +
  '<span class="hss-field-description"><a href="/color-and-logo-options" target="_blank">' +
    'Learn more about our cloth colors…' +
  '</a></span>'
);
const LOGO_ARTWORK_HTML = (
  '<span class="hss-field-description"><a href="/logo-and-page-specs" target="_blank">' +
    'Find out how to prepare your file…' +
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
  // Add photo albums callout:

  var productList = $(PRODUCT_LIST_SEL)[0];

  if (productList) {
    appendHTML(productList.parentNode, PHOTO_ALBUMS_CALLOUT_HTML);
  }

  // Add text after Logo field:

  var select = $(LOGO_FIELD_SEL)[0];

  if (select) {
    appendHTML(select.parentNode, DEBOSS_SIZE_INFO_HTML);
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

  updateAddToCartText();
}

/**
 Changes the text of the "Add to Cart" button.
 */
function updateAddToCartText() {
  var addToCart = $(ADD_TO_CART_INNER_SEL)[0];

  if (!addToCart) {
    return;
  }

  var addToCartHTML = addToCart.innerHTML;

  if ((/add(ing|ed)/i).test(addToCartHTML)) {
    setTimeout(updateAddToCartText, 100);
    return;
  }

  addToCart.innerHTML = ADD_TO_CART_HTML;
}

/**
 Callback for when the "Add to Cart" button is clicked.
 */
function addToCartClicked() {
  // There's some tricky timing here because the form loads asynchronously.
  setTimeout(productFormLoaded, 100);
  setTimeout(productFormLoaded, 500);
  setTimeout(productFormLoaded, 750);
}

/**
 Callback for when the Product Form is loaded.
 */
function productFormLoaded() {
  var form = $(PRODUCT_FORM_SEL)[0];

  if (!form || form.dataset.hss_setup) {
    return;
  }
  form.dataset.hss_setup = 'true';

  var formItems = $('.form-item.field.select', form);
  formItems = [].slice.call(formItems);

  formItems.forEach(function (formItem) {
    var label = $('label.title', formItem)[0];

    if (!label) {
      return;
    }

    if (isClothColorLabel(label)) {
      setupClothColorField(formItem);
    }
    else if (isLogoArtworkLabel(label)) {
      setupLogoArtworkField(formItem);
    }
  });

  var submitProductForm = $(SUBMIT_PRODUCT_FORM_BUTTON_SEL, form)[0];

  if (submitProductForm) {
    submitProductForm.addEventListener('click', submitProductFormClicked);
  }
}

/**
 Whether the label is for a cloth color field.
 */
function isClothColorLabel(label) {
  return (/\bcloth\s+color\b/i).test(label.innerHTML);
}

/**
 Sets up a cloth color field.
 */
function setupClothColorField(formItem) {
  var select = $('select', formItem)[0];

  if (!select) {
    return;
  }

  appendHTML(formItem, CLOTH_COLOR_INJECT_HTML);

  select.addEventListener('change', clothColorSelectChanged);
  clothColorSelectChanged.call(select);
}

/**
 Callback for changes to cloth color select elements.
 */
function clothColorSelectChanged() {
  var select = this;
  var swatch = $('.hss-cloth-color-swatch', this.parentNode)[0];

  if (!swatch) {
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
 Whether the label is for the logo artwork field.
 */
function isLogoArtworkLabel(label) {
  return (/\logo\s+artwork\b/i).test(label.innerHTML);
}

/**
 Sets up a logo artwork field
 */
function setupLogoArtworkField(formItem) {
  appendHTML(formItem, LOGO_ARTWORK_HTML);
}

/**
 Handler for clicks on the product form's submit button.
 */
function submitProductFormClicked() {
  // We want to make sure the add to cart button text gets
  // changed back to Choose Details again.
  setTimeout(updateAddToCartText, 500);
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
