'use strict';

const request = require('./request.js');
const querystring = require('querystring');

module.exports = async (dbHostname, adminUsername, adminPassword, path, parameters) => {
	
	// validate arguments: TODO

	// prepare querystring: 
		
		let str = ''; 

		if (parameters) {
			str = '?' + querystring.stringify(parameters);
		}

	// create options object: 
		
		const options = {
			method: 'GET',
			hostname: dbHostname,
			path: path + str,
			headers: {
				'Accept': 'application/json',
			},
			auth: `${adminUsername}:${adminPassword}`,
		}

	// send request: 

		const response = await request(options);

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