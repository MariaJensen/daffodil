const fs = require('fs');
const Cloudant = require('./cloudant');

const stripLeadingZeroes = (str) => {
	if (!str.startsWith('0') || str === '0') {
		return str;	
	}	
	return(stripLeadingZeroes(str.slice(1)));
};

const nameDan = new Map();
const nameEng = new Map();
const maingroup = new Map();
const subgroup = new Map();
const contents = new Map();

fs.readFileSync('./foods/DKFoodComp701_2009-11-16.txt', 'latin1')
	.split('\r\n')
	.forEach( line => {
		const foodId = stripLeadingZeroes(line.substring(2,6));
		const descriptor = line.substring(6,9);
		const value = line.substring(10);

		if (descriptor === 'SYS' || descriptor === 'YLD' || descriptor === 'NCF' || descriptor === 'FCF' || descriptor === 'END') {
			return; 
		}

		if (descriptor === 'DAN') {
			nameDan.set(foodId, value);
			return;
		}

		if (descriptor === 'ENG') {
			nameEng.set(foodId, value);
			return;
		}

		if (descriptor === 'MGR') {
			maingroup.set(foodId, stripLeadingZeroes(value));
			return; 
		}

		if (descriptor === 'SGR') {
			subgroup.set(foodId, stripLeadingZeroes(value));
			return; 
		}

		// Now it can be assumed that descriptor is a compId

		const compId = stripLeadingZeroes(descriptor);
		const content = parseFloat(value.slice(0,5));

		if (!contents.get(foodId)) {
			contents.set(foodId, new Map());
		}
		
		if (content) {
			// skipping all zero values
			contents.get(foodId).set(compId, content);
		}
	});

const foodIds = [...nameDan.keys()];

const foodDocs = foodIds.map( foodId => {

	const contentsDoc = {}; 

	contents.get(foodId).forEach( (content, compId) => {
		contentsDoc[compId] = content; 
	});

	return {
		_id: foodId,
		type: 'foodinfo',
		nameDan: nameDan.get(foodId),
		nameEng: nameEng.get(foodId),
		maingroup: maingroup.get(foodId),
		subgroup: subgroup.get(foodId),
		contents: contentsDoc,
	};
}); 

const cloudant = new Cloudant(process.env.DB_HOSTNAME, process.env.DB_ADMIN_USERNAME, process.env.DB_ADMIN_PASSWORD);

cloudant.post('/frida2009/_bulk_docs', {docs: foodDocs}).then(res => console.log(res)).catch(err => console.log(err));

