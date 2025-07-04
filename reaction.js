const { Client } = require("discord.js-selfbot-v13");
const readline = require("readline-sync");
const fs = require("fs");

const tokens = fs.readFileSync(" PASTE TOKEN FILE DIRECTORY HERE ", "utf-8")
  .split("\n")
  .map(x => x.trim())
  .filter(x => x.length > 0);

const prompt_message_id = readline.question("Enter the message ID to react to: ");
const prompt_channel_id = readline.question("Enter the channel ID the message is in: ");

tokens.forEach(token => {
  const client = new Client();

  client.on("ready", async () => {
    console.log(`Logged in as ${client.user.username}`);
    try {
      const channel = await client.channels.fetch(prompt_channel_id);
      const message = await channel.messages.fetch(prompt_message_id);
      const reactions = message.reactions.cache.map(r => r.emoji.identifier || r.emoji.name);

      for (const reaction of reactions) {
        await message.react(reaction).catch(() => console.log(`Failed to react with ${reaction}`));
      }

      console.log(`Reactions copied with ${client.user.username}`);
    } catch (err) {
      console.log(`Error using ${client.user.username}: ${err.message}`);
    }
  });

  client.login(token).catch(err => {
    console.log(`Token failed: ${token.slice(0, 25)}... -> ${err.message}`);
  });
});
