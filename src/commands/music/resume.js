const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: "resume",

    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resume the current song"),

    async execute(interaction) {

        const queue = interaction.client.player.nodes.get(interaction.guild.id);

        if (!queue) {
            return interaction.reply({
                content: "❌ Nothing is playing.",
                ephemeral: true
            });
        }

        queue.node.resume();

        await interaction.reply("▶️ Music resumed.");
    }
};