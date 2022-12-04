const { readFileSync } = require('fs');

function syncReadFile(filename) {
	const contents = readFileSync(filename, 'utf-8');

	const arr = contents.split(/\r?\n/);

	return arr;
}

const allRounds = syncReadFile('./input.txt');

const allRoundsArray = allRounds.map((round) => round.split(' '));

function getRoundResult(round) {
	const [opponentMove, myMove] = round;
	let myPoints = 0;

	switch (myMove) {
		case 'X':
			myPoints = 1;
			if (opponentMove === 'A') {
				return (myPoints = myPoints + 3);
			} else if (opponentMove === 'B') {
				return myPoints;
			} else if (opponentMove === 'C') {
				return (myPoints = myPoints + 6);
			}
			break;
		case 'Y':
			myPoints = 2;
			if (opponentMove === 'A') {
				return (myPoints = myPoints + 6);
			} else if (opponentMove === 'B') {
				return (myPoints = myPoints + 3);
			} else if (opponentMove === 'C') {
				return myPoints;
			}
			break;
		case 'Z':
			myPoints = 3;
			if (opponentMove === 'A') {
				return myPoints;
			} else if (opponentMove === 'B') {
				return (myPoints = myPoints + 6);
			} else if (opponentMove === 'C') {
				return (myPoints = myPoints + 3);
			}
			break;
	}
}

function getPredictedRoundResult(round) {
	const [opponentMove, outcome] = round;
	let myPoints = 0;

	switch (outcome) {
		//lose
		case 'X':
			if (opponentMove === 'A') {
				//choose scissors - 3 points
				return (myPoints = 3);
			} else if (opponentMove === 'B') {
				//choose rock - 1 point
				return (myPoints = 1);
			} else if (opponentMove === 'C') {
				//choose paper - 2 points
				return (myPoints = 2);
			}
			break;
		//draw
		case 'Y':
			myPoints = 3;
			if (opponentMove === 'A') {
				//choose rock
				return (myPoints = myPoints + 1);
			} else if (opponentMove === 'B') {
				//choose paper
				return (myPoints = myPoints + 2);
			} else if (opponentMove === 'C') {
				//choose scissors
				return (myPoints = myPoints + 3);
			}
			break;
		//win
		case 'Z':
			myPoints = 6;
			if (opponentMove === 'A') {
				//choose paper
				return (myPoints = myPoints + 2);
			} else if (opponentMove === 'B') {
				//choose scissors
				return (myPoints = myPoints + 3);
			} else if (opponentMove === 'C') {
				//choose rock
				return (myPoints = myPoints + 1);
			}
			break;
	}
}

function sumOfRounds(allRounds) {
	let myPoints = 0;

	allRounds.forEach((round, index) => {
		let roundResult = getRoundResult(round);
		console.log(
			'round number: ',
			index,
			'moves: ',
			round[0],
			' ',
			round[1],
			' result: ',
			roundResult
		);
		myPoints = myPoints + roundResult;
	});

	return myPoints;
}

function sumOfAllPredictedRouds(allRounds) {
	let myPoints = 0;
	allRounds.forEach((round) => {
		myPoints = myPoints + getPredictedRoundResult(round);
	});

	return myPoints;
}

const result = sumOfRounds(allRoundsArray);

const predictedRoundResult = sumOfAllPredictedRouds(allRoundsArray);

console.log(predictedRoundResult);
