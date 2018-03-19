const Dice = require('node-dice-js');

module.exports = {
	name: 'roll',
	aliases: ['r'],
	description: 'Executes a command given in dice notation, and returns the results. See https://en.wikipedia.org/wiki/Dice_notation for more information about dice notation.',
	usage: '<dice notation>',
	args: true,
	execute(message, args) {
		const dice = new Dice();
		const result = dice.execute(args[0]);
		const outcome = result.outcomes[0];

		let reply = `${message.author} rolled *${result.command}* totaling **${outcome.total}**.`;

		if(outcome.rolls.length > 1) {
			const rolls = outcome.rolls.join(', ');
			reply += `  (${result.command})`;
		}

		message.channel.send(reply).catch(console.error);
	},
};