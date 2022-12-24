const mcUtils = require('minecraft-server-util');
const Discord = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'server',
    aliases: ['sv'],
    category: 'server',
    description: 'Check server status',
    usage: '',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client,message,args) => {
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Đã kiểm tra thành công server ${process.env.MC_IP}`)
        mcUtils.status(process.env.MC_IP, 25565).then((res) => {
            message.reply({ embeds: [embed.addFields(
                { name: 'Server IP', value: process.env.MC_IP, inline: true },
                { name: 'Phiên bản', value: res.version.name, inline: false },
                { name: 'Người chơi', value: `\`${res.players.online}\` / \`${res.players.max}\``, inline: true },
                { name: 'Message of the day (MOTD)', value: res.motd.clean, inline: false },
            )
            .setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${process.env.MC_IP}`)] })
            
        })
        ;
    }
}