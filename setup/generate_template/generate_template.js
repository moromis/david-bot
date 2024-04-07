const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const { createTemplateYamlString } = require("./createTemplateYamlString");
dotenv.config({
  path: !!process.env.DEV === true ? "../../.dev.env" : "../../.env",
});

console.log("generating template using AWS account ", process.env.AWS_ID);

if (
  !process.env.PUBLIC_KEY ||
  !process.env.CHANNEL_ID ||
  !process.env.BOT_TOKEN ||
  !process.env.GUILD_ID ||
  !process.env.AWS_ID
) {
  throw new Error(
    "You must define all variables in the .env file (see readme for more details)",
  );
}

const main = () => {
  const template = createTemplateYamlString();

  fs.writeFileSync(
    path.join(__dirname, "..", "..", "template.yaml"),
    template,
    "utf-8",
  );
  console.log("File template.yaml generated successfully.");
  return;
};

main();
