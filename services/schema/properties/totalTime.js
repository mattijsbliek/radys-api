const moment = require('moment');
const createQuerySelector = require('utils/createQuerySelector');

module.exports = createQuerySelector('[itemprop="totalTime"]', x => {
  if (x.tagName === 'META' || x.getAttribute('datetime')) {
    return moment.duration(x.getAttribute('content') || x.getAttribute('datetime')).humanize();
  }

  return x.textContent;
});
