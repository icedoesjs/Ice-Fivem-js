module.exports = {
    name: "ping",
    category: "misc",
    description: "Returns latency and API ping for FiveM Bot",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Checking Ping...`)

        msg.edit(`Retrieved!, Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms, API Latenecy is ${Math.round(client.ping)} ms`)
    }
}