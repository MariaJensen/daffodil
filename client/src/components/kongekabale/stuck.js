

module.exports = (deck) => {

	let p = 0; 
	let i = 0; 

	while (p<4 && i<56) { 

		if (deck[i] && deck[i].rank === 0 && deck[i+1] === null) {
			
			do {
				p = p+1;
				i = i+1;
			} while (deck[i+1] === null)

		} else {
			i = i+1; 
		}
	}

	return (p === 4);

};

