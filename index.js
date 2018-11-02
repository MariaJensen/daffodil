'use strict';

const http = require('http');
const path = require('path');
const express = require('express');

const port = process.env.PORT || 3001;

const app = express();

app.use('/', express.static(path.join(__dirname, 'client/build')));

app.get('/test', (req, res) => {
	res.send('testing 1,2');
});

app.get('/', (req, res) => {

})

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

