(function(win,doc){

function $(selector, root) {
  return (root || doc).querySelectorAll(selector);
}

function start() {
  var addToCartBtn = $('.sqs-add-to-cart-button')[0];

  if (!addToCartBtn) {
    return;
  }

  console.log('add to cart button: ', addToCartBtn);

  addToCartBtn.addEventListener('click', addToCartClicked);
}

function addToCartClicked() {
  console.log('add to cart clicked!');

  setTimeout(productFormLoaded, 200);
}

function productFormLoaded() {
  var form = $('.sqs-async-form-content');

  console.log('form: ', form);
}

doc.addEventListener('DOMContentLoaded', start);

})(window,document);
