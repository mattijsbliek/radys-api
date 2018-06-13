const createQuerySelector = require('utils/createQuerySelector');

const recipeImage = createQuerySelector('[itemprop="image"]', x =>
  x.getAttribute('src'),
);

const ogImage = createQuerySelector('[property="og:image"]', x =>
  x.getAttribute('content'),
);

module.exports = recipe => {
  let image = recipeImage(recipe);

  if (!image) {
    image = ogImage(recipe);
  }

  return image;
};

