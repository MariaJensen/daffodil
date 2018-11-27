const fs = require('fs');
const http = require('http');
const Cloudant = require('../../cloudant');

const stripLeadingZeroes = (str) => {
	if (!str.startsWith('0') || str === '0') {
		return str;	
	}	
	return(stripLeadingZeroes(str.slice(1)));
};

const danishFoodName2009 = new Map();
const englishFoodName2009 = new Map();
const maingroup = new Map();
const subgroup = new Map();
const contents = new Map();

fs.readFileSync('./DKFoodComp701_2009-11-16.txt', 'latin1')
	.split('\r\n')
	.forEach( line => {
		const foodId = stripLeadingZeroes(line.substring(2,6));
		const descriptor = line.substring(6,9);
		const value = line.substring(10);

		if (descriptor === 'SYS' || descriptor === 'YLD' || descriptor === 'NCF' || descriptor === 'FCF' || descriptor === 'END') {
			return; 
		}

		if (descriptor === 'DAN') {
			danishFoodName2009.set(foodId, value);
			return;
		}

		if (descriptor === 'ENG') {
			englishFoodName2009.set(foodId, value);
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
			contents.get(foodId).set(compId, content);
		}
	});

const danishMaingroupName = new Map();
const englishMaingroupName = new Map();

fs.readFileSync('./maingroups.txt', 'utf8')
	.split('\n')
	.forEach( line => {
		const arr = line.split('\t');
		danishMaingroupName.set(stripLeadingZeroes(arr[0]), arr[2].trim());
		englishMaingroupName.set(stripLeadingZeroes(arr[0]), arr[1].trim());
	});

const danishSubgroupNames= new Map();
const englishSubgroupNames = new Map();

fs.readFileSync('./subgroups.txt', 'utf8')
	.split('\n')
	.forEach( (line) => {
		
		const arr = line.split('\t');

		const maingroup = stripLeadingZeroes(arr[0].trim());
		const subgroup = stripLeadingZeroes(arr[1].trim());
		const englishName = arr[2].trim();
		const danishName = arr[3].trim();
		
		if (!danishSubgroupNames.get(maingroup)) {
			danishSubgroupNames.set(maingroup, new Map());
			englishSubgroupNames.set(maingroup, new Map());
		}

		danishSubgroupNames.get(maingroup).set(subgroup, danishName);
		englishSubgroupNames.get(maingroup).set(subgroup, englishName);

	});

const docs = [...danishFoodName2009.keys()].map( foodId => {
	return {
		_id: foodId,
		maingroup: maingroup.get(foodId),
		subgroup: subgroup.get(foodId),
		contents: [...contents.get(foodId)],
	};	
});

const body = {
	docs: docs,
};

const foodName = new Map();

[...danishFoodName2009.keys()].forEach( foodId => {
	const doc = {
		nameDan: danishFoodName2009.get(foodId),
		nameEng: englishFoodName2009.get(foodId),
	};
	foodName.set(foodId, doc);
})

const body2 = {
	_id: 'foodName',
	foodName: [...foodName],
};


const foodGroup = new Map();

[...danishMaingroupName.keys()].forEach( foodGroupId => {
	const doc = {
		nameDan: danishMaingroupName.get(foodGroupId),
		nameEng: englishMaingroupName.get(foodGroupId),
		subgroupsDan: [...danishSubgroupNames.get(foodGroupId)],
		subgroupsEng: [...englishSubgroupNames.get(foodGroupId)],
	};
	foodGroup.set(foodGroupId, doc);
});

const body3 = {
	_id: 'foodGroup',
	foodGroup: [...foodGroup],
};


console.log(Buffer.byteLength(JSON.stringify(body)));

const cloudant = new Cloudant(process.env.DB_HOSTNAME, process.env.DB_ADMIN_USERNAME, process.env.DB_ADMIN_PASSWORD);

cloudant.post('/frida2009/_bulk_docs', body).then(res => console.log(res)).catch(err => console.log(err));
cloudant.post('/frida2009', body2).then(res => console.log(res)).catch(err => console.log(err));
cloudant.post('/frida2009', body3).then(res => console.log(res)).catch(err => console.log(err));





