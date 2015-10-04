# Notes For HSS Square Space Site

Custom code can be inserted into the header of the product pages. We can either inject code, or a script tag that loads some code.

## Product Display

- Move the `.product-excerpt` into `#productGallery`.
- Move the `.product-price` below the variant fields.
- Increase font size of `.product-price` to ~36px. Maybe add a label using `::before`.
- Change the "Add to Cart" button (`.sqs-add-to-cart-button-inner`) text to something like "Choose Details…"

## Portfolio Box Form (and other forms)

- Add a color swatch to the right of each cloth color select. (Find these by looking for `label`s containing "Cloth Color"?).

```html
<span class="product-cloth-color-swatch"></span>
```

```css
.product-cloth-color-swatch {
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: top;
  margin-top: 10px;
  background-size: cover;
  background-image: url(...);
}
```
