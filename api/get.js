const DynamoDB = require("aws-sdk/clients/dynamodb");
const db = new DynamoDB();

// updates clients with kill totals
module.exports.handler = async (event, context) => {
  try {
    const params = {
      TableName: process.env.TOTAL_KILLS_TABLE,
      Key: {
        pk: { S: "TOTAL KILLS" },
      },
    };
    const data = await db.getItem(params).promise();
    const totalKills = data.Item.totalKills.N;
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": true },
      body: JSON.stringify(
        {
          totalKills,
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.error(error);
  }
};
