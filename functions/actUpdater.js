const dig = require('gamedig');

async function updateStatus(client, config, language) {
    return dig.query({
        type: 'fivem',
        host: config.ip,
        port: config.port,
        socketTimeout: 5000,
        udpTimeout: 10000
    }).then((info) => {
        client.user.setActivity(`${language.ingame}: ${info.raw.clients}/${info.raw.sv_maxclients}`, {
            type: "WATCHING"
        })
    }).catch((error) => {
        console.error(`Server is **offline**`)
    })
}

exports.updateStatus = updateStatus
