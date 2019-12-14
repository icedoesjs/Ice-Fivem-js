
module.exports = {
        name: "binfo",
        category: "misc",
        description: "Information about the bot",
        run: async (client, message, args, config) => {
            const { RichEmbed } = require('discord.js')
            await message.delete();
            const nodevs = process.version
            const embed = new RichEmbed()
            .setAuthor(`${config.shortname} bot Info`)
            .setColor(`${config.color}`)
            .setThumbnail(`${config.logo}`)
            .setDescription(`In this message you can view info about our bot`)
            .addField(`Basic Info`, `${client.user.id} ID | ${client.user.tag} Tag | Running ${client.users.size} Users in ${client.channels.size} Channels`)
            .addField(`Development Info`, `${client.ping} Ping | ${nodevs} Node Version | ${config.version} Bot Version`)
            .addField(`Extra`, `Made By IceyyM8`)
            .setFooter(`Made for ${config.shortname}`)
            message.channel.send(embed)
        }
    }