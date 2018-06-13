const createQuerySelector = require('utils/createQuerySelector');

const title = createQuerySelector('.wprm-recipe-name');

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
