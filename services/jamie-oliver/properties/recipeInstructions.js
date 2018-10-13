const createQuerySelectorAll = require('utils/createQuerySelectorAll');
const withFallback = require('utils/withFallback');
const sanitizeHTML = require('sanitize-html');

// Tested with: https://www.jamieoliver.com/news-and-features/features/make-roast-parsnips/
const unstructuredRecipe = createQuerySelectorAll(
  '.entry-content',
  container => {
    // Clean up some known noise element.
    const galleries = container.querySelector('.galleries');
    if (galleries) {
      // Remove galleries and all nodes after the galleries.
      while (galleries.nextSibling) {
        galleries.nextSibling.parentNode.removeChild(galleries.nextSibling);
      }
      galleries.parentNode.removeChild(galleries);
    }

    const shareBar = container.querySelector('#share-bar-hz');
    if (shareBar) {
      shareBar.parentNode.removeChild(shareBar);
    }

    return sanitizeHTML(
    	container.innerHTML
        // Strip <p> tags
	      .replace(/\<p.*?\>/gi, '')
    	  // Replace </p> with <br>, will later be converted to \n in cleanup
        .replace(/\<\/p\>/g, '<br>'),
      {
			  // Allow <br> tags, see above
        allowedTags: ['br']
		  }
	  );
  }
);

const structuredRecipe = createQuerySelectorAll(
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

module.exports = withFallback(unstructuredRecipe)(structuredRecipe);
