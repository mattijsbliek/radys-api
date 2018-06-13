const createQuerySelector = require('utils/createQuerySelector');

module.exports = createQuerySelector('[property="og:site_name"], [name="shareaholic:article_author_name"]', x => {
  if (x.tagName === 'META') {
    return x.getAttribute('content');
  }

  return x.textContent;
});

