'use strict';

const head = require('./request/head.js');
const get = require('./request/get.js');
const post = require('./request/post.js');
const put = require('./request/put.js');
const del = require('./request/delete.js');

module.exports = class Cloudant {

	constructor(dbHostname, adminUsername, adminPassword) {
		this.hostname = dbHostname;
		this.username = adminUsername;
		this.password = adminPassword;
	}

	head(path, parameters) {
		return head(this.hostname, this.username, this.password, path, parameters);
	}

	get(path, parameters) {
		return get(this.hostname, this.username, this.password, path, parameters);
	}

	post(path, body, parameters) {
		return post(this.hostname, this.username, this.password, path, body, parameters);
	}

	put(path, body, parameters) {
		return put(this.hostname, this.username, this.password, path, body, parameters);
	}

	delete(path, body, parameters) {
		return del(this.hostname, this.username, this.password, path, body, parameters);
	}

}