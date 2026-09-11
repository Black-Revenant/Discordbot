const { Player } = require("discord-player");
const { DefaultExtractors } = require("@discord-player/extractor");

async function setupPlayer(client) {
    const player = new Player(client);

    await player.extractors.loadMulti(DefaultExtractors);

    client.player = player;

    console.log("🎵 Discord Player Ready");

    player.events.on("playerStart", (queue, track) => {
        console.log("▶️ Playing:", track.title);

        if (queue.metadata) {
            queue.metadata
                .send(`🎵 **Now Playing:** **${track.title}**`)
                .catch(() => {});
        }
    });

    player.events.on("audioTrackAdd", (queue, track) => {
        console.log("➕ Added:", track.title);
    });

    player.events.on("playerSkip", (queue, track) => {
        console.log("⏭️ Skipped:", track.title);
    });

    player.events.on("emptyQueue", () => {
        console.log("📭 Queue Empty");
    });

    player.events.on("disconnect", () => {
        console.log("🔌 Disconnected");
    });

    player.events.on("connection", () => {
        console.log("🔊 Voice Connected");
    });

    player.events.on("connectionError", (_, error) => {
        console.error("❌ Connection Error:", error);
    });

    player.events.on("playerError", (_, error) => {
        console.error("❌ Player Error:", error);
    });

    player.events.on("error", (_, error) => {
        console.error("❌ General Error:", error);
    });
}

module.exports = { setupPlayer };