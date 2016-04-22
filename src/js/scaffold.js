const scaffold = ({
	title = 'This is a title',
	desc = 'This is a description',
	content = 'error',
	store = null
}) => {

	return (
		`<!DOCTYPE html>
	    <html>
	        <head>
	            <meta charset="utf-8">
	            <meta http-equiv="x-ua-compatible" content="ie=edge">
	            <title>${title}</title>
	            <meta name="description" content="${desc}">
	            <meta name="viewport" content="width=device-width, initial-scale=1">
	            <link rel="apple-touch-icon" href="apple-touch-icon.png">
	            <link rel="stylesheet" href="/style.css">
				<script id="baseState">
					window.__REDUX_STATE__ = ${JSON.stringify(store)};
				</script>
	        </head>
	        <body>
	            <div id="app" class="app"></div>
	            <script src="/client.js"></script>
	        </body>
	    </html>`
	);

};

module.exports = scaffold;
