'use strict';

const feed = require('./feed.json');

const distillFeed = (breadCrumb, data) => {

    let distilled;
    let i = 0;

    const query = (breadCrumb, data, i) => {

        console.log(breadCrumb, i, breadCrumb[i]);

        if (i >= breadCrumb.length || !data.children) {
            console.log('i >== breadCrumb.length || !data.children');
            return;
        }

        const ref = breadCrumb[i];
        let match;

        data.children.map((page) => {

            console.log('testing', page.directory, '');

            if (page.directory === breadCrumb[i]) {
                console.log('*** page match', page.directory, '');
                match = page;
            }

        });

        i += 1;

        distilled = match;
        // console.log(distilled);

        query(breadCrumb, match, i);

    };

    query(breadCrumb, data, i);

    return distilled;

};

const distillPath = (path) => {

    const index = path.indexOf('?');
    path = index > 0 ? path = path.substr(index + 1) : path;
    path = path.slice(-1) === '/' ? path.substr(0, path.length - 1) : path;

    return path;

};

const fetch = (path) => {

    // Raw path example /fruit OR /fruit/banana OR /app?/fruit/banana

    console.log('path BEFORE', path);
    path = distillPath(path);
    console.log('path AFTER', path);

    if (path !== '/') {

        console.log('NOT homepage');

        const breadCrumb = path.slice(1).split('/');

        return distillFeed(breadCrumb, feed);


    } else {

        console.log('IS homepage');

        return feed;

    }

};

module.exports = fetch;
