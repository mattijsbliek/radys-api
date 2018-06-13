const cleanup = require('./cleanup');

const isNotEmpty = item => item !== '' && item !== '\n';

module.exports = (query, callback = x => x.textContent) => recipe => {
  const results = recipe.querySelectorAll(query);

  if (!results) {
    return undefined;
  }

  return [...results]
    .map(callback)
    .reduce((carry, item) => {
      // If this is a nested array, flatmap it.
      if (Array.isArray(item)) {
        carry = carry.concat(item.filter(isNotEmpty).map(cleanup));
      } else if (isNotEmpty(item)) {
        carry.push(cleanup(item));
      }

      return carry;
    }, []);
};
