const MusicQueue = require("./queue");

const queues = new Map();

function getQueue(guildId) {

    if (!queues.has(guildId))
        queues.set(guildId, new MusicQueue());

    return queues.get(guildId);
}

module.exports = {
    getQueue
};