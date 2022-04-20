import { IMenu, IProduct } from 'typings/api';

export const ProductCardConfig = (product: IMenu | IProduct) => {
  const isProduct = 'weight' in product;
  const { name, image } = product;

  return {
    title: name,
    imageUrl: image,
    imageHeight: `140px`,
    imageAlt: 'Product',
    footer: `${isProduct ? 'Product' : 'Menu'} information`,
    html: isProduct ? ProductConfig(product) : MenuConfig(product),
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

export const MenuConfig = (product: IMenu) => {
  const { description, price, products } = product;
  const productNames = products.map((product) => product.name).join(', ');

  const allergenNames: string[] = [];
  products.forEach((product) =>
    product.ingredients.forEach((ingredient) => {
      if (ingredient.isAllergen) {
        allergenNames.push(ingredient.name);
      }
    })
  );

  return `
      <div class='product-text'>
        <p>${description}</p> 
        <h3>Contains:</h3>
        <span>${productNames}</span>
        <h3>Allergens:</h3>
        <span>${allergenNames.join(', ') || 'No allergens'}</span>
      </div>
      <div class='product-actions'>
        <div>
          ${price}uah
        </div>
      </div>
      `;
};

export const ProductConfig = (product: IProduct) => {
  const { description, price, ingredients, weight } = product;

  const ingredientNames = ingredients.map((ingredient) => ingredient.name).join(', ');
  const allergenNames =
    ingredients
      .filter((ingredient) => ingredient.isAllergen)
      .map((ingredient) => ingredient.name)
      .join(', ') || 'No allergens';

  return `
      <div class='product-text'>
        <p>${description}</p> 
        <h3>Ingredients:</h3>
        <span>${ingredientNames}</span>
        <h3>Allergens:</h3>
        <span>${allergenNames}</span>
      </div>
      <div class='product-actions'>
        <div>${weight}</div>
        <div>${price}uah</div>
      </div>
      `;
};
