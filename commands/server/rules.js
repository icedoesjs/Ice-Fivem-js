const { RichEmbed } = require('discord.js')
module.exports = {
                name: "rules",
                category: "server",
                description: "Shows the server's rules!",
                run: async (client, message, args, config) => {
                await message.delete();
                const embed = new RichEmbed()
                .setTitle(`${config.shortname} Rules (Click Me)`)
                .setURL(`${config.ruleslink}`)
                .setThumbnail(`${config.logo}`)
                .setColor(`${config.color}`)
                .setDescription(`Above you can review all our rules, please keep in mind not knowing a rule is not an excuse for breaking it.`)
                .setFooter(`Simply click the title`)
                message.channel.send(embed)
        }
    }