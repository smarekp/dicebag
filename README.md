# dicebag

Dicebag is a Discord bot for rolling dice using dice notation.

Please see the [GreenImp/rpg-dice-roller readme][3] for more information about dice notation.

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

| Command         | Description     |
| --------------- | --------------- |
| help            | Sends the user a private message listing all available commands. |
| help *command*  | Sends the user a private message with info about a specific command. |
| roll *notation* | Performs the requested dice rolls, and returns the results. |

[1]: https://nodejs.org/en/
[2]: https://www.npmjs.com/
[3]: https://github.com/GreenImp/rpg-dice-roller/blob/master/readme.md#supported-notation
