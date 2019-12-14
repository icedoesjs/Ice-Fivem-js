const { RichEmbed } = require('discord.js')
module.exports = {
        name: "announce",
        category: "admin",
        description: "Announce a message!",
        run: async (client, message, args, config, language) => {
            var messagetext = args.slice(0).join(' ');

            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                return message.reply(`${language.noperms}`)
            }

            if (!config.announcementschannel) {
                return console.log(`${language.noannouncchannel}`)
            }

            if (config.announcementschannel && message.member.hasPermission("MANAGE_MESSAGES")) {
                var announcchannel = message.guild.channels.find(channel => channel.name === `${config.announcementschannel}`) || message.channel;
                let embed = new RichEmbed()
                .setAuthor(`${language.annfrom} ${message.author.username}`)
                .setColor(`${config.color}`)
                .setDescription(`${language.sentfrom} ${message.channel.name} by ${message.author.username}`)
                .addField(`${language.text}`, `${messagetext}`, true)
                .setTimestamp()
                announcchannel.send(embed)
                announcchannel.send(`@everyone`)
               
            }
        }
    }