const { URL } = require('url');
const { send, json } = require('micro');
const { PORT = 4000 } = process.env;
const http = require('http');
const { JSDOM } = require('jsdom');
const stripIndent = require('strip-indent');

const { UP_STAGE, TIMBER_API_KEY } = process.env;

if (UP_STAGE === 'production') {
  const timber = require('timber');
  const transport = new timber.transports.HTTPS(TIMBER_API_KEY);
  timber.install(transport);
}

/*
 * Services
 */

const fromGeniusKitchen = require('services/genius-kitchen');
const fromJamie = require('services/jamie-oliver');
const fromSchema = require('services/schema');
const fromWashingtonPost = require('services/washington-post');
const fromWPRM = require('services/wordpress-recipe-maker');
const fromWPUR = require('services/wordpress-ultimate-recipe');

/*
 * Utilities
 */
const getCanonicalUrl = require('utils/getCanonicalUrl');

const withCors = res => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', ['POST', 'OPTIONS']);
  res.setHeader('Access-Control-Allow-Headers', [
    'Content-Type',
    'Authorization',
  ]);

  return res;
};

http
  .createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
      return send(withCors(res), 200);
    }

    // Parse request body
    const data = await json(req).catch(e => {
      console.error(e);

      return {
        error: 'Request contains invalid JSON',
      };
    });

    // If request body is not valid, throw error
    if (data.error) {
      return send(res, 422, {
        message: data.error,
      });
    }

    // Get url from body
    const { url } = data;

    // If no url was supplied, throw error
    if (!url) {
      return send(withCors(res), 422, {
        message: 'Could not find `url` in request body.',
      });
    }

    // Construct DOM
    const dom = await JSDOM.fromURL(url).catch(e => {
      console.error(e);

      return {
        error: 'Could not constructor DOM from url',
      };
    });

    // If something went wrong while creating the DOM, throw error
    if (dom.error) {
      return send(withCors(res), 422, {
        message: dom.error,
      });
    }

    // Get canonical URL and remove hash and query string
    const canonicalUrl = new URL(getCanonicalUrl(dom.window.document) || url);
    canonicalUrl.hash = '';
    canonicalUrl.search = '';

    const genericProperties = {
      url: canonicalUrl.toString(),
      hostname: canonicalUrl.hostname,
    };

    /*
     * Jamie Oliver
     */
    if (url.includes('jamieoliver.com')) {
      return send(withCors(res), 200, {
        ...genericProperties,
        ...fromJamie(dom.window.document),
      });
    }

    /*
     * Washington Post
     */
    if (url.includes('washingtonpost.com')) {
      return send(withCors(res), 200, {
        ...genericProperties,
        ...fromWashingtonPost(dom.window.document),
      });
    }

    /*
     * Genius Kitchen
     */
    if (url.includes('geniuskitchen.com')) {
      return send(withCors(res), 200, {
        ...genericProperties,
        ...fromGeniusKitchen(dom.window.document),
      });
    }

    /*
     * Wordpress Recipe Maker
     */
    const isWPRM = dom.window.document.querySelector('.wprm-recipe-container');

    if (isWPRM) {
      return send(withCors(res), 200, {
        ...genericProperties,
        ...fromWPRM(dom.window.document),
      });
    }

    /*
     * Wordpress Ultimate Recipe
     */
    const isWPUR = dom.window.document.querySelector('.wpurp-container');

    if (isWPUR) {
      return send(withCors(res), 200, {
        ...genericProperties,
        ...fromWPUR(dom.window.document),
      });
    }

    /*
     * Recipe schema
     */
    const hasSchema = dom.window.document.querySelector(
      '[itemtype$="schema.org/Recipe"], [itemtype$="data-vocabulary.org/Recipe"]',
    );

    if (hasSchema) {
      return send(withCors(res), 200, {
        ...genericProperties,
        ...fromSchema(dom.window.document),
      });
    }

    /*
     * Error: recipe not found on page
     */
    console.log(
      `Could not parse recipe on hostname ${genericProperties.hostname}`,
    );
    return send(withCors(res), 404, {
      message: 'Couldn’t find a recipe on page.',
    });
  })
  .listen(PORT);
