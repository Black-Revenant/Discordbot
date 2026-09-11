const { answer } = require("../ai/chat");

module.exports = {
    name: "ask",

    async execute(interaction) {

        await interaction.deferReply();

        try {
            const response = await answer(
                interaction.user,
                interaction.options.getString("message")
            );

            await interaction.editReply(response);

        } catch (error) {

            console.error(error);

            await interaction.editReply(
                `❌ Error: ${error.message}`
            );

        }

    }
};