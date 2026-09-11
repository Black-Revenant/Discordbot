const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: "247",

    data: new SlashCommandBuilder()
        .setName("247")
        .setDescription("Enable or disable 24/7 mode")
        .addStringOption(option =>
            option
                .setName("mode")
                .setDescription("on or off")
                .setRequired(true)
                .addChoices(
                    { name: "On", value: "on" },
                    { name: "Off", value: "off" }
                )
        ),

    async execute(interaction) {

        const mode = interaction.options.getString("mode");

        const queue = interaction.client.player.nodes.get(interaction.guild.id);

        if (!queue) {
            return interaction.reply({
                content: "❌ Nothing is playing.",
                ephemeral: true
            });
        }

        if (mode === "on") {

            queue.options.leaveOnEmpty = false;
            queue.options.leaveOnEnd = false;
            queue.options.leaveOnStop = false;

            return interaction.reply("✅ 24/7 Mode Enabled.");

        }

        queue.options.leaveOnEmpty = true;
        queue.options.leaveOnEnd = true;
        queue.options.leaveOnStop = true;

        interaction.reply("❌ 24/7 Mode Disabled.");
    }
};