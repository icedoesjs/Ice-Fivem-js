const { RichEmbed } = require('discord.js')
module.exports = {
        name: "ban",
        category: "admin",
        description: "Ban a user by mention!",
        run: async (client, message, args, config, language) => {
            await message.delete()
            const logerchannel = message.guild.channels.find(channel => channel.name === `${config.logchannel}`) || message.channel;

            if (!args[0]){
                return message.reply(`${language.mention}`)
            }

            if (args[1]) {
                let reason = `${args.slice(1).join(" ")}`
            }

            if (!args[1]) {
                let reason = `${language.noreason} | by <@${message.author.id}>`
            }

            if (!message.member.hasPermission("BAN_MEMBERS")) {
                return message.reply(`${language.noperms}`)
            }
            
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
                return message.reply(`${language.botnoperms}`)
            }

            const banned = message.mentions.users.first() || message.guild.members.get(args[0]);

            if (!banned) {
                return message.reply(`${language.memnotfound}`)
            }

            if (banned === message.author.id) {
                return message.reply(`${language.banyourself}`)
            }

            if (!banned.bannable) {
                return message.reply(`${language.notbannable}`)
            }

                const embed = new RichEmbed()
                .setAuthor(`${config.shortname} Bans`)
                .setColor(`${config.color}`)
                .setThumbnail(`${config.logo}`)
                .setFooter(`Bot ${language.madeby}`)
                .setDescription(`Ban Reason: ${reason}}`)
                .addField(`User Banned`, `${banned} | ${banned.id}`)
                .addField(`Banned by`, `${message.author.username} | ${message.author.id}`)
                await logchannel.send(embed).then(async banned => {
                    await banned.ban(`${reason}}`)
                    if (error) return logerchannel.send(`${throwerr} ${error}`)
                })
            }
        }
