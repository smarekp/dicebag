const Dice = require('node-dice-js');

module.exports = {
	name: 'roll-verbose',
	description: 'Executes a command given in dice notation, and returns the results as a JSON string. See https://en.wikipedia.org/wiki/Dice_notation for more information about dice notation.',
	usage: '<dice notation>',
	cooldown: 5,
	args: true,
	execute(message, args) {
		const dice = new Dice();
		const result = dice.execute(args[0]);
		const result_string = JSON.stringify(result, null, 2);

		let reply = `\`\`\`json\n${result_string}\n\`\`\``;

		message.channel.send(reply).catch(console.error);
	},
};