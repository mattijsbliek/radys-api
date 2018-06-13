const moment = require('moment');
const createQuerySelector = require('utils/createQuerySelector');

const findTime = createQuerySelector('.wprm-recipe-prep_time');
const findUnit = createQuerySelector('.wprm-recipe-prep_time-unit');

module.exports = dom => {
  const time = findTime(dom);
  const unit = findUnit(dom);

  if (!time || !unit) {
    return undefined;
  }

  return `${time} ${unit}`;
};
