const createQuerySelector = require('utils/createQuerySelector');

module.exports = createQuerySelector('.recipe-facts .yield', node => {
  node.removeChild(node.children[0]);

  return node.textContent;
});
