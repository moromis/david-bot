const { data } = require("../lambda/commands/rsvp");
const { RESPONSES } = require("../lambda/const");

const testRsvpBody = {
  member: {
    user: {
      id: "test123",
    },
  },
  data: {
    name: data.name,
    options: [{ type: 3, name: "Yes", value: RESPONSES.YES }],
  },
};

module.exports = {
  testRsvpBody,
};
