const Discord = require('discord.js');
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Interaction} interaction 
 */
module.exports = (client, interaction) => {
    if (!interaction.isCommand()) return;
    const command = client.interactions.get(interaction.commandName);
    if (!command) interaction.reply({ content: 'Lệnh không hoạt động', ephemeral: true });

    command.run(client, interaction);
}