const settingsKeys = ['moderation', 'antiSpam', 'antiScam', 'welcome', 'leveling'];

function dashboardHeaders() {
  const headers = {};
  const secret = localStorage.getItem('dashboardSecret');
  if (secret) headers.Authorization = `Bearer ${secret}`;
  return headers;
}

async function loadDashboard() {
  const response = await fetch('/api/status', { headers: dashboardHeaders() });
  if (!response.ok) throw new Error(`Status request failed: ${response.status}`);
  const data = await response.json();
  document.querySelector('#messages').textContent = formatNumber(data.stats.messages);
  document.querySelector('#threats').textContent = formatNumber(data.stats.scamsBlocked + data.stats.spamBlocked + data.stats.moderated);
  document.querySelector('#commands').textContent = formatNumber(data.stats.commands);
  document.querySelector('#guilds').textContent = formatNumber(data.guilds);
  settingsKeys.forEach(key => {
    const input = document.querySelector(`[data-setting="${key}"]`);
    if (input) input.checked = Boolean(data.settings[key]);
  });
  document.querySelector('#welcomeChannelId').value = data.settings.welcomeChannelId || '';
  document.querySelector('#welcomeMessage').value = data.settings.welcomeMessage || '';
  document.querySelector('#dashboardSecret').value = localStorage.getItem('dashboardSecret') || '';
}

function formatNumber(number) {
  return new Intl.NumberFormat('en-US').format(number || 0);
}

async function saveSettings() {
  const patch = {};
  settingsKeys.forEach(key => { patch[key] = document.querySelector(`[data-setting="${key}"]`).checked; });
  patch.welcomeChannelId = document.querySelector('#welcomeChannelId').value;
  patch.welcomeMessage = document.querySelector('#welcomeMessage').value;
  const secret = document.querySelector('#dashboardSecret').value;
  if (secret) localStorage.setItem('dashboardSecret', secret);
  const headers = { 'Content-Type': 'application/json' };
  if (secret) headers.Authorization = `Bearer ${secret}`;
  const response = await fetch('/api/settings', { method: 'POST', headers, body: JSON.stringify(patch) });
  const state = document.querySelector('#save-state');
  state.textContent = response.ok ? 'Saved just now' : 'Save failed';
  if (response.ok) setTimeout(() => { state.textContent = 'Ready'; }, 2400);
}

loadDashboard().catch(() => {
  document.querySelector('#save-state').textContent = 'Dashboard unavailable';
});
setInterval(loadDashboard, 15000);
