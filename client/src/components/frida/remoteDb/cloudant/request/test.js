'use strict';

const put = require('./put.js');
const post = require('./post.js');
const del = require('./delete.js');
const get = require('./get.js');

const dbHostname = process.env.DB_HOSTNAME;
const adminUsername = process.env.DB_ADMIN_USERNAME;
const adminPassword = process.env.DB_ADMIN_PASSWORD;

(async () => {

	try {
		const createDb = await put(dbHostname, adminUsername, adminPassword, '/test', {});
		console.log(createDb);

		const getDb = await get(dbHostname, adminUsername, adminPassword, '/test');
		console.log(getDb);

		const createDoc = await post(dbHostname, adminUsername, adminPassword, '/test', {
			Jeremiah: 'Bullfrog'
		});
		console.log(createDoc);

		const getDoc = await get(dbHostname, adminUsername, adminPassword,)

		// const updateDoc = await put(dbHostname, adminUsername, adminPassword, '/test/45212fa1dac7df9c45c9c31e1fd2c612', {
		// 	_id: '45212fa1dac7df9c45c9c31e1fd2c612',
		// 	_rev: '1-f388d877b5b763a15367e9d700e80f4b',
		// 	Jeremiah: 'A good friend of mine',
		// });
		// console.log(updateDoc);

		// const deleteDoc = await del(dbHostname, adminUsername, adminPassword, '/test/45212fa1dac7df9c45c9c31e1fd2c612', {}, {
		// 	rev: '2-f33864ad59de38674456dca050f7ff3c',
		// }); 
		// console.log(deleteDoc);
		
		const deleteDb = await del(dbHostname, adminUsername, adminPassword, '/test', {});
		console.log(deleteDb);		

	} catch(err) {
		console.log(err.message);
	}

})();

