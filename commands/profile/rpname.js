const { RichEmbed } = require('discord.js')
const { set } = require('quick.db')
module.exports = {
        name: "rpname",
        category: "profile",
        description: "Sets your profile name",
        run: async (client, message, args, config) => {
        await message.delete();
        const identity = message.author.id

        if (!args.slice(0).join(' ')) return message.reply('Please supply a hex | **EX: ?rpname Jordan Ice**')

        const embed = new RichEmbed()
            .setAuthor(`${config.shortname} Profile System`)
            .setColor(`${config.color}`)
            .setThumbnail(`${config.logo}`)
            .addField('Your rp name was set to', `${args.slice(0).join(' ')}`, true)
        message.channel.send(embed)
        set(`ICE.name.${identity}`, `${args.slice(0).join(' ')}`)
    }
}