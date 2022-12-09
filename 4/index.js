const { readFileSync } = require('fs');

function syncReadFile(filename) {
	const contents = readFileSync(filename, 'utf-8');

	const arr = contents.split(/\r?\n/);

	return arr;
}

const allElvesPairs = syncReadFile('./input.txt').map((item) =>
	item.split(',')
);

function range(start, end) {
	let rangeArray = [];

	if (start === end) {
		rangeArray = [start, end];
	} else {
		for (i = start; i <= end; i++) {
			rangeArray.push(i);
		}
	}

	return rangeArray;
}

// Part 1

const checkAssignmentOverlap = (elfPair) => {
	let firstElf = elfPair[0].split('-');
	let secondElf = elfPair[1].split('-');

	const firstElfArray = range(Number(firstElf[0]), Number(firstElf[1]));
	const secondElfArray = range(Number(secondElf[0]), Number(secondElf[1]));

	const firstArrayOverlaps =
		firstElfArray.includes(Number(secondElf[0])) &&
		firstElfArray.includes(Number(secondElf[1]));

	const secondArrayOverlaps =
		secondElfArray.includes(Number(firstElf[0])) &&
		secondElfArray.includes(Number(firstElf[1]));

	return firstArrayOverlaps || secondArrayOverlaps;
};

const elvesWithOverlappingAssignments = allElvesPairs.filter((elfPair) =>
	checkAssignmentOverlap(elfPair)
);

console.log(
	'elves with completely overlapping assignments',
	elvesWithOverlappingAssignments.length
);

// Part 2

const checkAssignmentPartialOverlap = (elfPair) => {
	let firstElf = elfPair[0].split('-');
	let secondElf = elfPair[1].split('-');

	return firstElf[0] <= secondElf[1] && firstElf[1] >= secondElf[0];
};

const elvesWithPartialOverlap = allElvesPairs.filter((elfPair) =>
	checkAssignmentPartialOverlap(elfPair)
);

console.log(
	'elves with partial overlapping assigments',
	elvesWithPartialOverlap.length
);
