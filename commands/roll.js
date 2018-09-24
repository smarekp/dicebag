const DiceRoller = require('../node_modules/rpg-dice-roller/dice-roller.js');

module.exports = {
	name: 'roll',
	aliases: ['r'],
	description: 'Executes a command given in dice notation, and returns the results. Dice notation may not contain spaces.\nSee https://github.com/GreenImp/rpg-dice-roller/blob/master/readme.md for more information about dice notation.',
	usage: '[dice-notation]',
	args: false,
	execute(message, args) {
		
		let dice = new DiceRoller.DiceRoller(); // create a new instance of the DiceRoller

		let input = args[0] ? args[0] : '1d6';
		
		dice.roll(input); // roll the dice

		let result = dice.log.shift(); // get the latest dice rolls from the log

		let reply = `${message.author} rolled ${result.toString()}`;

		return message.channel.send(reply).catch(console.error);

	},
};