const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	console.log(message.content);
	if (message.content === prefix + 'ping') {
		message.channel.send('Pong.');
	}
});

client.login(token)