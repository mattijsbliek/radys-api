const createQuerySelectorAll = require('utils/createQuerySelectorAll');

// Omit last child because it is a "submit a correction" link
module.exports = createQuerySelectorAll('.directions li:not(:last-child)');
