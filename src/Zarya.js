require("dotenv").config();

const { Client } = require("discord.js");

const bot = new Client();
bot.login(process.env.ZaryaJS_Bot_Token);

// Emitted when the client(bot) becomes ready to start working.
bot.on("ready", () => {
  console.log(`${bot.user.tag}. has logged in `);
});
bot.on("message", (message) => {
  console.log(`${message.react("🤔")}`);
  console.log(message.content);
  console.log(`[${message.author.tag}]: ${message.channel}`);
  // delete messages after a set amount of time.
  message.delete({ timeout: 5000 }).reply("Hey, I'm a reply!");
});
