const axios = require('axios');

const DEPLOYMENT_ID = "5dee4062a90b42cd98fcad618b6636c2";

async function getPopulatedServers(eosToken) {
    const body = {
        criteria: [
            { key: "attributes.PLAYERCOUNT_l", op: "GREATER_THAN", value: 0 },
            { key: "attributes.COOPSERVER_b", op: "EQUAL", value: false }
        ],
        maxResults: 500
    };

    const response = await axios.post(
        `https://api.epicgames.dev/matchmaking/v1/${DEPLOYMENT_ID}/filter`,
        body,
        {
            headers: {
                "Authorization": `Bearer ${eosToken}`,
                "User-Agent": "EOS-SDK/1.16.0 Squad/1.0.0",
                "Content-Type": "application/json"
            }
        }
    );

    return response.data.sessions;
}

module.exports = { getPopulatedServers };
