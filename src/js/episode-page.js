'use strict';

const React = require('react');
const {Link} = require('react-router');

class EpisodePage extends React.Component {

	constructor() {

		console.log('** EpisodePage (constructor)');

		super();
		this.logMe = this.logMe.bind(this);

	}

	logMe() {

		console.log('** EpisodePage (clicked)');

	}

	render() {

		console.log('this.props.params');
		console.log(this.props.params);

		return (
			<div>
				<h1>Episode page</h1>
				<button onClick={this.logMe}>Click me</button>
				<Link to="/">Home</Link>
				<Link to="/fruit">Fruit</Link>
				<Link to="/fruit/banana">Banana</Link>
			</div>
		);

	}

}

// <li>{json.directory}</li>
// <li>{json.title}</li>
// <li>{json.desc}</li>

module.exports = EpisodePage;
