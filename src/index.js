require("dotenv").config();

const express=require("express");
const path=require("path");
const fs=require("fs");

const {
Client,
GatewayIntentBits,
Partials,
REST,
Routes,
Collection
}=require("discord.js");

const autoJoin = require("./voice/autoJoin");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ],

    partials: [
        Partials.Channel,
        Partials.GuildMember
    ]
});

client.commands = new Collection();

function loadCommands(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            loadCommands(fullPath);
            continue;
        }

        if (!file.name.endsWith(".js") || file.name === "index.js") continue;

        const command = require(fullPath);

        if (!command.name) continue;

        client.commands.set(command.name, command);

        console.log(`✅ Loaded: ${command.name}`);
    }
}

loadCommands(path.join(__dirname, "commands"));


const slashCommands = [];

function loadCommands(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            loadCommands(fullPath);
            continue;
        }

        if (!file.name.endsWith(".js") || file.name === "index.js") continue;

        const command = require(fullPath);

        if (!command.name || !command.data) continue;

        client.commands.set(command.name, command);

        slashCommands.push(command.data.toJSON());

        console.log(`✅ Loaded ${command.name}`);
    }
}

loadCommands(path.join(__dirname, "commands"));

async function registerCommands(){

const rest=new REST({version:"10"})
.setToken(process.env.DISCORD_TOKEN);

await rest.put(

Routes.applicationCommands(client.user.id),
{ body: slashCommands }

);

}
require("./events/ready")(client,registerCommands);
require("./events/guildMemberAdd")(client);

require("./events/messageCreate")(client);
require("./events/interactionCreate")(client);
require("./dashboard/server")(client);
client.login(process.env.DISCORD_TOKEN);

