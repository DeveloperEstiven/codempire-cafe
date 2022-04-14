import { IMenuResponse, IProductResponse } from 'typings/api';

export const ProductCardConfig = (product: IMenuResponse | IProductResponse) => {
  const isProduct = 'weight' in product;
  const { name, description, price, image /* , ingredients, contains */ } = product;

  return {
    title: name,
    imageUrl: image,
    imageHeight: `140px`,
    imageAlt: 'Product',
    footer: `${isProduct ? 'Product' : 'Menu'} information`,
    html: `
      <div class='product-text'>
        <p>${description}</p> 
        <h3>${isProduct ? 'Ingredients' : 'Contains'}:</h3>
        <span>FIXME</span>
        <h3>Allergens:</h3>
        <span>Nuts, milk</span>
      </div>

      <div class='product-actions'>
        ${isProduct ? `<div>${product.weight}</div>` : ''}
        <div>
          ${price}
        </div>
      </div>
      `,
    showCloseButton: true,
    focusConfirm: true,
    buttonsStyling: false,
    customClass: {
      title: 'product-title',
      closeButton: 'product-close',
      image: 'product-image',
      htmlContainer: 'product-description',
      actions: 'product-button-wrapper',
      confirmButton: 'product-button',
      footer: 'product-footer',
    },
    confirmButtonText: 'order',
  };
};
