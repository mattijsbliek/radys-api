const createQuerySelector = require('utils/createQuerySelector');

module.exports = createQuerySelector('[property="og:image"]', x =>
  x.getAttribute('content'),
);

