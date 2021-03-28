const DocumentClient = require("aws-sdk/clients/dynamodb").DocumentClient;
const dynamodb = new DocumentClient();

// updates clients with kill totals
module.exports.kills = async (event, context) => {
  try {
    const params = {
      TableName: process.env.TOTAL_KILLS_TABLE,
      Key: {
        pk: { S: "TOTAL KILLS" },
      },
    };
    const data = await db.getItem(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          data,
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.error(error);
  }
};
