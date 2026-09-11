const { Player } = require("discord-player");
const { DefaultExtractors } = require("@discord-player/extractor");

async function setupPlayer(client) {
    const player = new Player(client);

    await player.extractors.loadMulti(DefaultExtractors);

    client.player = player;

    player.events.on("playerStart", (queue, track) => {
    if (queue.metadata) {
        queue.metadata.send(
            `🎵 **Now Playing:** **${track.title}** by **${track.author}**`
        ).catch(() => {});
    }
});
    player.events.on("error", (queue, error) => {
        console.error(error);
    });
    player.events.on("connectionError", (queue, error) => {
    console.error("Connection Error:", error);
});

player.events.on("playerError", (queue, error) => {
    console.error("Player Error:", error);
});

    console.log("🎵 Discord Player Ready");
}

module.exports = { setupPlayer };