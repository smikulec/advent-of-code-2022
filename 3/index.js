const { readFileSync } = require('fs');

function syncReadFile(filename) {
	const contents = readFileSync(filename, 'utf-8');

	const arr = contents.split(/\r?\n/);

	return arr;
}

const allRucksacks = syncReadFile('./input.txt');

const alphaUpperCase = Array.from(Array(26)).map((e, i) => i + 65);
const upperCaseAlphabet = alphaUpperCase.map((x) => String.fromCharCode(x));

const alphaLowerCase = Array.from(Array(26)).map((e, i) => i + 97);
const lowerCaseAlphabet = alphaLowerCase.map((x) => String.fromCharCode(x));

const alphabet = [...lowerCaseAlphabet, ...upperCaseAlphabet];

const getSharedItemsPriority = (
	firstCompartmentItems,
	secondCompartmentItems
) => {
	let priorityValue = 0;

	for (let i = 0; i < firstCompartmentItems.length; i++) {
		const char = firstCompartmentItems[i];
		if (secondCompartmentItems.includes(char)) {
			priorityValue = alphabet.indexOf(char) + 1;
		}
	}

	return priorityValue;
};

const getAllPriorities = (allRuckacks) => {
	return allRuckacks.map((rucksackItems) => {
		const firstCompartmentItems = rucksackItems.slice(
			0,
			rucksackItems.length / 2
		);
		const secondCompartmentItems = rucksackItems.slice(
			rucksackItems.length / 2,
			rucksackItems.length
		);

		return getSharedItemsPriority(
			firstCompartmentItems,
			secondCompartmentItems
		);
	});
};

const allPrirotiesValues = getAllPriorities(allRucksacks);

const getSumOfPriorities = (allPrirotiesValues) => {
	let prioritiesSum = 0;

	allPrirotiesValues.forEach(
		(priority) => (prioritiesSum = prioritiesSum + priority)
	);

	return prioritiesSum;
};

const prioritiesSum = getSumOfPriorities(allPrirotiesValues);

console.log(prioritiesSum);
