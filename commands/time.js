const moment = require('moment-timezone');
const sqlite3 = require('sqlite3').verbose();

const getReplyString = function(time, timezones, author) {
	var format = 'h:mma z';
	var separator = "\n";
	var output = author + ' ' + time.format(format) + ' corresponds to...' + separator + time.utc().format(format);
	if (timezones.length == 0) {
		output = 'No timezones to convert to.';
	} else {
		timezones.forEach(function(timezone) {
			output += separator + time.tz(timezone).format(format);
		});
	}
	return output;	
}

module.exports = {
	name: 'time',
	description: 'Convert a local time to the timezones configured for this server.\nIf you have not configured your local timezone via the `timezone` command, the timezone used will be UTC.\nIf you do not specify a time, this command will use the current time.',
	usage: '[local-time]',
	args: false,
	execute(message, args) {

		let filepath = __dirname + '/../database.sqlite3';
		let db = new sqlite3.Database(filepath, sqlite3.OPEN_READWRITE);

		let time  = null;
		let zones = null;
		let reply = null;		

		db.get("SELECT * FROM users WHERE user_id LIKE $user_id", { $user_id: message.author.id }, function(err, user) {
			if (args[0]) {
				time = user ? moment.tz(args[0], 'h:mma', user.timezone) : moment.utc(args[0], 'h:mma');
			} else {
				time = user ? moment().tz(user.timezone) : moment().utc();
			}
			if (time.isValid()) {
				if (typeof message.channel.guild !== 'undefined') {
					db.get("SELECT * FROM guilds WHERE guild_id LIKE $guild_id", { $guild_id: message.channel.guild.id }, function(err, guild) {
						zones = guild ? guild.timezones.split(', ') : [];
						reply = getReplyString(time, zones, message.author);
						message.channel.send(reply).catch(console.error);
					});
				} else {
					reply = getReplyString(time, [], message.author);
					message.channel.send(reply).catch(console.error);
				}
			} else {
				reply = `${message.author} a time must be formatted like \`h:mma\`.`;
				message.channel.send(reply).catch(console.error);
			}
		}).close();
		return;

	},
};