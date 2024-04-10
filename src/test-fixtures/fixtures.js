const { data } = require("../main/commands/rsvp");
const { RESPONSES } = require("../main/const");
const { cloneDeep } = require("lodash");

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

const testUsers = [
  { id: "1", displayName: "user1", numCycleChores: 5, currentChore: "test3" },
  { id: "2", displayName: "user2", numCycleChores: 1 },
  { id: "3", displayName: "user3", numCycleChores: 4, currentChore: "test4" },
  { id: "4", displayName: "user4", numCycleChores: 6 },
];

const getTestUsers = () => cloneDeep(testUsers);

module.exports = {
  testRsvpBody,
  getTestUsers,
};
