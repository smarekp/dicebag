const DiceRoller = require('../node_modules/rpg-dice-roller/dice-roller.js');

module.exports = {
	name: 'roll',
	aliases: ['r'],
	description: 'Executes a command given in dice notation, and returns the results. See https://github.com/GreenImp/rpg-dice-roller/blob/master/readme.md for more information about dice notation.',
	usage: '<dice notation>',
	args: true,
	execute(message, args) {
		
		// create a new instance of the DiceRoller
		const dice = new DiceRoller.DiceRoller();

		// roll the dice
		dice.roll(args[0]);

		// get the latest dice rolls from the log
		let result = dice.log.shift();

		let reply = `${message.author} rolled ${result.toString()}`;

		// output the latest roll - it has a toString method for nice output
		console.log(result);

		message.channel.send(reply).catch(console.error);
	},
};