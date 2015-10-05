# HSS Square Space Customizations

This code is added runs on the HSS Square Space site to customize the layout and behavior of the product pages.

## Building

Code is compiled using a combination of [Gulp](http://gulpjs.com/), [Babel](https://babeljs.io/), [Uglify](https://github.com/mishoo/UglifyJS2) and [Sass](http://sass-lang.com/).

Use `npm run build` to build once, `npm run watch` for continuous rebuilds.

Output files are placed in `dist` along with source maps that may or may not work.

## Installing

Add the code to the site using these steps:

1. Go to a product page.
2. Click "Settings" at the top.
3. Click on the "Advanced" tab.
4. Scroll down to the "Page Header Code Injection" field.
5. Paste the content of the compiled files like so:

```html
<script>
// dist/product-page-custom.js
</script>
<style type="text/css">
/* dist/product-page-custom.css */
</style>
```

## What it Do?

So far, it does these things on the main product page:

1. Move the product excerpt to the left column, below the photos.
2. Move the price below the variant selection fields.
3. Increase the size of the price text.
4. Change the text on the add-to-cart button to "Choose Details…".

And these things on the pop-up product form (after clicking that first add-to-cart button):

1. Adds a swatch next to the cloth color selection fields to preview the selected color.
2. Adds a link below the cloth color selection fields that opens the cloth color details page.
