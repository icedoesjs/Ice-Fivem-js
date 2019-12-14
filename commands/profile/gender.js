const { RichEmbed } = require('discord.js')
const { set } = require('quick.db')
module.exports = {
        name: "gender",
        category: "profile",
        description: "Set the gender for your profile",
        run: async (client, message, args, config, language) => {
        await message.delete();
        var gender = args[0]

        if (!gender) return message.reply(`${language.invalidargs}`)


        const embed = new RichEmbed()
            .setAuthor(`${config.shortname} Profile System`)
            .setColor(`${config.color}`)
            .setThumbnail(`${config.logo}`)
            .addField(`${language.genderset}`, `${gender}`, true)
        message.channel.send(embed)
        set(`ICE.gender.${message.author.id}`, `${gender}`)
    }
}