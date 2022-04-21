require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const axios = require("axios");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const sadWords = fs.readFileSync("./sad-words.txt", "utf8").split("\n");

client.on("ready", (c) => {
  console.log(`Logged in as ${c.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("$help")) {
    message.channel.send(
      "**Inspiring Bot Commands** \n`$inspire_me` - Get a random inspirational quote \n"
    );
  }

  if (message.content.startsWith("$inspire_me")) {
    axios
      .get("https://inspirobot.me/api?generate=true")
      .then(({ data: quoteImageUrl }) => {
        message.reply({ content: "Good luck", files: [quoteImageUrl] });
      });
  }

  if (sadWords.some((word) => message.content.includes(word))) {
    axios
      .get("https://inspirobot.me/api?generate=true")
      .then(({ data: quoteImageUrl }) => {
        message.reply({
          content: "Please don't be sad",
          files: [quoteImageUrl],
        });
      });
  }
});

client.login(process.env.DISCORD_TOKEN);
