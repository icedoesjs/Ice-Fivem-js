const { RichEmbed } = require('discord.js')
module.exports = {
        name: "kick",
        category: "admin",
        description: "Kick a user by mention",
        run: async (client, message, args, config, language) => {
            await message.delete()
            const logerchannel = message.guild.channels.find(channel => channel.name === `${config.logchannel}`) || message.channel;
         
            if (!message.mentions.users.first()) {
                return message.reply(`${language.mention}`)
            } 
            
            if (args[1]) {
                let reason = `${args.slice(1).join(" ")}`
            }

            if (!args[1]) {
                let reason = `${language.noreason} || by ${message.author.username}`
            }

            if (!message.member.hasPermission("KICK_MEMBERS")) {
                return message.reply(`${language.noperms}`)
            }

            if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
                return message.reply(`${language.botnoperms}`)
            }

            const bye = message.mentions.users.first() || message.guild.members.get(args[0])

            if (!bye) {
                return message.reply(`${language.memnotfound}`)
            }

            if (!bye.id === message.author.id) {
                return message.reply(`${language.banyourself}`)
            }

            if (!bye.kickable) {
                return message.reply(`${language.notbannable}`)
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
                if (error) return logerchannel.send(`${throwerr} ${error}`)
            })
        }
    }
