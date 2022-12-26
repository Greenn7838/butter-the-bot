const Discord = require('discord.js');
const { getAudioUrl } = require('google-tts-api');
const discordTTS = require('discord-tts');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, StreamType, entersState, AudioPlayerStatus, VoiceConnectionStatus, AudioPlayer, PlayerSubscription } = require('@discordjs/voice');

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
        if (!args[0]) return message.reply('Bạn phải nhập nội dung để bot có thể nói!!');
        const string = args.join(' ');
        if (string.length > 200) return message.reply('Bạn đã nhập quá 200 kí tự!!');
        
        let voiceConnection;
        let audioPlayer = new AudioPlayer();

        const stream=discordTTS.getVoiceStream("hello text to speech world");
        const audioResource=createAudioResource(stream, {inputType: StreamType.Arbitrary, inlineVolume:true});
        if(!voiceConnection || voiceConnection?.status===VoiceConnectionStatus.Disconnected){
            voiceConnection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guildId,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
            voiceConnection=await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 5_000);
        }
        
        if(voiceConnection.status===VoiceConnectionStatus.Ready){
            voiceConnection.subscribe(audioPlayer);
            audioPlayer.play(audioResource);
        }
    }
}