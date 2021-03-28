const DocumentClient = require("aws-sdk/clients/dynamodb").DocumentClient;
const dynamodb = new DocumentClient();

// handles incoming player kill updates from game server
module.exports.newKills = async (event, context) => {
  const { playerId, kills } = JSON.parse(event.body);

  const response = await dynamodb
    .put({
      TableName: process.env.PLAYER_KILLS_TABLE,
      Item: {
        playerId,
        timestamp: new Date().toISOString(),
        kills,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        response: {
          success: true,
        },
      },
      null,
      2
    ),
  };
};
