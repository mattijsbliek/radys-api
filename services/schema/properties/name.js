const createQuerySelector = require('utils/createQuerySelector');

const entryTitle = createQuerySelector('.entry-title');

const h1 = createQuerySelector('h1');

const ogTitle = createQuerySelector('[property="og:title"]', x =>
  x.getAttribute('content'),
);

module.exports = recipe => {
  let name = entryTitle(recipe);

  if (!name) {
    name = h1(recipe);
  }

  if (!name) {
    name = ogTitle(recipe);
  }

  return name;
};
