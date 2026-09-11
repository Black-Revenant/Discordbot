const store = require("../store");

const spamMap = new Map();

const scamPattern =
    /(discord\.gift|free[-_ ]?nitro|steamcommunity\.com\/gift|bit\.ly\/|tinyurl\.com\/|grabify|@everyone)/i;

const badWords = (process.env.MODERATION_WORDS || "")
    .split(",")
    .map(word => word.trim().toLowerCase())
    .filter(Boolean);

function protectionResult(message) {

    const settings = store.getSettings();
    const text = message.content;

    if (settings.antiScam && scamPattern.test(text))
        return "scam";

    if (
        settings.moderation &&
        badWords.some(word => text.toLowerCase().includes(word))
    )
        return "moderation";

    if (settings.antiSpam) {

        const now = Date.now();

        const recent = (spamMap.get(message.author.id) || [])
            .filter(time => now - time < 8000);

        recent.push(now);

        spamMap.set(message.author.id, recent);

        if (recent.length >= 7)
            return "spam";
    }

    return null;
}

module.exports = protectionResult;