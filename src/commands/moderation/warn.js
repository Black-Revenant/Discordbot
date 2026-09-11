const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const store = require("../../store");

module.exports = {
    name: "warn",

    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warn a server member")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Member to warn")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason for the warning")
                .setRequired(true)
        ),

    async execute(interaction) {

        if (!interaction.memberPermissions.has(PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply({
                content: "❌ You need the **Moderate Members** permission.",
                flags: 64
            });
        }

        const member = interaction.options.getMember("user");
        const reason = interaction.options.getString("reason");

        if (!member || member.user.bot) {
            return interaction.reply({
                content: "❌ Please select a valid server member.",
                flags: 64
            });
        }

        if (member.id === interaction.user.id) {
            return interaction.reply({
                content: "❌ You cannot warn yourself.",
                flags: 64
            });
        }

        store.addWarning(
            member.id,
            interaction.user.id,
            reason
        );

        await interaction.reply({
            embeds: [
                {
                    color: 0xF1C40F,
                    title: "⚠️ Member Warned",
                    fields: [
                        {
                            name: "Member",
                            value: `${member.user.tag}`,
                            inline: true
                        },
                        {
                            name: "Moderator",
                            value: `${interaction.user.tag}`,
                            inline: true
                        },
                        {
                            name: "Reason",
                            value: reason
                        }
                    ],
                    timestamp: new Date()
                }
            ]
        });

    }
};