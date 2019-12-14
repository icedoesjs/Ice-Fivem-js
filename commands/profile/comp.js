const { RichEmbed } = require('discord.js')
const { push } = require('quick.db')
module.exports = {
        name: "commend",
        category: "profile",
        description: "Commend a user!",
        run: async (client, message, args, config, language) => {
            await message.delete();
            var reason = args.slice(1).join(' ')

            if (message.mentions.users.first().id === undefined) return message.reply(`${language.memnotfound}`)

            if (!reason) reason = `No reason provided`

                let Embed = new RichEmbed()
                .setAuthor(`You commeneded a user!`)
                .setColor(`${config.color}`)
                .setThumbnail(`${config.logo}`)
                .setDescription(`Reason for commened: **${reason}**`)
                .addField(`User Commended`, `<@${message.mentions.users.first().id}>`)
                .addField(`Commended by`, `<@${message.author.id}>`)
                .setFooter(`View your commendes by doing ${config.prefix1}profile`)
                push(`ICE.commened.${message.mentions.users.first().id}`, `${reason}`)
                message.channel.send(Embed)
            }
        };