const Cloudant = require('../cloudant');
const cloudant = new Cloudant(process.env.DB_HOSTNAME, process.env.DB_ADMIN_USERNAME, process.env.DB_ADMIN_PASSWORD);

const getFood = function(doc) {
	if (doc._id === 'contents') {
		doc.contents.forEach( function(row) {
			emit(row[0], row[1]);
		});
	}
};

const doc = {
	_id: '_design/getFood',
	views: {
		getFood: {
			map: getFood.toString(),
		}
	}
};

// cloudant.post('/frida2009/', doc).then(res => console.log(res)).catch(err => console.log(err));

cloudant.get('/frida2009/_design/getFood/_view/getFood', {key: '"1"'}).then(res => console.log(new Map(res.body.rows[0].value))).catch(err => console.log(err));