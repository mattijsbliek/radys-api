const moment = require('moment');
const createQuerySelector = require('utils/createQuerySelector');

const findTime = createQuerySelector(
  '.wpurp-recipe-cook-time',
);
const findUnit = createQuerySelector(
  '.wpurp-recipe-cook-time-text',
);

module.exports = dom => {
  const time = findTime(dom);
  const unit = findUnit(dom);

  if (!time || !unit) {
    return undefined;
  }

  return `${time} ${unit}`;
};
