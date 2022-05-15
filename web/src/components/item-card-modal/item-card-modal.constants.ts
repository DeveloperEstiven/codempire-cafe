import { IMenu, IProduct } from 'typings/api';

export const getMenuInfo = ({ products }: IMenu) => {
  const productNames = products?.map((product) => product.name).join(', ');

  const allergens: string[] = [];
  products?.forEach((product) =>
    product?.ingredients?.forEach((ingredient) => {
      if (ingredient.isAllergen) {
        allergens.push(ingredient.name);
      }
    })
  );

  const allergenNames = allergens.join(', ') || 'No allergens';
  return [productNames, allergenNames];
};

export const getProductInfo = ({ ingredients }: IProduct) => {
  const ingredientNames = ingredients?.map((ingredient) => ingredient.name).join(', ');

  const allergenNames =
    ingredients
      ?.filter((ingredient) => ingredient.isAllergen)
      .map((ingredient) => ingredient.name)
      .join(', ') || 'No allergens';

  return [ingredientNames, allergenNames];
};
