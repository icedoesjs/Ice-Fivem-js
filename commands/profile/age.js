const { RichEmbed } = require('discord.js')
const { set } = require('quick.db')
module.exports = {
        name: "age",
        category: "profile",
        description: "Sets your profile's age",
        run: async (client, message, args, config) => {
        await message.delete();

        if (!args[0]) return message.reply('Please supply an age for your profile')

        if (isNaN(args[0])) return message.reply(`That's not a number`)

        const embed = new RichEmbed()
            .setAuthor(`${config.shortname} Profile System`)
            .setColor(`${config.color}`)
            .setThumbnail(`${config.logo}`)
            .addField('Your age was set to', `${args[0]}`, true)
        message.channel.send(embed)
        set(`ICE.age.${message.author.id}`, `${args[0]}`)
    }
}
