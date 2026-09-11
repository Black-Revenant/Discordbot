const {
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus
} = require("@discordjs/voice");

const play = require("play-dl");

const player = createAudioPlayer();

async function playSong(connection, song) {

    const stream = await play.stream(song.url);

    const resource = createAudioResource(stream.stream, {
        inputType: stream.type
    });

    player.play(resource);

    connection.subscribe(player);
}

module.exports = {
    player,
    playSong,
    AudioPlayerStatus
};