const createQuerySelector = require('utils/createQuerySelector');

module.exports = createQuerySelector('[itemtype$="schema.org/Recipe"] [itemprop="author"], [name="shareaholic:article_author_name"]', x => {
  if (x.tagName === 'META') {
    return x.getAttribute('content');
  }

  return x.textContent;
});

