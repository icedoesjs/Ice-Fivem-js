const { RichEmbed } = require('discord.js')
const { get } = require('quick.db')
const leveling = require('discord-leveling') 
module.exports = {
        name: "profile",
        category: "profile",
        description: "Returns the tagged users profile",
        run: async (client, message, args, config) => {
            await message.delete();
            const identity = message.mentions.users.first().id 
            var name = get(`ICE.name.${identity}`)
            var hex = get(`ICE.hex.${identity}`)
            var age = get(`ICE.age.${identity}`)
            var gender = get(`ICE.gender.${identity}`)
            var discordn = message.mentions.users.first().username 
            var commened = get(`ICE.commened.${identity}`)

            if (identity == undefined) return message.reply("Please mention a user")

            if (name == undefined) name = "Roleplay Name not Set!"

            if (hex == undefined) hex = "Hex not set"

            if (age == undefined) age = "Age not set"

            if (gender == undefined) gender = "No Gender Specified"

            if (commened == undefined) commened = "This user hasnt been commended, be the first to do so!"

            var outputuser = message.mentions.users.first()

            var output = await leveling.Fetch(outputuser.id)

            const embed = new RichEmbed()
            .setAuthor(`${discordn}'s profile`)
            .setDescription(`Dont know how to update your profile? Use ${config.prefix1}help`)
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