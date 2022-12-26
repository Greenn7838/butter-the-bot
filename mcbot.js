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
            username: process.env.MC_USERNAME,
            version: '1.16.5',
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
            setTimeout(() => {
                const embed = new MessageEmbed().setColor('GREEN').setTitle('Đã nhập `/anarchyvn`')
                bot.chat('/anarchyvn');
                client.channels.cache.get(livechatId).send({ embeds: [embed] })
            }, 5*1000); // Dùng /anarchyvn sau khi login xong
        
            setTimeout(() => {
                const embed = new MessageEmbed().setColor('YELLOW').setTitle('Đã click `Chuyển Server`');
                bot.clickWindow(13,0,0);
                client.channels.cache.get(livechatId).send({ embeds: [embed] })
            }, 5*1000); // Sau đó bấm vào khung kia để vào server
        });
        
        bot.on('end', () => { // Log khi bot end
            console.log('end');
        });

        bot.on('message', async (msg) => { // Log message từ chat game
            console.log(msg.toString());
            const embed = new MessageEmbed();
            embedState(msg, embed);
            client.channels.cache.get(livechatId).send({ embeds: [embed] })
        });
        

        client.on('messageCreate', async(message) => {
            if (message.author.bot) return;
            const channel = message.channel;
            if (channel.id === livechatId) {
                message.react('✅');
                bot.chat(`<${message.author.tag}> ` + message.content);
            } else return
        })

    /**
     * 
     * @param {String[]} msg 
     * @param {MessageEmbed} embed 
     */
    async function embedState(msg, embed) {
        if (msg.toString() === ("Vị trí hàng chờ: " + /^[0-9]*$/)) {
            embed.setColor('GOLD')
                .setTitle(msg.toString());
        } else if (msg.toString().startsWith("<[Donator]")) {
            embed.setColor('PURPLE')
                .setDescription(msg.toString());
        } else if (msg.toString().startsWith("[ANARCHYVN]")) {
            embed.setColor('RED')
                .setTitle(msg.toString())
        } else {
            embed.setColor('AQUA').setDescription(msg.toString())
        }
    }

    }

module.exports = { createBot }