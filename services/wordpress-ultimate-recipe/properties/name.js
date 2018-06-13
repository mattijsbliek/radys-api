const createQuerySelector = require('utils/createQuerySelector');

const title = createQuerySelector('.wpurp-recipe-title');

const ogTitle = createQuerySelector('[property="og:title"]', x =>
  x.getAttribute('content'),
);

module.exports = recipe => {
  let name = title(recipe);

  if (!name) {
    name = ogTitle(recipe);
  }

  return name;
};
