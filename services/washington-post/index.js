/*
 * Properties that we scan the DOM for.
 *
 * Example: https://www.washingtonpost.com/recipes/koftas-with-tomato-and-eggplant/13003/
 */
const description = require('./properties/description');
const image = require('./properties/image');
const name = require('services/schema/properties/name');
const recipeIngredients = require('services/schema/properties/recipeIngredients');
const recipeInstructions = require('services/schema/properties/recipeInstructions');
const recipeYield = require('./properties/recipeYield');

module.exports = recipe => {
  const items = {
    description,
    image,
    name,
    recipeIngredients,
    recipeInstructions,
    recipeYield,
  };

  return Object.keys(items).reduce((carry, id) => {
    const x = items[id](recipe);

    if (x) {
      carry[id] = x;
    }

    return carry;
  }, {});
};
