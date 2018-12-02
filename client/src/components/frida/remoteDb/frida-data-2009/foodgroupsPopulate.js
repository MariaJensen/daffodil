const fs = require('fs');
const Cloudant = require('./cloudant');

const stripLeadingZeroes = (str) => {
	if (!str.startsWith('0') || str === '0') {
		return str;	
	}	
	return(stripLeadingZeroes(str.slice(1)));
};

const groupNameDan = new Map();
const groupNameEng = new Map();
const subgroups = new Map();

fs.readFileSync('./foods/maingroups.txt', 'utf8')
	.split('\n')
	.forEach( line => {
		const arr = line.split('\t');
		const groupId = stripLeadingZeroes(arr[0]);
		groupNameDan.set(groupId, arr[2].trim());
		groupNameEng.set(groupId, arr[1].trim());
		subgroups.set(groupId, new Map());
	});

fs.readFileSync('./foods/subgroups.txt', 'utf8')
	.split('\n')
	.forEach( (line) => {
		
		const arr = line.split('\t');

		const groupId = stripLeadingZeroes(arr[0].trim());
		const subgroupId = stripLeadingZeroes(arr[1].trim());
		const subgroupNameEng = arr[2].trim();
		const subgroupNameDan = arr[3].trim();

		subgroups.get(groupId).set(subgroupId, {
			subgroupNameEng: subgroupNameEng, 
			subgroupNameDan: subgroupNameDan,
		});
	});

const groupDocs = [...groupNameDan.keys()].map( groupId => {
	return {
		_id: 'group-' + groupId,
		groupId: groupId,
		groupNameDan: groupNameDan.get(groupId),
		groupNameEng: groupNameEng.get(groupId),
		subgroups: [...subgroups.get(groupId).entries()].map( arr => {
			return {
				subgroupId: arr[0],
				subgroupNameDan: arr[1].subgroupNameDan,
				subgroupNameEng: arr[1].subgroupNameEng,
			};
		})
	}
})

console.log(groupDocs[0].subgroups[0]);


const cloudant = new Cloudant(process.env.DB_HOSTNAME, process.env.DB_ADMIN_USERNAME, process.env.DB_ADMIN_PASSWORD);

cloudant.post('/frida2009/_bulk_docs', {docs: groupDocs}).then(res => console.log(res)).catch(err => console.log(err));
