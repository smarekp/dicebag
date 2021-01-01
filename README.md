# Dicebag

Dicebag is a Discord bot for rolling dice using dice notation, with few additional commands useful for role-playing groups.
Please see the [GreenImp/rpg-dice-roller readme][4] for more information about supported notation.

[Click here to add Dicebag to your Discord server!][5]

## Installation

### Requirements

Dicebag requires [Node.js][1] and [npm][2].

### Setup

Clone this repository or copy the dicebag directory to your machine.

Open a terminal in the dicebag directory and run the following command:
```shell
npm install
```
Create a file named *`config.json`* containing the following.  
Replace `your-token-goes-here` with your own Discord bot's token.
```json
{
  "prefix": "$",
  "token": "your-token-goes-here"
}
```
Create an SQLite3 database file named *database.sqlite3*.  
Use the *database.sql* file to create the two nessecary tables.  
If you are unfamiliar with SQLite3, I highly recommend [DB Browser for SQLite][3].

### Login

Open a terminal in the dicebag directory and run the following command.  
Closing the terminal window or killing the process will cause the bot to stop running.
```shell
nodejs login.js
```

### Logout

Open a terminal in the dicebag directory and run the following command.  
This will cause the bot to logout, even if it's running from another machine.
```shell
nodejs logout.js
```

### Automatically Login At Boot

In the *`/etc/init.d`* directory, create a file called *`dicebag-login`* containing the following:
```shell
#!/bin/sh
nohup nodejs ~/dicebag/login.js 2>/dev/null &
```
Run the following command:
```shell
sudo chmod 755 /etc/init.d/dicebag-login
```

## Usage

### Timezones

Dicebag's timezone-related functions expect full timezone names (example: `America/New_York`). A list of timezone names can be found [here][7].

### Commands

Be sure to include the prefix directly before the command (default: `$`).

| Command                                    | Description                                                          |
| ------------------------------------------ | -------------------------------------------------------------------- |
| help                                       | Sends the user a private message listing all available commands.     |
| help *command-name*                        | Sends the user a private message with info about a specific command. |
| roll *dice-notation*                       | Performs the requested dice rolls, and returns the results.          |
| server_timezone *timezone-1 timezone-2...* | Server owner only. Configure the current server's timezones.         |
| timezone *timezone-name*                   | Configure your local timezone.                                       |
| time *local-time*                          | Convert a local time to each of the server's configured timezones.   |

## Attribution

[The official Dicebag bot's avatar was created by Ahkâm (freeiconspng.com).][6]

[1]: https://nodejs.org/en/
[2]: https://www.npmjs.com/
[3]: http://sqlitebrowser.org/
[4]: https://github.com/GreenImp/rpg-dice-roller/blob/master/readme.md#supported-notation
[5]: https://discordapp.com/api/oauth2/authorize?client_id=425049940788641802&permissions=67584&scope=bot
[6]: https://www.freeiconspng.com/img/34413
[7]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
