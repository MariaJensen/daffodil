
module.exports = () => {

	let orderedDeck = [];

	for (let k=0, i=0; i<4; i++) {
		for (let j=0; j<13; j++) {
			orderedDeck[k] = {suit: i,	rank: j}
			k++;
		}
	}

	const shuffledDeck = [];
	let n = orderedDeck.length; 
	let i;

	while (n>0) {
		i = Math.floor(n*Math.random()); // ~ U({0, 1, ..., n-1} 

		if (orderedDeck[i].rank === 12) {
			shuffledDeck.push(orderedDeck[i], null);
			orderedDeck.splice(i, 1);
		} else {
			shuffledDeck.push(orderedDeck[i]);
			orderedDeck.splice(i, 1);
		}

		n = n-1;
	}

	return shuffledDeck;
};

