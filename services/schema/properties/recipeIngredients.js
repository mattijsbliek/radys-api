const createQuerySelectorAll = require('utils/createQuerySelectorAll');

module.exports = createQuerySelectorAll(
  '[itemprop="ingredient"], [itemprop="ingredients"], [itemprop="recipeIngredient"], .cookbook-ingredient-item',
);
