const createQuerySelector = require('utils/createQuerySelector');

module.exports = createQuerySelector('.recipe-facts .time', node => {
  node.removeChild(node.children[0]);

  return node.textContent;
});
