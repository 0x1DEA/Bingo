# Bingo
Discord bot that gives users a Bingo role on command. Then generates a gif of their pfp being crushed by
## Install
- Make sure you have [Node.js](https://nodejs.org/en/) installed
- Open a command prompt and navigate to the working directory
- Run `npm install` to install dependencies
- Create a new file called `config.json` set the bot token an optional prefix
```json
{
  "token": "bot token here",
  "prefix": "!",
  "ownerroleid": "exclusive role id here",
  "bingoroleid": "bingo role id here"
}
```
Bot token can be found [here](https://discordapp.com/developers/applications), click on your application, go to the bot tab, (create a bot user if you haven't already) and copy it's login token on the right sode of the screen. The role id only lets a certain role use the Bingo command. To find your role id, set role to me mentionable, mention the role with a backslash before the @ symbol. You should get a message that looks like <@&numbers> the numbers between the <@& and the > are what you want.
## Run
- Just run `npm start` and you should be good!
## Using
- `!bingo <mention user> <nick name (optional)>
Bingo a user. Mention them and a nickname.
