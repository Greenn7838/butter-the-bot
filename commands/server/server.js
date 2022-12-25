const mcUtils = require('minecraft-server-util');
const asciitable = require('ascii-table');
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
        const table = new asciitable();
        const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Đã kiểm tra thành công server ${process.env.MC_IP}`)
        mcUtils.status(process.env.MC_IP, 25565).then((res) => {
            table
                .addRow(`Đã kiểm tra thành công server ${process.env.MC_IP}`)
                .addRow(`👥 Người chơi: ${res.players.online} / ${res.players.max}`)
                .addRow(`Phiên bản: ${res.version.name}`)
                .addRow(`MOTD: ${res.motd.clean}`);
            embed
                .setDescription('```' +
                    table.toString().split('\n').slice(1, -1).map(str => str.slice(2, -2)).join('\n') + '\n'
                + '```')
                .setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${process.env.MC_IP}`);
            message.reply({ embeds: [embed] })
    
        }).catch(err => console.log(err));
    }
}