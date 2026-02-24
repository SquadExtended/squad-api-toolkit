const { getEosToken } = require('./lib/auth');
const { getPopulatedServers } = require('./lib/query');
const { createSyntheticLobby } = require('./lib/lobby');

async function run() {
    try {
        // 1. Get EOS Token
        const token = await getEosToken(process.env.STEAM_TOKEN, process.env.EOS_BASIC);
        
        // 2. Fetch servers
        const servers = await getPopulatedServers(token);
        console.log(`Found ${servers.length} populated servers.`);

        // 3. Spool up a link for the first server
        const target = servers[0];
        const link = await createSyntheticLobby(target.id);
        
        console.log(`Ready to join: ${target.attributes.SERVERNAME_s}`);
        console.log(`Link: ${link}`);

    } catch (err) {
        console.error("Execution failed:", err.message);
    }
}

run();
