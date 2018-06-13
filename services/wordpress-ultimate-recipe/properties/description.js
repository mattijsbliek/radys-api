const createQuerySelector = require('utils/createQuerySelector');

module.exports = createQuerySelector('.wpurp-recipe-description', x => x.innerHTML);
