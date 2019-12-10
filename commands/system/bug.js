const { RichEmbed } = require('discord.js')
module.exports = {
        name: "bug",
        category: "system",
        description: "Send a bug report",
        run: async (client, message, args, config) => {
        await message.delete();
        var reportc = message.guild.channels.find(channel => channel.name === `${config.bugschannel}`);


        if (!args[0]) return message.reply(`Incorrect usage | EX: **${config.prefix1}bug This is an example**`)

        if (!reportc) return message.reply(`The bugs channel was not found, **please contact staff!**`)

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
        message.reply(`The bug was sent to staff, deleting this message in 3 seconds.`)
        setTimeout(function () {
            message.channel.bulkDelete(`1`)
        }, 5000);
    }
}
