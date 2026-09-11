const OpenAI = require("openai");
const store = require("../store");

const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })
    : null;

async function answer(user, prompt) {

    const history = store.getMemory(user.id);

    if (!openai) {
        return "AI chat is not connected yet. Add OPENAI_API_KEY to .env and restart the bot.";
    }

    const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are My Target, a concise, kind Discord community AI."
            },
            ...history.map(msg => ({
                role: msg.role,
                content: msg.content
            })),
            {
                role: "user",
                content: prompt
            }
        ]
    });

    const response =
        completion.choices[0]?.message?.content ||
        "I could not think of a response.";

    store.addMemory(user.id, "user", prompt);
    store.addMemory(user.id, "assistant", response);

    return response.slice(0, 1900);
}

module.exports = {
    answer
};