'use strict';

function generate(path) {

	return path.toLowerCase().replace(/([^a-z ])/g, '').replace(/ /g, '-');

}

module.exports = generate;
