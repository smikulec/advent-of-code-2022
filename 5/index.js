const { readFileSync } = require('fs');

function syncReadFile(filename) {
	const contents = readFileSync(filename, 'utf-8');

	const arr = contents.split(/\r?\n/);

	return arr;
}

// Part 1

const initialStacks = {
	1: ['B', 'V', 'S', 'N', 'T', 'C', 'H', 'Q'],
	2: ['W', 'D', 'B', 'G'],
	3: ['F', 'W', 'R', 'T', 'S', 'Q', 'B'],
	4: ['L', 'G', 'W', 'S', 'Z', 'J', 'D', 'N'],
	5: ['M', 'P', 'D', 'V', 'F'],
	6: ['F', 'W', 'J'],
	7: ['L', 'N', 'Q', 'B', 'J', 'V'],
	8: ['G', 'T', 'R', 'C', 'J', 'Q', 'S', 'N'],
	9: ['J', 'S', 'Q', 'C', 'W', 'D', 'M'],
};

const makeMoveStructure = (move) => {
	const moveRegex = /move\s\d+/g;
	const startingPointRegex = /from\s\d+/g;
	const finishingPointRegex = /to\s\d+/g;

	const itemsToMove = move.match(moveRegex).toString().match(/\d+/g).toString();
	const startingPoint = move
		.match(startingPointRegex)
		.toString()
		.match(/\d+/g)
		.toString();
	const finishingPoint = move
		.match(finishingPointRegex)
		.toString()
		.match(/\d+/g)
		.toString();

	const instructions = {
		itemsNumber: Number(itemsToMove),
		startingPoint: Number(startingPoint),
		finishingPoint: Number(finishingPoint),
	};

	return instructions;
};

const executeInstruction = (stacks, instruction) => {
	for (let i = 0; i < instruction.itemsNumber; i++) {
		const removedItem = stacks[instruction.startingPoint].pop();
		stacks[instruction.finishingPoint].push(removedItem);
	}
};

const reorderStacksByInstructions = (instructions, stacks) => {
	const stacksToReorder = JSON.parse(JSON.stringify(stacks));

	instructions.forEach((instruction) =>
		executeInstruction(stacksToReorder, instruction)
	);

	return stacksToReorder;
};

const getTopsOfStacks = (stacks) => {
	const topsOfStacks = [];
	const numberOfStacks = Object.keys(stacks).length;

	for (let i = 1; i <= numberOfStacks; i++) {
		if (stacks[i].length !== 0) {
			const top = stacks[i].pop();
			topsOfStacks.push(top);
		}
	}

	return topsOfStacks.toString().split(',').join('');
};

const allMoves = syncReadFile('./input.txt').map((item) => item.split(','));

const mappedMovesWithInstructions = allMoves.map((move) =>
	makeMoveStructure(move.toString())
);

const reorderedStacks = reorderStacksByInstructions(
	mappedMovesWithInstructions,
	initialStacks
);

const topsOfStacks = getTopsOfStacks(reorderedStacks);

console.log('Part 1 tops of stacks', topsOfStacks);

// Part 2

const executeBulkMoveInstructions = (stacks, instruction) => {
	const cratesToTransfer = stacks[instruction.startingPoint].splice(
		-instruction.itemsNumber,
		instruction.itemsNumber
	);

	stacks[instruction.finishingPoint].push(...cratesToTransfer);
};

const reorderStacksByBulkInstructions = (instructions, stacks) => {
	const stacksToReorder = JSON.parse(JSON.stringify(stacks));

	instructions.forEach((instruction) =>
		executeBulkMoveInstructions(stacksToReorder, instruction)
	);

	return stacksToReorder;
};

const bulkReorderedStacks = reorderStacksByBulkInstructions(
	mappedMovesWithInstructions,
	initialStacks
);

const topsOfBulkReorderedTasks = getTopsOfStacks(bulkReorderedStacks);

console.log('Part 2 tops of stacks', topsOfBulkReorderedTasks);
