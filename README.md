# dicebag

Dicebag is a Discord bot for rolling dice using dice notation, with few additional commands useful for role-playing groups.
Please see the [GreenImp/rpg-dice-roller readme][3] for more information about supported notation.

[Click here to invite Dicebag to your own Discord server!][4]

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
If you are unfamiliar with SQLite3, I highly recommend [DB Browser for SQLite][5].

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
nohup nodejs /home/lobadmin/projects/dicebag/login.js 2>/dev/null &
```
Run the following command:
```shell
sudo chmod 755 /etc/init.d/dicebag-login
```

## Usage

| Command                                    | Description                                                          |
| ------------------------------------------ | -------------------------------------------------------------------- |
| help                                       | Sends the user a private message listing all available commands.     |
| help *command-name*                        | Sends the user a private message with info about a specific command. |
| roll *dice-notation*                       | Performs the requested dice rolls, and returns the results.          |
| server_timezone *timezone-1 timezone-2...* | Server owner only. Configure the current server's timezones.         |
| timezone *timezone-name*                   | Configure your local timezone.                                       |
| time *local-time*                          | Convert a local time to each of the server's configured timezones.   |

[1]: https://nodejs.org/en/
[2]: https://www.npmjs.com/
[3]: https://github.com/GreenImp/rpg-dice-roller/blob/master/readme.md#supported-notation
[4]: https://discordapp.com/api/oauth2/authorize?client_id=425049940788641802&permissions=67584&scope=bot
[5]: http://sqlitebrowser.org/
