const { RichEmbed } = require('discord.js')
module.exports = {
        name: "kick",
        category: "admin",
        description: "Kick a user by mention",
        run: async (client, message, args, config) => {
            await message.delete()
            const logerchannel = message.guild.channels.find(channel => channel.name === `${config.logchannel}`) || message.channel;
         
            if (!message.mentions.users.first()) {
                return message.reply(`Please mention a user!`)
            } 
            
            if (args[1]) {
                let reason = `${args.slice(1).join(" ")}`
            }

            if (!args[1]) {
                let reason = `No reason provided || Kicked by ${message.author.username}`
            }

            if (!message.member.hasPermission("KICK_MEMBERS")) {
                return message.reply(`You do not have permission!`)
            }

            if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
                return message.reply(`I do not have permission!`)
            }

            const bye = message.mentions.users.first() || message.guild.members.get(args[0])

            if (!bye) {
                return message.reply(`No user found`)
            }

            if (!bye.id === message.author.id) {
                return message.reply(`You can't kick youself!`)
            }

            if (!bye.kickable) {
                return message.reply(`I cant kick that user!`)
            }

            const embed = new RichEmbed()
            .setAuthor(`${config.shortname} Kicks`)
            .setColor(`${config.color}`)
            .setThumbnail(`${config.logo}`)
            .setTimestamp()
            .setDescription(`Reason: ${reason}`)
            .addField(`User Kicked:`, `${bye}`)
            .addField(`Kicked by:`, `<@${message.author.id}>`)
            logerchannel.send(embed).then(async bye => {
                bye.kick(`${reason}`)
                if (error) return logerchannel.send(`Well i tried to kick ${bye} but there was an error, here's the error ${error}`)
            })
        }
    }
