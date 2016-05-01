'use strict';

const debug = require('debug')('props');
const getFeed = require('./feed');

/**
 * Extract only the relevant passive topic data from the JSON. We also change
 * the data structure from an object into an array for easy looping with React.
 * @param {object} topics - Topic data from feed.json
 * @return {array} Extracted topic data.
 */
function extractTopics(topics) {

    debug('extractTopics');

    const keys = Object.keys(topics);
    let json = [];

    for (let key of keys) {

        const topic = topics[key];
        const data = {...topic.overview, url: `/${key}`, total: topic.questions.length};

        json.push(data);

    }

    return json;

}

/**
 * Consolidate only the data associated with passive props.
 * @param {object} feed - The raw feed data from feed.json
 * @param {object} feed.hero - The hero data extracted via destructuring.
 * @param {object} feed.topics - The topics data extracted via destructuring.
 * @returns {object} The distilled JSON.
 */
function distillFeed({hero, topics}) {

    debug('distillFeed');

    return {
        hero,
        topics: extractTopics(topics)
    };

}

/**
 * Extracts the passive props (will not change during the executions duration)
 * from feed.json
 * @return {object} The extracted JSON.
 */
function extract() {

    debug('extract (passive props)...');

    const feed = getFeed();
    const json = distillFeed(feed);

    return json;

}

module.exports = extract;
