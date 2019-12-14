const { RichEmbed } = require('discord.js')
module.exports = {
        name: "ticket",
        category: "system",
        description: "Open a ticket!",
        run: async (client, message, args, config, language) => {
            await message.delete();
            var ticket = args.slice(0).join(' ');
            const user = message.author.id
            const ticketchannel = message.guild.channels.find(channel => channel.name === `${config.ticketchannel}`);
            
            if (!ticket) return message.reply(`${language.invalidargs} | **IE: ${config.prefix1}ticket text here, up to 1500 char**`)

            if (!ticketchannel) return message.reply(`${language.channelnotfound}`)

            const embed1 = new RichEmbed()
            .setAuthor(`Your Ticket was sent, view a preview below`)
            .setColor(`#7CFC00`)
            .setThumbnail(`${config.logo}`)
            .addField(`Ticket Text`, `${ticket}`)
            .setTimestamp()
            .setFooter(`${language.reviewin24}`)
            message.channel.send(embed1)

            const embed2 = new RichEmbed()
            .setAuthor(`A Ticket Recieved!`)
            .setColor(`#7CFC00`)
            .setThumbnail(`${config.logo}`)
            .setDescription(`Ticket Text: ${ticket}`)
            .addField(`Opened By:`, `<@${user}>`)
            ticketchannel.send(embed2)
            console.log(`Ticket sent!`)
        }
    }