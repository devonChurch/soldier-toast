'use strict';

/**
 * Question path.
 * @module ./question-path
 */

/**
 * Transforms the heading from each feed question into an applicable portion of the URL path.
 * @example ‘This is a Heading!’ => ‘this-is-a-heading’
 * @param {string} raw - The original question heading.
 * @return {string} The transformed heading.
 */
function transform(raw) {

	return raw.toLowerCase().replace(/([^a-z ])/g, '').replace(/ /g, '-');

}

/** Question path. */
module.exports = transform;
