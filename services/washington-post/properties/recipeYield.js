const createQuerySelector = require('utils/createQuerySelector');

module.exports = createQuerySelector('.ingredients', node => {
  // WP returns 'Servings: 4', so we split off everything untill after the colon
  return node.children[0].textContent.split(':').pop().trim();
});
