const axios = require('axios');
const SteamUser = require('steam-user');

const DEPLOYMENT_ID = "5dee4062a90b42cd98fcad618b6636c2";

async function getEosToken(steamToken, basicAuth) {
    const user = new SteamUser();
    
    // Log in to Steam
    await new Promise((resolve, reject) => {
        user.logOn({ refreshToken: steamToken });
        user.on('loggedOn', resolve);
        user.on('error', reject);
    });

    // Create Squad session ticket
    const ticket = await user.createAuthSessionTicket(393380);
    const hexTicket = ticket.sessionTicket.toString("hex");

    const params = new URLSearchParams();
    params.append("grant_type", "external_auth");
    params.append("external_auth_type", "steam_session_ticket");
    params.append("external_auth_token", hexTicket);
    params.append("deployment_id", DEPLOYMENT_ID);

    const response = await axios.post(
        "https://api.epicgames.dev/auth/v1/oauth/token",
        params.toString(),
        {
            headers: {
                "Authorization": `Basic ${basicAuth}`,
                "User-Agent": "EOS-SDK/1.16.0 Squad/1.0.0",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    user.logOff();
    return response.data.access_token;
}

module.exports = { getEosToken };
