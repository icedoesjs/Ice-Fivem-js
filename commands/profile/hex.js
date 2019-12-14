const { RichEmbed } = require('discord.js')
const { set } = require('quick.db')
module.exports = {
        name: "hex",
        category: "profile",
        description: "Sets your profile's steam hex",
        run: async (client, message, args, config, language) => {
            await message.delete();

            if (!args[0]) {
                return message.reply(`${language.invalidargs}`)
            }

            let Embed = new RichEmbed()
            .setAuthor(`${config.shortname} Profile System`)
            .setColor(`${config.color}`)
            .setThumbnail(`${config.logo}`)
            .addField(`${language.hexset}`, `${args[0]}`)
            message.channel.send(Embed)
            set(`ICE.hex.${message.author.id}`, `${args[0]}`)
        }
    }