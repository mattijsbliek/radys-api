const moment = require('moment');
const createQuerySelector = require('utils/createQuerySelector');

const findServings = createQuerySelector(
  '.wprm-recipe-servings',
);
const findUnit = createQuerySelector(
  '.wprm-recipe-servings-unit',
);

module.exports = dom => {
  const servings = findServings(dom);
  const unit = findUnit(dom);

  if (!servings) {
    return undefined;
  }

  if (!unit) {
    return servings;
  }

  return `${servings} ${unit}`;
};
