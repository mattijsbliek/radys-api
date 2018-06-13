const cookTime = require('./properties/cookTime');
const description = require('./properties/description');
const image = require('./properties/image');
const name = require('./properties/name');
const recipeIngredients = require('./properties/recipeIngredients');
const recipeInstructions = require('./properties/recipeInstructions');
const recipeYield = require('./properties/recipeYield');

module.exports = recipe => {
  const items = {
    cookTime,
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
  }, {
    author: 'Jamie Oliver',
  });
};


