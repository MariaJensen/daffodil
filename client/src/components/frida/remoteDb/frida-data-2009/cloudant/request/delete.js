'use strict';

const request = require('./request.js');
const querystring = require('querystring');

module.exports = async (dbHostname, adminUsername, adminPassword, path, body, parameters) => {
	
	// validate arguments: TODO

	// prepare querystring: 
		
		let str = ''; 

		if (parameters) {
			str = '?' + querystring.stringify(parameters);
		}

	// prepare request body:

		const requestBody = JSON.stringify(body);

	// create options object: 
		
		const options = {
			method: 'DELETE',
			hostname: dbHostname,
			path: path + str,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(requestBody),
			},
			auth: `${adminUsername}:${adminPassword}`,
		}

	// send request: 

		const response = await request(options, requestBody);

	// handle response: 

		if (!response.body) {
			return response;
		}

		const responseBody = JSON.parse(response.body)

		return {
			body: responseBody,
			status: response.statusCode,
			headers: response.headers,
		};

}