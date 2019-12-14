const { RichEmbed } = require('discord.js')
const { set } = require('quick.db')
module.exports = {
        name: "age",
        category: "profile",
        description: "Sets your profile's age",
        run: async (client, message, args, config, language) => {
        await message.delete();

        if (!args[0]) return message.reply(`${language.invalidargs}`)

        if (isNaN(args[0])) return message.reply(`${language.isnan}`)

        const embed = new RichEmbed()
            .setAuthor(`${config.shortname} Profile System`)
            .setColor(`${config.color}`)
            .setThumbnail(`${config.logo}`)
            .addField(`${language.ageset}`, `${args[0]}`, true)
        message.channel.send(embed)
        set(`ICE.age.${message.author.id}`, `${args[0]}`)
    }
}