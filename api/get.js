const DynamoDB = require("aws-sdk/clients/dynamodb");
{ Response } = require("./lib");
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
    return Response.success({totalKills});
  } catch (error) {
    console.error(error);
  }
};
