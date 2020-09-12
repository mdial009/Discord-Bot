require("dotenv").config();

const { Client, WebhookClient } = require("discord.js");

const bot = new Client({ partials: ["MESSAGE", "REACTION"] });

const webhookClient = new WebhookClient(
  process.env.WEBHOOK_ID,
  process.env.WEBHOOK_TOKEN
);

const PREFIX = "$";

// Emitted when the client(bot) becomes ready to start working.
bot.on("ready", () => {
  console.log(`${bot.user.tag}. has logged in `);
});

bot.on("message", async (message) => {
  // check to see if the message was sent by a bot.
  if (message.author.bot) return;
  // Making a kick/ban commnad
  if (message.content.startsWith(PREFIX)) {
    const [Command_Name, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (Command_Name === "kick" || "Kick") {
      if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.reply("You do not have permissions to use that command");
      if (args.length === 0) return message.reply("Please provide an ID");
      //see's if the member is in the cache.
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(` ${member} was kicked`))
          .catch((err) => message.channel.send("I do not have permissions :("));
      } else {
        message.channel.send("That member was not found");
      }
    }
    if (Command_Name === "ban") {
      if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.reply("You do not have permissions to use that command");
      if (args.length === 0) return message.reply("Please provide an ID");
      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send("User has been banned successfully");
      } catch (err) {
        console.log(err);
        message.channel.send(
          "An error has occured. Either I do not have permissions or the user was not found"
        );
      }
    }
    if (Command_Name === "announce") {
      console.log(args);
      const msg = args.join(" ");
      console.log(msg);
      webhookClient.send(msg);
    }
  }
});

// Add a role by reacting to a message
bot.on("messageReactionAdd", (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  // the id of the message you want people to react to
  if (reaction.message.id === "754129658097827861") {
    switch (name) {
      case "🍎":
        // copy the id of the role into the string
        member.roles.add("754128477686333470");
        break;
      case "🍌":
        member.roles.add("754128527749546076");
        break;
      case "🍇":
        member.roles.add("754128589242237009");
        break;
      case "🍑":
        member.roles.add("754128965572100096");
        break;
    }
  }
});

// Remove a role by reacting to a message
bot.on("messageReactionAdd", (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  // the id of the message you want people to react to
  if (reaction.message.id === "754129658097827861") {
    switch (name) {
      case "🍎":
        // copy the id of the role into the string
        member.roles.add("754128477686333470");
        break;
      case "🍌":
        member.roles.add("754128527749546076");
        break;
      case "🍇":
        member.roles.add("754128589242237009");
        break;
      case "🍑":
        member.roles.add("754128965572100096");
        break;
    }
  }
});
bot.login(process.env.Experiment_626_Token);
