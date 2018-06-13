module.exports = doc => {
  const canonical = doc.querySelector('[rel="canonical"]');
  if (canonical) {
    return canonical.getAttribute('href');
  }

  const og = doc.querySelector('[property="og:url"]');
  if (og) {
    return og.getAttribute('content');
  }

  return undefined;
}
