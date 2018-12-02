const fs = require('fs');
const Cloudant = require('./cloudant');

const stripLeadingZeroes = (str) => {
	if (!str.startsWith('0') || str === '0') {
		return str;	
	}	
	return(stripLeadingZeroes(str.slice(1)));
};

const danishCompName = new Map();
const englishCompName = new Map();
const compUnit = new Map();
const unitExplanation = new Map();

const compIds = fs.readFileSync('./comps/comp-id.txt', 'utf8')
	.split('\n')
	.map( item => {
		return stripLeadingZeroes(item);
	});

fs.readFileSync('./comps/danish-names.txt', 'utf8')
	.split('\n')
	.forEach( (name, index) => {
		danishCompName.set(compIds[index], name);
	});

fs.readFileSync('./comps/english-names.txt', 'utf8')
	.split('\n')
	.forEach( (name, index) => {
		englishCompName.set(compIds[index], name);
	});
	
fs.readFileSync('./comps/units.txt', 'utf8')
	.split('\n')
	.forEach( (name, index) => {
		compUnit.set(compIds[index], name);
	});

fs.readFileSync('./comps/units-explanation.txt', 'utf8')
	.split('\n')
	.forEach( line => {
		const arr = line.split('\t');
		unitExplanation.set(arr[0], arr[1]);
	});

const compDocs = compIds.map( compId => {
	return {
		_id: 'comp-' + compId,
		compId: compId,
		compNameDan: danishCompName.get(compId),
		compNameEng: englishCompName.get(compId),
		unit: compUnit.get(compId),
		unitExplanation: unitExplanation.get(compUnit.get(compId)),
	};
});

const cloudant = new Cloudant(process.env.DB_HOSTNAME, process.env.DB_ADMIN_USERNAME, process.env.DB_ADMIN_PASSWORD);

cloudant.post('/frida2009/_bulk_docs', {docs:compDocs}).then(res => console.log(res)).catch(err => console.log(err));