const { RichEmbed } = require('discord.js')
module.exports = {
        name: "bug",
        category: "system",
        description: "Send a bug report",
        run: async (client, message, args, config, language) => {
        await message.delete();
        var reportc = message.guild.channels.find(channel => channel.name === `${config.bugschannel}`);


        if (!args[0]) return message.reply(`${language.invalidargs} **IE: ${config.prefix1}bug bug**`)

        if (!reportc) return message.reply(`${language.channelnotfound}`)

        const embed = new RichEmbed()
            .setAuthor(`${config.shortname} Bug Report!`)
            .setDescription(`Bug: ${args.slice(0).join(' ')}`)
            .addField(`Sent by`, `<@${message.author.id}>`, true)
            .addField(`Channel sent in`, `#${message.channel.name}`, true)
            .setColor(`${config.color}`)
            .setThumbnail(`${config.logo}`)
            .setTimestamp()
        reportc.send(embed)
        console.log(`Bug message sent to ${reportc}`)
        message.reply(`${language.bugsent}`)
        setTimeout(function () {
            message.channel.bulkDelete(`1`)
        }, 5000);
    }
}