const { RichEmbed } = require('discord.js')
module.exports = {
                name: "ip",
                category: "server",
                description: "Shows the server's ip address",
                run: async (client, message, args, config) => {
                await message.delete();
                const embed = new RichEmbed()
                .setColor(`${config.color}`)
                .setThumbnail(`${config.logo}`)
                .setAuthor(`${config.shortname} BOT`)
                .addField("Join us here:", `${config.ip}`)
                .setFooter("Don't know how to join? Simply open FiveM go to direct connect and paste our IP!")
                message.channel.send(embed)
        }
    }