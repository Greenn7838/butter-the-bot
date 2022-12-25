require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer);
const config = require('./config.json');
const Discord = require('discord.js');
var guildId = config.guildId;
var livechatId = config.livechat;
    /**
     * 
     * @param {Discord.Client} client 
     */
    function createBot(client) {
        const bot = mineflayer.createBot({
            host: process.env.MC_IP,
            port: 25565,
            username: process.env.MC_USERNAME
        });
        /**
         *            2Y2C-Login-API
         *  Yêu cầu giữ credit về source code.
         * 
         * 
         * Project: https://github.com/MoonVN571/2Y2C-Login-API
         */
        // Thanks MoonVN for this awesome login API
        bot.on('windowOpen', async (window) => { // Thực hiện khi khung login hiện ra
            // Sửa dòng leak memory
            window.requiresConfirmation = false;
        
            /* 
             * Nhập 4 số mã pin. Nhưng cần nhập trong .env 
             * Cách nhập: Thí dụ pin là 9999, thì đặt phần pin là 9,9,9,9 ( Thí dụ: PIN=9 9 9 9 )
             */
            var v = process.env.MC_PIN;
            var p1 = v.split(" ")[0]; // lấy mã trước dấu cách
            var p2 = v.split(" ")[1]; // lấy mã sau dấu cách thứ 1
            var p3 = v.split(" ")[2]; // lấy mã sau dấu cách thứ 2
            var p4 = v.split(" ")[3]; // lấy mã sau dấu cách thứ 3
        
        
            if(!p1 || !p2 || !p3 || !p4) return console.log("Vui lòng kiểm tra lại mã pin, phải ghi đúng như example, hãy đặt nếu như bạn chưa đặt nó.");
        
            // Thực hiện các mã pin đã được đặt
            bot.clickWindow(p1, 0, 0);
            bot.clickWindow(p2, 0, 0);
            bot.clickWindow(p3, 0, 0);
            bot.clickWindow(p4, 0, 0);
        
            // Cho bot vào server
            setTimeout(() => { bot.chat('/anarchyvn') }, 5*1000); // Dùng /2y2c sau khi login xong
        
            setTimeout(() => { bot.clickWindow(13,0,0) }, 10*1000); // Sau đó bấm vào khung kia để vào server
        });
        
        bot.on('end', () => { // Log khi bot end
            console.log('end');
        });

        bot.on('message', async (msg) => { // Log message từ chat game
            console.log(msg.toString());
            var guild = client.guilds.cache.get(guildId);
            var channel = guild.channels.cache.get(livechatId);
            const embed = new MessageEmbed()
                .setColor('AQUA')
                .setDescription(msg.toString());
            channel.send('```' + msg.toString() + '```');
        });
        

        client.on('messageCreate', async(message) => {
            if (message.author.bot) return;
            const channel = message.channel;
            if (channel.id === livechatId) {
                message.react('✅');
                bot.chat(`[${message.author.tag}] ` + message.content);
            } else return
        })
    }

module.exports = { createBot }