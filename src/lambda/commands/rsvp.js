const { RESPONSES, TABLE_NAME } = require("../const");
const { db } = require("../services");

exports.data = {
  name: "rsvp",
  description: "RSVP for this week's meetup",
  options: [
    {
      name: "response",
      description: "Are you coming this week?",
      type: 3,
      required: true,
      choices: [
        {
          name: "Yes",
          value: RESPONSES.YES,
        },
        {
          name: "No",
          value: RESPONSES.NO,
        },
        {
          name: "Maybe",
          value: RESPONSES.MAYBE,
        },
      ],
    },
  ],
};

exports.rsvp = async (body) => {
  const response = body.data.options[0].value;

  let ret = {
    statusCode: 200,
    body: JSON.stringify({
      type: 4,
      data: {
        content: `<@${body.member.user.id}>, you've responded "${response}". List updated!`, // TODO: random response here
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  await db
    .put(TABLE_NAME, {
      id: body.member.user.id,
      name: body.member.user.global_name,
      response,
    })
    .catch((e) => {
      console.error(e);
      ret = {
        statusCode: 401,
        body: JSON.stringify({
          type: 4,
          data: {
            content: "Something went wrong.",
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    });

  return ret;
};
