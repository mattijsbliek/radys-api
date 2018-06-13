const createQuerySelector = require('utils/createQuerySelector');

module.exports = createQuerySelector('.recipe-detail.time', time => {
  const child = time.querySelector('.detail_desc');
  time.removeChild(child);
  return time.textContent;
});
