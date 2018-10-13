/**
 * Higher-order function, creating a function that will execute its given fallback in case it yields
 * no results.
 */
module.exports = fallbackFn => primaryFn => (...args) => {
  const result = primaryFn(...args);
  return result.length ? result : fallbackFn(...args);
};
