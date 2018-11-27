const fs = require('fs');
const http = require('http');
const Cloudant = require('../../cloudant');

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

const compIds = fs.readFileSync('./comp-id.txt', 'utf8')
	.split('\n')
	.map( item => {
		return stripLeadingZeroes(item);
	});

fs.readFileSync('./danish-names.txt', 'utf8')
	.split('\n')
	.forEach( (name, index) => {
		danishCompName.set(compIds[index], name);
	});

fs.readFileSync('./english-names.txt', 'utf8')
	.split('\n')
	.forEach( (name, index) => {
		englishCompName.set(compIds[index], name);
	});
	
fs.readFileSync('./units.txt', 'utf8')
	.split('\n')
	.forEach( (name, index) => {
		compUnit.set(compIds[index], name);
	});

fs.readFileSync('./units-explanation.txt', 'utf8')
	.split('\n')
	.forEach( line => {
		const arr = line.split('\t');
		unitExplanation.set(arr[0], arr[1]);
	});

const comp = new Map();

compIds.forEach( compId => {
	const obj = {
		nameDan: danishCompName.get(compId),
		nameEng: englishCompName.get(compId),
		unit: compUnit.get(compId),
		unitExplanation: unitExplanation.get(compUnit.get(compId)), 
	};
	comp.set(compId, obj);
});

const body = {
	_id: 'comp',
	comp: [...comp],	
};

const cloudant = new Cloudant(process.env.DB_HOSTNAME, process.env.DB_ADMIN_USERNAME, process.env.DB_ADMIN_PASSWORD);

cloudant.post('/frida2009', body)
	.then(res => console.log(res))
	.catch(err => console.log(err));
