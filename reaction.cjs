const { Client } = require("discord.js-selfbot-v13");
const readline = require("readline-sync");
const fs = require("fs");
const path = require("path");

const zyzo_tokens = fs.readFileSync(path.join(__dirname, "tokens.txt"), "utf-8")
  .split("\n")
  .map(t => t.trim())
  .filter(Boolean);

const zyzo_link = readline.question("Paste the Discord message link: ");

const zyzo_match = zyzo_link.match(/discord\.com\/channels\/\d+\/(\d+)\/(\d+)/);
if (!zyzo_match) process.exit(0);

const zyzo_channel_id = zyzo_match[1];
const zyzo_message_id = zyzo_match[2];

let zyzo_reaction = null;

async function zyzo_pick_reaction() {
  for (const token of zyzo_tokens) {
    const c = new Client({ presence: { status: "invisible" } });
    try {
      await c.login(token);

      const ch = await c.channels.fetch(zyzo_channel_id);
      const msg = await ch.messages.fetch(zyzo_message_id);

      const reacts = msg.reactions.cache.map(r => ({
        name: r.emoji.name,
        id: r.emoji.identifier || r.emoji.name
      }));

      if (!reacts.length) process.exit(0);

      reacts.forEach((r, i) =>
        console.log(`Press ${i + 1} for: ${r.name}`)
      );

      const pick = readline.questionInt("Choice: ");
      zyzo_reaction = reacts[pick - 1];

      c.destroy();
      break;
    } catch {
      c.destroy();
    }
  }

  if (!zyzo_reaction) process.exit(0);
  zyzo_mass_react();
}

function zyzo_mass_react() {
  zyzo_tokens.forEach(token => {
    const c = new Client({ presence: { status: "invisible" } });

    c.on("ready", async () => {
      try {
        const ch = await c.channels.fetch(zyzo_channel_id);
        const msg = await ch.messages.fetch(zyzo_message_id);
        await msg.react(zyzo_reaction.id);
        console.log(`Reacted: ${c.user.username}`);
      } catch {}
    });

    c.login(token).catch(() => {});
  });
}

zyzo_pick_reaction();
