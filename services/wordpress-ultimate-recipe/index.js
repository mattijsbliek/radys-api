/*
 * Properties that we scan the DOM for.
 *
 * Example: http://wallflowerkitchen.com/healthy-salted-caramel-sauce/
 */
const author = require('./properties/author');
const cookTime = require('./properties/cookTime');
const description = require('./properties/description');
const image = require('./properties/image');
const name = require('./properties/name');
const prepTime = require('./properties/prepTime');
const recipeIngredients = require('./properties/recipeIngredients');
const recipeInstructions = require('./properties/recipeInstructions');
const recipeYield = require('./properties/recipeYield');
const totalTime = require('./properties/totalTime');

module.exports = recipe => {
  const items = {
    author,
    cookTime,
    description,
    image,
    name,
    prepTime,
    recipeIngredients,
    recipeInstructions,
    recipeYield,
    totalTime,
  };

  return Object.keys(items).reduce((carry, id) => {
    const x = items[id](recipe);

    if (x) {
      carry[id] = x;
    }

    return carry;
  }, {});
};

