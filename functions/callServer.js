const dig = require('gamedig');

function callChannelUpdate(ip, port, channel) {
    return dig.query({
        type: 'fivem',
        host: ip,
        port: port,
        socketTimeout: 5000,
        udpTimeout: 10000
    }).then((state) => {
        console.log(`Starting channel update...`)
        let online = state.clients
        let max = state.maxplayers
        channel.setName(`Online - ${online}/${max}`)
    }).catch((error) => {
        return console.error(`Either channel not found or server is not up!`)
    })
}

exports.callChannelUpdate = callChannelUpdate
