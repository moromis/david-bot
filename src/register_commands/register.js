const dotenv = require("dotenv");
const axios = require("axios").default;

if (process.env.DEV) {
  dotenv.config({ path: "./.dev.env" });
} else {
  dotenv.config();
}

const url = `https://discord.com/api/v8/applications/${process.env.APP_ID}/guilds/${process.env.GUILD_ID}/commands`;

const headers = {
  Authorization: `Bot ${process.env.BOT_TOKEN}`,
  "Content-Type": "application/json",
};

const commandData = {
  name: "rsvp",
  type: 1,
  description: "RSVP for this week's meetup",
};

axios.post(url, JSON.stringify(commandData), {
  headers: headers,
});
