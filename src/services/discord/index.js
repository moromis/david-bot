const { appendToMessage } = require("./appendToMessage");
const { editMessage } = require("./editMessage");
const { fetchMessageById } = require("./fetchMessageById");
const { sendMessage } = require("./sendMessage");

module.exports = {
  appendToMessage: appendToMessage,
  editMessage: editMessage,
  fetchMessageById: fetchMessageById,
  sendMessage: sendMessage,
};
