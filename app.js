const express = require('express');
const http = require('http');
const path = require('path');
const OAuth = require('oauth');
const OAuth2 = OAuth.OAuth2;

let app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

http
	.createServer(app)
	.listen(
		app.get('port'),
		() => {
			console.log(`Express.js server is listening on port ${app.get('port')}`)
		}
	);