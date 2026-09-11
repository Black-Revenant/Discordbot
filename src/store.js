const fs = require('node:fs');
const path = require('node:path');

const dataDir = path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'bot.json');

const defaults = {
  settings: {
    moderation: true,
    antiSpam: true,
    antiScam: true,
    welcome: true,
    leveling: true,
    logChannelId: '',
    welcomeChannelId: '',
    welcomeMessage: 'Welcome to {server}, {user}! 👋'
  },
  memories: {},
  levels: {},
  warnings: {},
  stats: {
    messages: 0,
    moderated: 0,
    scamsBlocked: 0,
    spamBlocked: 0,
    warnings: 0,
    joins: 0,
    commands: 0
  }
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function load() {
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(defaults, null, 2));
    return clone(defaults);
  }
  try {
    const saved = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    return {
      ...clone(defaults),
      ...saved,
      settings: { ...defaults.settings, ...(saved.settings || {}) },
      stats: { ...defaults.stats, ...(saved.stats || {}) }
    };
  } catch {
    return clone(defaults);
  }
}

let db = load();
let writeTimer;

function save() {
  clearTimeout(writeTimer);
  writeTimer = setTimeout(() => fs.writeFileSync(dataFile, JSON.stringify(db, null, 2)), 50);
}

function getSettings() {
  return db.settings;
}

function updateSettings(patch) {
  db.settings = { ...db.settings, ...patch };
  save();
  return db.settings;
}

function getMemory(userId) {
  return db.memories[userId] || [];
}

function addMemory(userId, role, content) {
  db.memories[userId] = [...getMemory(userId), { role, content, at: Date.now() }].slice(-12);
  save();
}

function clearMemory(userId) {
  delete db.memories[userId];
  save();
}

function addWarning(userId, moderatorId, reason) {
  const warning = { moderatorId, reason, at: Date.now() };
  db.warnings[userId] = [...(db.warnings[userId] || []), warning].slice(-25);
  increment('warnings');
  return warning;
}

function getWarnings(userId) {
  return db.warnings[userId] || [];
}


function getLevel(userId) {
  if (!db.levels[userId]) {
    db.levels[userId] = {
      xp: 0,
      level: 1,
      totalXp: 0,
      messages: 0,
      lastMessage: 0
    };
  }

  return db.levels[userId];
}

function addXp(userId, amount = 5) {

  const user = getLevel(userId);

  user.messages++;
  user.totalXp += amount;
  user.xp += amount;

  let leveledUp = false;

  while (user.xp >= user.level * 100) {
    user.xp -= user.level * 100;
    user.level++;
    leveledUp = true;
  }

  user.lastMessage = Date.now();

  db.levels[userId] = user;

  save();

  return {
    level: user.level,
    xp: user.xp,
    totalXp: user.totalXp,
    messages: user.messages,
    leveledUp
  };
}

function getRank(userId) {

  const users = Object.entries(db.levels);

  users.sort((a, b) => {

    if (b[1].level !== a[1].level)
      return b[1].level - a[1].level;

    return b[1].xp - a[1].xp;

  });

  return users.findIndex(([id]) => id === userId) + 1;

}

function getLeaderboard() {

  return Object.entries(db.levels)

    .sort((a, b) => {

      if (b[1].level !== a[1].level)
        return b[1].level - a[1].level;

      return b[1].xp - a[1].xp;

    });

}

function increment(stat, amount = 1) {
  db.stats[stat] = (db.stats[stat] || 0) + amount;
  save();
}

function snapshot() {
  return clone(db);
}

module.exports = {
  getSettings,
  updateSettings,
  getMemory,
  addMemory,
  clearMemory,
  addWarning,
  getWarnings,
  getLevel,
  getRank,
  getLeaderboard,
  addXp,
  increment,
  snapshot
};