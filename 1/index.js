const { readFileSync } = require('fs');

function syncReadFile(filename) {
	const contents = readFileSync(filename, 'utf-8');

	const arr = contents.split(/\r?\n/);

	return arr;
}

const elvesInput = syncReadFile('./input.txt');

function getAllElvesItemSum(list) {
	let newList = [...list];
	let elvesWithItems = [];
	let elfSum = 0;

	for (let i = 0; i < newList.length; i++) {
		if (newList[i] !== '') {
			elfSum = elfSum + Number(newList[i]);
		}

		if (newList[i + 1] === '') {
			elvesWithItems.push(elfSum);
			elfSum = 0;
		}
	}

	return elvesWithItems;
}

const allElves = getAllElvesItemSum(elvesInput);
const sortedElves = allElves.sort(function (a, b) {
	return a - b;
});

const topThreeSum =
	sortedElves[sortedElves.length - 1] +
	sortedElves[sortedElves.length - 2] +
	sortedElves[sortedElves.length - 3];

console.log('biggestValue', sortedElves[sortedElves.length - 1]);
console.log('topThreeSum', topThreeSum);
