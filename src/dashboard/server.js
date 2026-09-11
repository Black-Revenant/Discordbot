const express = require("express");
const path = require("node:path");
const store = require("../store");

const port = Number(process.env.PORT || 3000);

module.exports = (client) => {

    const app = express();

    app.use(express.json());
    app.use(express.static(path.join(process.cwd(), "public")));

    app.get("/api/status", (req, res) => {

        if (
            process.env.DASHBOARD_SECRET &&
            req.headers.authorization !== `Bearer ${process.env.DASHBOARD_SECRET}`
        ) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const snapshot = store.snapshot();

        res.json({
            online: client.isReady(),
            bot: client.user?.tag || "Offline",
            guilds: client.guilds.cache.size,
            stats: snapshot.stats,
            settings: snapshot.settings
        });

    });

    app.post("/api/settings", (req, res) => {

        if (
            process.env.DASHBOARD_SECRET &&
            req.headers.authorization !== `Bearer ${process.env.DASHBOARD_SECRET}`
        ) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const allowed = [
            "moderation",
            "antiSpam",
            "antiScam",
            "welcome",
            "leveling",
            "welcomeChannelId",
            "welcomeMessage"
        ];

        const patch = Object.fromEntries(
            Object.entries(req.body).filter(([key]) => allowed.includes(key))
        );

        res.json({
            settings: store.updateSettings(patch)
        });

    });

    app.get("*", (req, res) => {
        res.sendFile(path.join(process.cwd(), "public", "index.html"));
    });

    app.listen(port, () => {
        console.log(`🌐 Dashboard running at http://localhost:${port}`);
    });

};