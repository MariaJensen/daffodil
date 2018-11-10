
/**
	Let n be a positive integer
	Math.random ~ U( [0;1[ )
	n * Math.random ~ U( [0;n[ )
	Math.floor( n * Math.random ) ~ U( {0, 1, ..., n-1} )
*/

module.exports = x => {
	
	if (!Array.isArray(x)) {
		throw new Error('function shuffle takes an array as its argment');
	}

	let n = x.length;
	let y = [];
	let i;

	while (n>0) {
		i = Math.floor( n * Math.random() );
		y.push(x[i]);
		x.splice(i, 1);
		n = n-1;
	}

	return y;
}