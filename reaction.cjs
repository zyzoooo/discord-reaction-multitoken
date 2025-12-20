const { Client } = require("discord.js-selfbot-v13");
const readline = require("readline-sync");
const fs = require("fs");
const path = require("path");

const tokens = fs.readFileSync(path.join(__dirname, "tokens.txt"), "utf-8")
  .split("\n")
  .map(x => x.trim())
  .filter(x => x.length > 0);

const prompt_message_id = readline.question("Enter the message ID to react to: ");
const prompt_channel_id = readline.question("Enter the channel ID the message is in: ");

let selected_reaction = null;

function get_valid_token_and_reactions(index = 0) {
  if (index >= tokens.length) {
    console.log("Unable to fetch message.");
    process.stdin.resume();
    return;
  }

  const client = new Client();

  client.on("ready", async () => {
    try {
      const channel = await client.channels.fetch(prompt_channel_id);
      const message = await channel.messages.fetch(prompt_message_id);
      const reactions = message.reactions.cache.map(r => ({
        name: r.emoji.name,
        id: r.emoji.identifier || r.emoji.name
      }));

      if (reactions.length === 0) {
        console.log("No reactions found.");
        process.stdin.resume();
        return;
      }

      console.log("\nChoose a reaction to apply:");
      reactions.forEach((r, i) => {
        console.log(`Press ${i + 1} for: ${r.name}`);
      });

      const choice = readline.questionInt("\nEnter your choice: ");
      selected_reaction = reactions[choice - 1];
      if (!selected_reaction) {
        console.log("Invalid selection.");
        process.stdin.resume();
        return;
      }

      client.destroy();
      run_reactors();
    } catch {
      client.destroy();
      get_valid_token_and_reactions(index + 1);
    }
  });

  client.login(tokens[index]).catch(() => {
    get_valid_token_and_reactions(index + 1);
  });
}

function run_reactors() {
  tokens.forEach(token => {
    const bot = new Client();

    bot.on("ready", async () => {
      try {
        const chan = await bot.channels.fetch(prompt_channel_id);
        const msg = await chan.messages.fetch(prompt_message_id);
        await msg.react(selected_reaction.id).catch(() => {});
        console.log(`Reacted with ${selected_reaction.name} using ${bot.user.username}`);
      } catch (err) {
        if (err.message.includes("Missing Access")) return;
      }
    });

    bot.login(token).catch(() => {});
  });

  process.stdin.resume();
}

get_valid_token_and_reactions();
