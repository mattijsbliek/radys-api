const createQuerySelector = require('utils/createQuerySelector');

module.exports = createQuerySelector(
  '[itemtype$="schema.org/Recipe"] [itemprop="description"], .jetpack-recipe-notes',
  x => {
    if (x.tagName === 'META') {
      return x.content.replace(
        // Delete invisible content from meta tag
        /\[wpurp-searchable-recipe\].*\[\/wpurp-searchable-recipe\]/g,
        '',
      );
    }

    return x.innerHTML;
  },
);
