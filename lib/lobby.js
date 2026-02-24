const sw = require('steamworks.js');

async function createSyntheticLobby(serverID) {
    let client;
    try {
        client = sw.init(393380); // Squad Steam APP_ID
    } catch (e) {
        throw new Error("Failed to initialize Steam. Ensure Steam is running.");
    }

    const lobby = await client.matchmaking.createLobby(2, 100);
    const steamID = client.localplayer.getSteamId().steamId64;

    // Set standard Squad metadata
    lobby.setData("buildid", "567588"); // Needs to be updated every new Squad build.
      lobby.setData("CONMETHOD", "P2P");
      lobby.setData("P2PPORT", "7777");
      lobby.setData("NUMOPENPRIVCONN", "0"); // Not important
      lobby.setData("NUMOPENPUBCONN", "3"); // Not important
      lobby.setData("NUMPRIVCONN", "0");
      lobby.setData("NUMPUBCONN", "98");
      lobby.setData("OWNINGID", me.toString());
      lobby.setData("OWNINGNAME", "SquadExtended");
      lobby.setData("P2PADDR", me.toString());
      lobby.setData("SESSIONFLAGS", "227");

    
    // Inject the EOS Session ID
    lobby.setData("RedpointEOSRoomId_s", "Session:" + serverID);
    lobby.setData("RedpointEOSRoomNamespace_s", "Synthetic");

    return `steam://joinlobby/393380/${lobby.id}`; // 393380 = Squad Steam APP_ID
}

module.exports = { createSyntheticLobby };
