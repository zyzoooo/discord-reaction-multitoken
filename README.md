# Multi Token Reactor

### This Node.js script logs into multiple Discord user accounts (selfbots) using user tokens and reacts to a specified message with all emojis already present on that message.


## Setup

1. Install Node.js (v16 or newer) from https://nodejs.org/
2. Open your terminal or command prompt in the project directory
3. Install dependencies by running:
   npm install discord.js-selfbot-v13 readline-sync
5. Create a file named tokens.txt in your project folder, put each token on a seperate line
6.  Run the script:
   Open your terminal or command prompt in the project folder and type: node reaction.js


## Important Notes

- __Create a tokens.txt file and add your tokens, placing each token on a new line.__
- This uses Discord selfbot tokens, which violate Discord's Terms of Service and can result in account termination. Use at your own risk.
- The script automatically skips any invalid tokens and continues with the valid ones.
- Dependencies used:
  discord.js-selfbot-v13 for selfbot client functionality,
   readline-sync for synchronous command line input


  ## File Structure

- reaction.js — main script file

- package.json — dependency list

- tokens.txt — list of user tokens 


## Running

The script will prompt you for the message ID and channel ID, then login each token to react with all emojis present on that message
