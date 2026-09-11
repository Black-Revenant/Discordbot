const store = require("../store");

module.exports = {
    name: "memory",

    async execute(interaction) {

        if (interaction.options.getSubcommand() === "clear") {

            store.clearMemory(interaction.user.id);

            await interaction.reply(
                "🧠 Your private conversation memory is cleared."
            );

        } else {

            await interaction.reply(
                `🧠 I remember **${store.getMemory(interaction.user.id).length}** recent messages for you.`
            );

        }

    }
};