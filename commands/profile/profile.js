const { RichEmbed } = require('discord.js')
const { get } = require('quick.db')
const leveling = require('discord-leveling') 
module.exports = {
        name: "profile",
        category: "profile",
        description: "Returns the tagged users profile",
        run: async (client, message, args, config, language) => {
            await message.delete();
            const identity = message.mentions.users.first().id 
            var name = get(`ICE.name.${identity}`)
            var hex = get(`ICE.hex.${identity}`)
            var age = get(`ICE.age.${identity}`)
            var gender = get(`ICE.gender.${identity}`)
            var discordn = message.mentions.users.first().username 
            var commened = get(`ICE.commened.${identity}`)

            if (identity == undefined) return message.reply(`${language.memnotfound}`)

            if (name == undefined) name = `${language.namenotset}`

            if (hex == undefined) hex = `${language.hexnotset}`

            if (age == undefined) age = `${language.agenotset}`

            if (gender == undefined) gender = `${language.gendernotset}`

            if (commened == undefined) commened = `${language.notcommend}`

            var outputuser = message.mentions.users.first()

            var output = await leveling.Fetch(outputuser.id)

            const embed = new RichEmbed()
            .setAuthor(`${discordn}'s profile`)
            .setDescription(`${language.dontknowupdate} ${config.prefix1}help`)
            .setColor(`${config.color}`)
            .setThumbnail(`${config.logo}`)
            .addField(`Roleplay Name`, `${name}`, true)
            .addField(`Steam Hex`, `${hex}`, true)
            .addField(`Age`, `${age}`, true)
            .addField(`Gender`, `${gender}`, true)
            .addField(`Level`, `${output.level}`, true)
            .addField(`Commeneds`, `${commened}`)
            .setFooter(`Profile for ${discordn} requested by ${message.author.username}`)
            message.channel.send(embed)
        }
    }