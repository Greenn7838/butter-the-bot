const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    category: 'info',
    description: 'Xem ping của bot',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setDescription('Đang check ping...');
        message.reply({ embeds: [embed] })
            .then((m) => {
                let ping = m.createdTimestamp - message.createdTimestamp;
                embed.setDescription(
                    `Ping của Bot\n` +
                    `> Ping phản hồi (Reply ping): \`${ping}ms\`\n` +
                    `> Ping Discord API (Websocket ping): \`${client.ws.ping}ms\`\n`
                )
                m.edit({ embeds: [embed] })
            })
    }
}