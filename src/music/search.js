const play = require("play-dl");

async function search(query) {

    const results = await play.search(query, {
        limit: 1
    });

    if (!results.length)
        return null;

    return results[0];
}

module.exports = { search };