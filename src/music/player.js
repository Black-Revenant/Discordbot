const { Player } = require("discord-player");
const { DefaultExtractors } = require("@discord-player/extractor");

async function setupPlayer(client) {
    const player = new Player(client, {
        skipFFmpeg: false,
        ytdlOptions: {
            quality: "highestaudio",
            highWaterMark: 1 << 25
        }
    });

    await player.extractors.loadMulti(DefaultExtractors);

    client.player = player;

    console.log("🎵 Discord Player Ready");

    player.events.on("connection", () => {
        console.log("🔊 Voice Connected");
    });

    player.events.on("disconnect", () => {
        console.log("🔌 Voice Disconnected");
    });

    player.events.on("audioTrackAdd", (queue, track) => {
        console.log(`➕ Added: ${track.title}`);
    });

    player.events.on("playerStart", (queue, track) => {
        console.log(`▶️ Playing: ${track.title}`);

        queue.metadata
            ?.send(`🎵 **Now Playing:** **${track.title}**`)
            .catch(() => {});
    });

    player.events.on("playerSkip", (queue, track) => {
        console.log(`⏭️ Skipped: ${track.title}`);
    });

    player.events.on("emptyQueue", () => {
        console.log("📭 Queue Empty");
    });

    player.events.on("playerFinish", (queue, track) => {
        console.log(`✅ Finished: ${track.title}`);
    });

    player.events.on("playerError", (queue, error) => {
        console.error("❌ Player Error:", error.message || error);

        // Skip broken songs automatically
        try {
            queue.node.skip();
        } catch {}
    });

    player.events.on("connectionError", (queue, error) => {
        console.error("❌ Connection Error:", error.message || error);
    });

    player.events.on("error", (queue, error) => {
        console.error("❌ General Error:", error.message || error);
    });
}

module.exports = { setupPlayer };