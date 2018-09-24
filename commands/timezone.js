const moment = require('moment-timezone');
const sqlite3 = require('sqlite3').verbose();

module.exports = {
	name: 'timezone',
	description: 'Configure your local timezone for use by the `time` command. It is preferable to use this command via private message.\nBE CAREFUL NOT TO DOX YOURSELF WHEN USING THIS COMMAND.',
	usage: '[timezone-name]',
	args: true,
	execute(message, args) {

		let filepath = __dirname + '/../database.sqlite3';
		let input = args[0];
		let reply = null;

		if (moment.tz.names().includes(input) === false) {
			reply = `${message.author} cannot find a timezone named: ${input}`;
			return message.channel.send(reply).catch(console.error);
		}

		let db = new sqlite3.Database(filepath, sqlite3.OPEN_READWRITE);

		db.get("SELECT * FROM users WHERE user_id LIKE $user_id", { $user_id: message.author.id }, function(err, user) {
			if (user) {
				db.run("UPDATE users SET timezone = $timezone, updated_at = CURRENT_TIMESTAMP WHERE user_id = $user_id", {
					$user_id: message.author.id,
					$timezone: input
				});
			} else {
				db.run("INSERT INTO users (user_id, timezone) VALUES ($user_id, $timezone)", {
					$user_id: message.author.id,
					$timezone: input
				});
			}
		}).close();

		reply = `${message.author} your timezone is now ${input}.`;
		return message.channel.send(reply).catch(console.error);

	},
};