const fs = require('fs');
const Cloudant = require('../cloudant');

const cloudant = new Cloudant(process.env.DB_HOSTNAME, process.env.DB_ADMIN_USERNAME, process.env.DB_ADMIN_PASSWORD);

const danishFoodName = new Map();
const englishFoodName = new Map();

fs.readFileSync('./foods.csv', 'utf8')
	.split('\n').forEach( line => {
		const arr = line.split('&');
		danishFoodName.set(arr[0], arr[1]);
		englishFoodName.set(arr[0], arr[2]);
	});


cloudant.get('/frida2009/danishFoodName')
	.then( res => {

		const oldFoodIdFromFoodName = new Map(res.body.danishFoodName.map( arr => {
			return [arr[1], arr[0]];
		}));

		const oldFoodNames = new Set(oldFoodIdFromFoodName.keys());
		const newFoodNames = new Set(danishFoodName.values());

		const oldAndNew = new Set();
		const oldNotNew = new Set();
		const newNotOld = new Set();

		oldFoodNames.forEach( (value) => {
			if (newFoodNames.has(value)) {
				oldAndNew.add(value);	
			}

			if(!newFoodNames.has(value)) {
				oldNotNew.add(value);
			}
		});

		newFoodNames.forEach( value => {
			if (!oldFoodNames.has(value)) {
				newNotOld.add(value);
			}
		});

		// console.log('new: ', newFoodNames.size);	
		// console.log('old: ', oldFoodNames.size);
		// console.log('oldNotNew: ', oldNotNew);
		// console.log('oldAndNew: ', oldAndNew.size);
		console.log('newNotOld: ', newNotOld);


	})
	.catch( err => console.log(err));

