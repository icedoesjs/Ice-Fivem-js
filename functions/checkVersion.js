async function checkVs(current) {
    const axios = require('axios');
    try {
        let version = await axios.get('https://github.com/iceyym8/Ice-Fivem-js/blob/master/local/version.json')
        version = version.data;
        currentvs = current;
        if (currentvs !== version.version) {
            console.log(`A new version is out!`)
        }
    } catch (e) {
        console.log(`Update checker failed, please retry within 4h`)
        let currentvs = current
    }
}

exports.checkVs = checkVs
