require('dotenv').config();
module.exports = (client,message) => {
    const prefix = process.env.PREFIX;
    if (
      !message.content.startsWith(prefix)
    || message.author.bot
    || !message.guild
    ) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args);
}
