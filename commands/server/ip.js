const { RichEmbed } = require('discord.js')
module.exports = {
                name: "ip",
                category: "server",
                description: "Shows the server's ip address",
                run: async (client, message, args, config, language) => {
                await message.delete();
                const embed = new RichEmbed()
                .setColor(`${config.color}`)
                .setThumbnail(`${config.logo}`)
                .setAuthor(`${config.shortname} BOT`)
                .addField("Join us here:", `${config.ip}`)
                .setFooter(`${language.howtojoin}`)
                message.channel.send(embed)
        }
    }