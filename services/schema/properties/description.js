const createQuerySelector = require('utils/createQuerySelector');

module.exports = createQuerySelector('[itemtype$="schema.org/Recipe"] [itemprop="description"], .jetpack-recipe-notes', x => {
  if (x.tagName === 'META') {
    return x.getAttribute('content');
  }

  return x.innerHTML;
});
