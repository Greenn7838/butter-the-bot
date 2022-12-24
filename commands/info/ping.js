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
        message.reply('Bot đã chuyển sang "/" slash commands');
        message.reply('Đang check ping...')
            .then((m) => {
                let ping = m.createdTimestamp - message.createdTimestamp;
                m.edit(
                    `Ping của Bot\n` +
                    `> Ping phản hồi (Reply ping): \`${ping}ms\`\n` +
                    `> Ping Discord API (Websocket ping): \`${client.ws.ping}ms\`\n`
                )
            })
    }
}