const { RichEmbed } = require('discord.js')
module.exports = {
        name: "report",
        category: "system",
        description: "Report a user",
        run: async (client, message, args, config, language) => {
            const mention = message.mentions.users.first()
            const reason = args.slice(1).join(' ');
            var reporter = message.author.id
            await message.delete();
            var channel = message.channel.name
            var reportc = message.guild.channels.find(channel => channel.name === `${config.reportchannel}`);

            if (!mention) return message.reply(`${language.invalidargs} | IE: **${config.prefix1}report @IceyyM8 This is an example**`)

            if (!reason) return message.reply(`${language.invalidargs} | EX: **${config.prefix1}report @IceyyM8 This is an example**`)

            if (!reportc) return message.reply(`${language.channelnotfound}`)

            const embed = new RichEmbed()
            .setAuthor(`${config.shortname} Reports!`)
            .addField(`User Reported:`, `${mention}`, true)
            .setDescription(`Reason: **${reason}**`)
            .addField(`Reported By`, `<@${reporter}>`, true)
            .addField(`Reported In:`, `#${channel}`, true)
            .setColor(`${config.color}`)
            .setThumbnail(`${config.logo}`)
            .setFooter(`The following is the the time of the report`)
            .setTimestamp()
            reportc.send(embed)
            message.reply(`${reportsent}`)
            setTimeout(function(){
             message.channel.bulkDelete(`1`)
            } , 5000);
        }
    }