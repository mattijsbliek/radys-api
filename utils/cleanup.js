const R = require('ramda');
const sanitizer = require('sanitize-html');
const ent = require('ent');
const smartquotes = require('smartquotes');

const cleanString = str =>
  str
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\t+/g, '')
    .replace(/\n+/g, ' ')
    // Replace <br> tags with a newline
    .replace(/<br\s*[\/]?>/gi, '\n');

// Sanitize HTML tags
const sanitize = str =>
  sanitizer(str, {
    textFilter: t => t.replace(/&amp;/g, "&"),
  });

const cleanup = R.pipe(ent.decode, /*smartquotes,*/ cleanString, sanitize);

module.exports = str => {
  if (!str) {
    return str;
  }

  return cleanup(str);
};
