const DocumentClient = require("aws-sdk/clients/dynamodb").DocumentClient;
const dynamodb = new DocumentClient();

const connections_table = process.env.CONNECTIONS_TABLE;

exports.handler = async function (event) {
  console.log(`EVENT: \n${JSON.stringify(event, null, 2)}`);

  const {
    body,
    requestContext: { connectionId, routeKey },
  } = event;
  switch (routeKey) {
    case "$connect":
      await dynamodb
        .put({
          TableName: connections_table,
          Item: {
            connectionId,
          },
        })
        .promise();
      break;

    case "$disconnect":
      await dynamodb
        .delete({
          TableName: connections_table,
          Key: { connectionId },
        })
        .promise();
      break;

    case "$default":
    default:
      return;
  }

  return { statusCode: 200 };
};
