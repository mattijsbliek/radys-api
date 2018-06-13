const createQuerySelectorAll = require('utils/createQuerySelectorAll');

module.exports = createQuerySelectorAll(
  '.recipeSteps > li',
  instructions => {
    if (
      instructions.tagName === 'OL' ||
      instructions.tagName === 'UL' ||
      instructions.firstChild.tagName === 'OL' ||
      instructions.firstChild.tagName === 'UL'
    ) {
      return [...instructions.querySelectorAll('li')].map(x => x.textContent);
    }

    return instructions.innerHTML;
  }
);
