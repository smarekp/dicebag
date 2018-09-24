const moment = require('moment-timezone');
const sqlite3 = require('sqlite3').verbose();

module.exports = {
	name: 'server_timezone',
	description: 'Set the timezones displayed when using the `time` command.',
	usage: '[timezone-1, timezone-2, ...timezone-N]',
	args: true,
	execute(message, args) {

		let filepath = __dirname + '/../database.sqlite3';
		let badzones = [];
		let zones = args.join(', ');
		let reply = null;

		if (typeof message.channel.guild === 'undefined') {
			reply = `${message.author} this command cannot be used via private messages!`;
			return message.channel.send(reply).catch(console.error);
		}

		if (message.author.id !== message.channel.guild.ownerID) {
			reply = `${message.author} this command can only be used by the owner of the server!`;
			return message.channel.send(reply).catch(console.error);
		}

		args.forEach(function(arg) {
			if (moment.tz.names().includes(arg) === false) {
				badzones.push(arg);
			}
		});

		if (badzones.length !== 0) {
			badzones = badzones.join(', ');
			reply = `${message.author} cannot find timezones named: ${badzones}`;
			return message.channel.send(reply).catch(console.error);
		}

		let db = new sqlite3.Database(filepath, sqlite3.OPEN_READWRITE);

		db.get("SELECT * FROM guilds WHERE guild_id LIKE $guild_id", { $guild_id: message.channel.guild.id }, function(err, guild) {
			if (guild) {
				db.run("UPDATE guilds SET timezones = $timezones, updated_at = CURRENT_TIMESTAMP WHERE guild_id = $guild_id", {
					$guild_id: message.channel.guild.id,
					$timezones: zones
				});
			} else {
				db.run("INSERT INTO guilds (guild_id, timezones) VALUES ($guild_id, $timezones)", {
					$guild_id: message.channel.guild.id,
					$timezones: zones
				});
			}
		}).close();

		reply = `${message.author} this server now uses these timezones: ${zones}`;
		return message.channel.send(reply).catch(console.error);

	},
};