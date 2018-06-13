const cleanup = require('./cleanup');

module.exports = (query, callback = x => x.textContent) => recipe => {
  const result = recipe.querySelector(query);

  if (!result) {
    return undefined;
  }

  return cleanup(callback(result));
};
