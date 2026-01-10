# Discord Mass Reaction Tool

A Node.js script that uses multiple Discord **user tokens** to mass-react to a specific message using an existing reaction on that message.

## Features

- Paste a Discord **message link** (no manual ID copying)
- Automatically fetches existing reactions
- Choose which reaction to apply
- Reacts using all tokens in parallel
- Fast initialization and execution
- Skips accounts without access

## Requirements

- Node.js v16 or newer
- discord.js-selfbot-v13
- Discord **user tokens** (not bot tokens)

## Installation

```bash
npm install discord.js-selfbot-v13 readline-sync
