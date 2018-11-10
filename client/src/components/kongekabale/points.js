
module.exports = (deck) => {

	let p = 0; 
	let k;

	for(let i=0; i<4; i++) {
		
		k = i*14;

		if (deck[k] && deck[k].rank === 12) {

			p = p+1; 

			while (
				deck[k+1] && 
				deck[k+1].suit === deck[k].suit && 
				deck[k+1].rank === deck[k].rank-1
			) {
				p = p+1;
				k = k+1;
			}
		}

	}

	return p;
};

