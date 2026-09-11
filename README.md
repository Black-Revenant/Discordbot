# TEAM DARK Discord Bot

A Discord community companion with AI chat, memory, moderation, anti-spam, anti-scam links, welcome/goodbye messages, leveling, admin settings, and a live dashboard.

## Setup

1. Install Node.js 18.17 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and fill in `DISCORD_TOKEN`.
4. In the Discord Developer Portal, enable **Server Members Intent** and **Message Content Intent**.
5. Run `npm start`.
6. Open `http://localhost:3000`.

The bot registers these slash commands:  `/level`, `/warn`, and `/config`.

Set `MODERATION_WORDS` to a comma-separated list of terms to block, for example `term-one,term-two`. The dashboard requires `DASHBOARD_SECRET` for both reading and changing settings.

## Run

 Set the environment variables from `.env.example`, use `npm start` as the start command, and attach persistent storage for the `data/` folder.
