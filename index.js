require('dotenv').config(); // dotenv
process.env.TZ = 'Asia/Ho_Chi_Minh'
const Discord = require('discord.js');
const { REST } = require('@discordjs/rest')
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

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = new Discord.Collection();
client.interactions = new Discord.Collection();
const slashCommands = [];


let cmdCount = 0;
let eventCount = 0;
let slashCount = 0;

// command handler
fs.readdirSync('./commands/').forEach(dir => {
  const commands = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
  for (const file of commands) {
    const pull = require(`./commands/${dir}/${file}`);
    if (pull.name) {
      cmdCount++
      client.commands.set(pull.name, pull);
    } else {
      continue;
    }
    if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
  }
  console.log(`${cmdCount} lệnh đã hoạt động`);
});

// event handler
const files = fs.readdirSync('./events/');
for (const f of files) {
  if (!f.endsWith('.js')) continue;
  const eventName = f.substring(0, f.indexOf('.js'));
  const event = require(`./events/${f}`);
  client.on(eventName, event.bind(null, client));
  eventCount++;
}
console.log(`${eventCount} sự kiện của bot đã hoạt động`)

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

client.login(process.env.DISCORD_TOKEN);