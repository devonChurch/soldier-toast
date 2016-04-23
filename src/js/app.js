'use strict';

// const React = require('react');
// const ReactDOM = require('react-dom');
// const {Router, Route, IndexRoute, Redirect, Link, IndexLink, browserHistory} = require('react-router');
// const routes = require('./routes');
// const Immutable = require('immutable');
// const Redux = require('redux');
// const deepFreeze = require('deep-freeze');
// const mountNode = document.getElementById('app');

// const render = require('./render');
//
// render();




console.log('sending request.....');

var request = new XMLHttpRequest();
request.open('GET', '/api/banana/heading-three/', true);

request.onload = function() {
    console.log('request is back...');
    console.log(request);
    console.log('');
    console.log(request.responseText);
  if (request.status >= 200 && request.status < 400) {
    // Success!
    console.log('success');

    // var resp = request.responseText;
  } else {
    // We reached our target server, but it returned an error
    console.log('error');
  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();







// Home
//   -- Show
//      -- Episode
//      -- Episode
//      -- Episode
//   -- Show
//      -- Episode
//      -- Episode
//      -- Episode
//   -- Show
//      -- Episode
//      -- Episode
//      -- Episode

// Home:
// - Header
// - Show list
// - Footer

// Show:
// - Header
// - Episode list (AJAX additional content in)
// - Footer

// Show:
// - Header
// - Player
// - Information
// - Footer

// ReactDOM.render(<HomePage name="Sebastian" />, mountNode);
