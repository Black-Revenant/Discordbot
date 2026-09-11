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

const client=new Client({

intents:[
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
],

partials:[Partials.Channel]

});

client.commands=new Collection();
const commandFiles=fs.readdirSync("./src/commands")
.filter(f=>f.endsWith(".js") && f!=="index.js");

for(const file of commandFiles){

const command=require(`./commands/${file}`);

client.commands.set(command.name,command);

}
const commands=require("./commands");

async function registerCommands(){

const rest=new REST({version:"10"})
.setToken(process.env.DISCORD_TOKEN);

await rest.put(

Routes.applicationCommands(client.user.id),

{body:commands}

);

}
require("./events/ready")(client,registerCommands);
require("./events/guildMemberAdd")(client);

require("./events/messageCreate")(client);
require("./events/interactionCreate")(client);
require("./dashboard/server")(client);
client.login(process.env.DISCORD_TOKEN);
