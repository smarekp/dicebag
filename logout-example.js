const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
	client.destroy();
	console.log('Done.');
});

client.login(token);