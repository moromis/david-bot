# Commands
## V1
- /rsvp <response>: responds with an response, limited to yes, no, or maybe
## V2
- /vote: start a vote if there's not already one happening

# Passive events
## V1
- each Sunday, reset the responses and repost a signup message, store the message id in the db to be edited later with players' responses
## V2
- based on the voted day for this week, on that day at midnight reset responses etc.


# Schemas
data
    user
    response
    currentVote