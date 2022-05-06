import { IMenu, IProduct } from 'typings/api';

export const itemCardConfig = (product: IMenu | IProduct) => {
  const isProduct = 'weight' in product;
  const { name, image } = product;

  return {
    title: name,
    imageUrl: image,
    imageHeight: `140px`,
    imageAlt: 'Product',
    footer: `${isProduct ? 'Product' : 'Menu'} information`,
    html: isProduct ? productConfig(product) : menuConfig(product),
    showCloseButton: true,
    focusConfirm: true,
    buttonsStyling: false,
    customClass: {
      title: 'item-title',
      closeButton: 'item-close',
      image: 'item-image',
      htmlContainer: 'item-description',
      actions: 'item-button-wrapper',
      confirmButton: 'item-button',
      footer: 'item-footer',
    },
    confirmButtonText: 'order',
  };
};

export const menuConfig = (product: IMenu) => {
  const { description, price, products } = product;
  const productNames = products!.map((product) => product.name).join(', ');

  const allergenNames: string[] = [];
  products!.forEach((product) =>
    product.ingredients!.forEach((ingredient) => {
      if (ingredient.isAllergen) {
        allergenNames.push(ingredient.name);
      }
    })
  );

  return `
      <div class='item-text'>
        <p>${description}</p> 
        <h3>Contains:</h3>
        <span>${productNames}</span>
        <h3>Allergens:</h3>
        <span>${allergenNames.join(', ') || 'No allergens'}</span>
      </div>
      <div class='item-actions'>
        <div>
          ${price}uah
        </div>
      </div>
      `;
};

export const productConfig = (product: IProduct) => {
  const { description, price, ingredients, weight } = product;

  const ingredientNames = ingredients!.map((ingredient) => ingredient.name).join(', ');
  const allergenNames =
    ingredients!
      .filter((ingredient) => ingredient.isAllergen)
      .map((ingredient) => ingredient.name)
      .join(', ') || 'No allergens';

  return `
      <div class='item-text'>
        <p>${description}</p> 
        <h3>Ingredients:</h3>
        <span>${ingredientNames}</span>
        <h3>Allergens:</h3>
        <span>${allergenNames}</span>
      </div>
      <div class='item-actions'>
        <div>${weight}</div>
        <div>${price}uah</div>
      </div>
      `;
};
