const Discord = require('discord.js');
const discordTTS = require('discord-tts');
const { AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel } = require('@discordjs/voice');
module.exports = {
    name: 'speak',
    aliases: ['say', 's'],
    category: 'fun',
    description: 'Nói cái đb gì đấy hay vãi l',
    usage: 'speak <nội dung>',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let voiceConnection;
        let audioPlayer = new AudioPlayer();
        if (!args[0]) return message.reply('Bạn phải nhập nội dung để bot nói!!');
        const string = args.join(' ');
        if (string.length > 200) return message.reply('Bạn đã nhập quá 200 kí tự!!');
        
        const stream=discordTTS.getVoiceStream(string, { lang: 'vi', slow: false });
        const audioResource=createAudioResource(stream, {inputType: StreamType.Arbitrary, inlineVolume:true});
        if(!voiceConnection || voiceConnection?.status===VoiceConnectionStatus.Disconnected){
            voiceConnection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guildId,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
            voiceConnection=await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 5_000);
        }
        try {
            if(voiceConnection.status===VoiceConnectionStatus.Connected){
                voiceConnection.subscribe(audioPlayer);
                audioPlayer.play(audioResource);
            }
        } catch (error) {
            console.error(error)
        }
        
    }
}