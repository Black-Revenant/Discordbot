const { EmbedBuilder } = require("discord.js");
const store = require("../store");

module.exports = (client) => {

    client.on("guildMemberAdd", async (member) => {

        store.increment("joins");

        const settings = store.getSettings();

        if (!settings.welcome) return;

        const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);

        if (!channel) {
            console.log("❌ Welcome channel not found.");
            return;
        }

        const embed = new EmbedBuilder()
            .setColor("#ff0000")
            .setAuthor({
                name: member.guild.name,
                iconURL: member.guild.iconURL()
            })
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTitle("👋 Welcome!")
            .setDescription(`
## Hey <@${member.id}>!

Welcome to **${member.guild.name}**.

### 📜 Server Rules
Please read <#1296357841157885983>

### ✅ Get Verified
Verify yourself in <#1536300166984765510>

### 📢 Announcements
Stay updated in <#1366076417271664780>

### 💬 Community Chat
Hang out in <#1295780752323121214>

We hope you enjoy your stay!
            `)
            .setImage(process.env.WELCOME_BANNER)
            .setFooter({
                text: `Member #${member.guild.memberCount}`,
                iconURL: member.guild.iconURL()
            })
            .setTimestamp();

        await channel.send({
            content: `🎉 Welcome <@${member.id}>!`,
            embeds: [embed]
        });

    });

};