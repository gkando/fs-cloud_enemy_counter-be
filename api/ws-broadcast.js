const DynamoDB = require("aws-sdk/clients/dynamodb");
const ApiGatewayManagementApi = require("aws-sdk/clients/apigatewaymanagementapi");
const db = new DynamoDB();

const CONNECTION_DB_TABLE = process.env.CONNECTIONS_TABLE;
const TOTAL_DB_TABLE = process.env.TOTAL_KILLS_TABLE;

module.exports.update = async (event, context) => {
  console.log("Received event", { event, context });

  const connections = await getConnections();

  const update = await getUpdate();
  console.log("CONNECTIONS: ", JSON.stringify(connections));
  console.log("NEW UPDATE: ", update);

  const api = new ApiGatewayManagementApi({
    endpoint: process.env.API_GATEWAY_ENDPOINT,
  });
  console.log("END POINT:", api);

  const postCalls = connections.Items.map(async ({ connectionId }) => {
    await api.postToConnection({ ConnectionId: connectionId.S, Data: update }).promise();
  });

  try {
    await Promise.all(postCalls);
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }
};

const getConnections = async () => {
  let connections;
  try {
    connections = await db
      .scan({ TableName: CONNECTION_DB_TABLE, ProjectionExpression: "connectionId" })
      .promise();
    return connections;
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }
};

const getUpdate = async () => {
  try {
    var params = {
      TableName: TOTAL_DB_TABLE,
      Key: {
        playerId: { S: "TOTAL KILLS" },
      },
    };
    var result = await db.getItem(params).promise();
    return JSON.stringify(result);
  } catch (error) {
    console.error(error);
  }
};
