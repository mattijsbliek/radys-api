/*
 * Properties that we scan the DOM for.
 *
 * Example: http://www.geniuskitchen.com/recipe/sweet-potato-dumplings-44891
 */
const author = require('./properties/author');
const description = require('./properties/description');
const image = require('./properties/image');
const name = require('./properties/name');
const recipeIngredients = require('./properties/recipeIngredients');
const recipeInstructions = require('./properties/recipeInstructions');
const recipeYield = require('./properties/recipeYield');
const totalTime = require('./properties/totalTime');

module.exports = recipe => {
  const items = {
    author,
    description,
    image,
    name,
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

