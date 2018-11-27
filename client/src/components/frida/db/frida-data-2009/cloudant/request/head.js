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
			method: 'HEAD',
			hostname: dbHostname,
			path: path + str,
			auth: `${adminUsername}:${adminPassword}`,
		}

	// send request: 

		const response = await request(options);

	// handle response: 

		return {
			status: response.statusCode,
			headers: response.headers,
		};

}