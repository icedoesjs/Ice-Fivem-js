const { RichEmbed } = require('discord.js')
const { set } = require('quick.db')
module.exports = {
        name: "rpname",
        category: "profile",
        description: "Sets your profile name",
        run: async (client, message, args, config, language) => {
        await message.delete();
        const identity = message.author.id

        if (!args.slice(0).join(' ')) return message.reply(`${language.invalidargs}`)

        const embed = new RichEmbed()
            .setAuthor(`${config.shortname} Profile System`)
            .setColor(`${config.color}`)
            .setThumbnail(`${config.logo}`)
            .addField(`${language.rpname}`, `${args.slice(0).join(' ')}`, true)
        message.channel.send(embed)
        set(`ICE.name.${identity}`, `${args.slice(0).join(' ')}`)
    }
}