const { RichEmbed } = require('discord.js')
module.exports = {
                name: "rules",
                category: "server",
                description: "Shows the server's rules!",
                run: async (client, message, args, config, language) => {
                await message.delete();
                const embed = new RichEmbed()
                .setTitle(`${config.shortname} Rules (Click Me)`)
                .setURL(`${config.ruleslink}`)
                .setThumbnail(`${config.logo}`)
                .setColor(`${config.color}`)
                .setFooter(`${language.clicktitle}`)
                message.channel.send(embed)
        }
    }