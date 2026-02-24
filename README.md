# Squad API Toolkit

A collection of Node.js scripts for interacting with the Squad (AppID 393380) backend infrastructure. These tools bypass the game client to talk directly to Epic Online Services (EOS) and Steam.

## Features

### 1. Headless Authentication
Emulates the game's handshake process to obtain a valid EOS Access Token.
*   Generates a Steam Session Ticket via `steam-user`.
*   Performs the OAuth exchange (`external_auth_type=steam_session_ticket`).
*   Injects the deployment ID: `5dee4062a90b42cd98fcad618b6636c2`.

### 2. Advanced Server Querying
Query the Master Server with granular filters, bypassing the in-game browser's limitations.
*   Filter by Player Count, License Type, or Map.
*   **Zero-Latency:** Returns results in raw JSON.
*   **FireTeam Detection:** Identifies `__EOS_BLISTENING_b` lobbies.

### 3. Connection Emulator (Lobby Spoofing)
Allows connection to 0-player servers by creating a synthetic local Steam Lobby.
*   Uses `steamworks.js` to create a P2P lobby.
*   Sets the `RedpointEOSRoomId_s` metadata to bridge the connection.
*   Generates a valid `steam://joinlobby/393380/...` link.

## Usage

**Prerequisites**
*   Node.js v18+
*   A Steam Account (for the auth ticket)

**Installation**
Clone/Download the repo
```bash
cd lib
npm install
```

**Run Example Script**
```bash
cd lib
node example.js
```
