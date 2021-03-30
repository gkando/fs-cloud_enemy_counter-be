const DocumentClient = require("aws-sdk/clients/dynamodb").DocumentClient;
const dynamodb = new DocumentClient();
const response = require("./response.js");
const KILLS_TABLE = process.env.PLAYER_KILLS_TABLE;

exports.batchWrite = async (chunks) => {
  console.log("DDB SERVICE: ", chunks);
  await Promise.all(
    chunks.map(async (chunk) => {
      let params = {
        RequestItems: {
          [KILLS_TABLE]: chunk,
        },
      };
      console.log(params, chunk);
      try {
        await dynamodb.batchWrite(params).promise();
      } catch (error) {
        console.error(`failed on:${error}`);
        throw Error(response.json("Write Failed.", 400));
      }
    })
  );
};
