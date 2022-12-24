const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    category: 'info',
    description: 'Check ping của bot',
    usage: '',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        interaction.reply({ content:'Check ping...', ephemeral: true }).then(() => {
            interaction.followUp('Check ping lần 2...')
            .then((msg) => {
                let RepPing = msg.createdTimestamp - interaction.createdTimestamp;
                msg.edit(`
                    Ping của ${client.user.tag}
                    > Ping reply = \`${RepPing}ms\`
                    > Ping API = \`${client.ws.ping}ms\`
                `)
            })
        })
             
    }
}