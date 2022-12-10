const { readFileSync } = require('fs');

const contents = readFileSync('input.txt', 'utf-8');

const findNumberOfParsedCharacters = (input, marker) => {
	const characterRegex = /^(?:([A-Za-z])(?!.*\1))*$/g;

	for (let i = 0; i <= input.length - marker; i++) {
		const packetToCheck = input.slice(i, i + marker);
		const isPacketValid = !!packetToCheck.match(characterRegex);

		if (isPacketValid) {
			return i + marker;
		}
	}
};

// Part 1

console.log(
	'Part 1 start of packet',
	findNumberOfParsedCharacters(contents, 4)
);

// Part 2

console.log(
	'Part 2 start of packet',
	findNumberOfParsedCharacters(contents, 14)
);
