const { RichEmbed } = require('discord.js')
module.exports = {
        name: "announce",
        category: "admin",
        description: "Announce a message!",
        run: async (client, message, args, config) => {
            var messagetext = args.slice(0).join(' ');

            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                return message.reply(`You do not have permission to post announcements!`)
            }

            if (!config.announcementschannel) {
                return console.log(`There is no announcements channel, consider fixing this is the config!`)
            }

            if (config.announcementschannel && message.member.hasPermission("MANAGE_MESSAGES")) {
                var announcchannel = message.guild.channels.find(channel => channel.name === `${config.announcementschannel}`) || message.channel;
                let embed = new RichEmbed()
                .setAuthor(`Announcement from ${message.author.username}`)
                .setColor(`${config.color}`)
                .setDescription(`Announcement sent from ${message.channel.name} by ${message.author.username}`)
                .addField(`Announcement text`, `${messagetext}`, true)
                .setTimestamp()
                announcchannel.send(embed)
                announcchannel.send(`@everyone`)
               
            }
        }
    }