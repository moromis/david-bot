const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const { createTemplateString } = require("./scheduler_role_template");
dotenv.config({
  path: !!process.env.DEV === true ? "../../.dev.env" : "../../.env",
});

console.log(
  "generating scheduler role json using AWS account ",
  process.env.AWS_ID,
);

if (!process.env.AWS_ID) {
  throw new Error("You must define AWS_ID in the .env file or in the cli");
}

const main = () => {
  const template = createTemplateString();

  fs.writeFileSync(
    path.join(__dirname, "scheduler_role.json"),
    template,
    "utf-8",
  );
  console.log("File scheduler_role.json generated successfully.");
  return;
};

main();
