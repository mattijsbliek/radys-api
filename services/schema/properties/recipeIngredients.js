const createQuerySelectorAll = require('utils/createQuerySelectorAll');

module.exports = createQuerySelectorAll(
  '[itemprop="ingredient"], [itemprop="ingredients"], [itemprop="recipeIngredient"], .cookbook-ingredient-item',
  ingredient => {
    if (ingredient.tagName === 'META') {
      return ingredient.content;
    }

    return ingredient;
  },
);
