require('dotenv').config(); // dotenv
process.env.TZ = 'Asia/Ho_Chi_Minh'
const Discord = require('discord.js');
const { REST } = require('@discordjs/rest');
const mineflayer = require('mineflayer');
const fs = require('fs');
const mongoose = require('mongoose');
const { Routes } = require('discord-api-types/v9');
const client = new Discord.Client({
  intents: 33295,
  allowedMentions: {
    repliedUser: false,
    roles: false,
    users: false
  },
});
module.exports = client;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands')
client.interactions = new Discord.Collection();
const slashCommands = [];



// command handler
fs.readdirSync('./commands/').forEach(dir => {
  const commands = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
  for (const file of commands) {
    const pull = require(`./commands/${dir}/${file}`);
    if (pull.name) {
      client.commands.set(pull.name, pull);
    } else {
      continue;
    }
    if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
  }
});

// event handler
const files = fs.readdirSync('./events/');
for (const f of files) {
  if (!f.endsWith('.js')) continue;
  const eventName = f.substring(0, f.indexOf('.js'));
  const event = require(`./events/${f}`);
  client.on(eventName, event.bind(null, client));
}

// "/" handler
fs.readdirSync('./slashCommands/').forEach(dir => {
  fs.readdirSync(`./slashCommands/${dir}`).filter((f) => f.endsWith('.js'))
    .forEach((file) => {
      const command = require(`./slashCommands/${dir}/${file}`);
      if (command.name) {
        client.interactions.set(command.name, command);
        slashCommands.push(command);
      }
    })
  
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

    (async () => {
      try {
        await rest.put(
          Routes.applicationCommands(client.user.id),
          { body: slashCommands },
        );

        console.log(`loaded "/" commands`)
      } catch(err) {
        console.log(err);
      }
    })
});

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log('MongoDB connected!'));

const {createBot} = require('./mcbot');
createBot(client);


client.login(process.env.DISCORD_TOKEN);