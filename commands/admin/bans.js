const { RichEmbed } = require('discord.js')
module.exports = {
        name: "ban",
        category: "admin",
        description: "Ban a user by mention!",
        run: async (client, message, args, config) => {
            await message.delete()
            const logerchannel = message.guild.channels.find(channel => channel.name === `${config.logchannel}`) || message.channel;

            if (!args[0]){
                return message.reply(`Mention the user you want to ban!`)
            }

            if (agrs[1]) {
                let reason = `${args.slice(1).join(" ")}`
            }

            if (!args[1]) {
                let reason = `No reason provided | Banned by <@${message.author.id}>`
            }

            if (!message.member.hasPermission("BAN_MEMBERS")) {
                return message.reply(`You do not have permission for this!`)
            }
            
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
                return message.reply(`I do not have permission to ban members!`)
            }

            const banned = message.mentions.users.first() || message.guild.members.get(args[0]);

            if (!banned) {
                return message.reply(`That member was not found!`)
            }

            if (banned === message.author.id) {
                return message.reply(`You can ban yourself!`)
            }

            if (!banned.bannable) {
                return message.reply(`This user is not bannable`)
            }

                const embed = new RichEmbed()
                .setAuthor(`${config.shortname} Bans`)
                .setColor(`${config.color}`)
                .setThumbnail(`${config.logo}`)
                .setFooter(`Bot made by IceyyM8`)
                .setDescription(`Ban Reason: ${reason}}`)
                .addField(`User Banned`, `${banned} | ${banned.id}`)
                .addField(`Banned by`, `${message.author.username} | ${message.author.id}`)
                await logchannel.send(embed).then(async banned => {
                    await banned.ban(`${reason}}`)
                    if (error) return logerchannel.send(`Well i tried to kick ${bye} but there was an error, here's the error ${error}`)
                })
            }
        }
