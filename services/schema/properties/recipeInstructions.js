const createQuerySelectorAll = require('utils/createQuerySelectorAll');

module.exports = createQuerySelectorAll(
  '[itemprop="instructions"], [itemprop="recipeInstructions"], .jetpack-recipe-directions, .cookbook-instruction-item',
  instructions => {
    if (
      instructions.tagName === 'OL' ||
      instructions.tagName === 'UL' ||
      instructions.querySelector('ol, ul')
    ) {
      return [...instructions.querySelectorAll('li')].map(x => x.textContent);
    }

    return instructions.innerHTML
      .trim()
      .split('<p>')
      .map(str => str.replace('</p>', ''));
  },
);
