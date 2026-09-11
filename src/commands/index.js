const { SlashCommandBuilder } = require("discord.js");

module.exports = [

new SlashCommandBuilder()
.setName("ask")
.setDescription("Chat with My Target AI")
.addStringOption(o =>
o.setName("message")
.setDescription("Your message")
.setRequired(true)
),

new SlashCommandBuilder()
.setName("memory")
.setDescription("Manage AI Memory")
.addSubcommand(s=>s.setName("clear").setDescription("Clear memory"))
.addSubcommand(s=>s.setName("view").setDescription("View memory")),

new SlashCommandBuilder()
.setName("level")
.setDescription("Show your level"),


new SlashCommandBuilder()
.setName("warn")
.setDescription("Warn a member")
.addUserOption(o=>o.setName("user").setDescription("Member").setRequired(true))
.addStringOption(o=>o.setName("reason").setDescription("Reason").setRequired(true)),

new SlashCommandBuilder()
.setName("config")
.setDescription("Bot configuration")

].map(c=>c.toJSON());