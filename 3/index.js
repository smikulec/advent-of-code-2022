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

//Part 1

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

//Part 2

const divideInGroupsOfThree = (input) => {
	let newArray = [];

	for (let i = 0; i < input.length / 3; i++) {
		const inputSlice = input.slice(i * 3, (i + 1) * 3);
		newArray.push(inputSlice);
	}
	return newArray;
};

const getSharedItem = (first, second, third) => {
	let commonItem;

	first.forEach((char) => {
		if (second.includes(char) && third.includes(char)) {
			commonItem = char;
		}
	});

	return commonItem;
};

const getSumOfBadgePriorities = (groups) => {
	let badgeProritiesSum = 0;

	groups.forEach((group) => {
		const groupBadge =
			alphabet.indexOf(
				getSharedItem(
					group[0].split(''),
					group[1].split(''),
					group[2].split('')
				)
			) + 1;
		badgeProritiesSum = badgeProritiesSum + groupBadge;
	});

	return badgeProritiesSum;
};

const dividedItems = divideInGroupsOfThree(allRucksacks);

const groupsBadgePrioritiesSum = getSumOfBadgePriorities(dividedItems);

console.log(groupsBadgePrioritiesSum);
