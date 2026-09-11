const store = require("../store");

module.exports = {
    name: "level",

    async execute(interaction) {

        const user = store.getLevel(interaction.user.id);
        const rank = store.getRank(interaction.user.id);

        await interaction.reply({
            content:
`╔════════════════════════════════════╗
║          🏆 TEAM DARK RANK         ║
╠════════════════════════════════════╣
║ 👤 User      : ${interaction.user.username}
║ 🥇 Rank      : #${rank}
║ ⭐ Level     : ${user.level}
║ ✨ XP        : ${user.xp}/${user.level * 100}
║ 🎁 Total XP  : ${user.totalXp}
║ 💬 Messages  : ${user.messages}
╚════════════════════════════════════╝`
        });

    }
};