const store = require("../store");
const protectionResult = require("../utils/protection");

module.exports = (client) => {

    client.on("messageCreate", async (message) => {

        // Ignore bots and DMs
        if (message.author.bot || !message.guild) return;

        // Count messages
        store.increment("messages");

        // Check moderation
        const result = protectionResult(message);

        if (result) {

            try {
                await message.delete();
            } catch {}

            store.increment(
                result === "scam"
                    ? "scamsBlocked"
                    : result === "spam"
                    ? "spamBlocked"
                    : "moderated"
            );

            if (result === "scam") {
                await message.channel.send({
                    content: `🛡️ ${message.author}, that link was blocked by Anti-Scam Protection.`,
                    allowedMentions: {
                        users: [message.author.id]
                    }
                });
            }

            return;
        }

        // Leveling System
        if (store.getSettings().leveling) {

            const level = store.addXp(message.author.id, 50);

            if (level.leveledUp) {
                await message.channel.send(
                    `🎉 ${message.author}, you reached **Level ${level.level}**!`
                );
            }

        }

    });

};