const http = require('http');

const port = process.env.PORT || 3001;

const server = http.createServer( (req, res) => {
	res.end('test');
});

server.listen(port);

