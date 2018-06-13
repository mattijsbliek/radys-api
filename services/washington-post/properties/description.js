const createQuerySelector = require('utils/createQuerySelector');

module.exports = createQuerySelector('.recipe-summary', x => x.innerHTML);
