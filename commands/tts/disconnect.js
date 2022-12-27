const Discord = require('discord.js');
const { VoiceConnectionStatus, joinVoiceChannel } = require('@discordjs/voice')
module.exports = {
    name: 'disconnect',
    aliases: ['dis','out'],
    category: 'tts',
    description: 'cho bot out phòng',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let voiceStatus = joinVoiceChannel({ channelId: message.member.voice.channelId, guildId: message.guildId, adapterCreator: message.guild.voiceAdapterCreator });
        if (voiceStatus.status === VoiceConnectionStatus.Connected) {
            voiceStatus.destroy();
            message.reply('Bot đã ra khỏi phòng');
        } else return;
    }
}