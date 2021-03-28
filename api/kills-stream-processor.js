const DocumentClient = require("aws-sdk/clients/dynamodb").DocumentClient;
const dynamodb = new DocumentClient();

module.exports.update = async (event, context) => {
  console.debug("Received event", { event, context });
  event.Records.forEach(async (record) => {
    if (record.eventName === "INSERT") {
      await updateTotals(record);
    }
  });
  console.debug("Successfully processed records", { count: event.Records.length });
};

const updateTotals = async (record) => {
  console.debug("DynamoDB event, record", {
    eventName: record.eventName,
    record: record.dynamodb,
  });

  const pk = "TOTAL KILLS";
  const kills = parseFloat(record.dynamodb.NewImage.kills.N);
  const timestamp = record.dynamodb.NewImage.timestamp.S;

  try {
    // Optimistically assume that we have a record for the given pk already.
    // The update expression will error out if a record with the given pk already exists and we will handle it in the try block
    await dynamodb
      .update({
        TableName: process.env.TOTAL_KILLS_TABLE,
        Key: { pk },
        ConditionExpression: "attribute_exists(pk)",
        UpdateExpression:
          "SET killUpdates = killUpdates + :increment, totalKills = totalKills + :kills, lastUpdated = :date",
        ExpressionAttributeValues: {
          ":increment": 1,
          ":kills": kills,
          ":date": timestamp,
        },
        ReturnValues: "UPDATED_NEW",
      })
      .promise();
  } catch (error) {
    if (error.code === "ConditionalCheckFailedException") {
      // No record to update, as this is the first time seeing this pk
      console.debug("New record about to be inserted", {
        pk,
        kills,
        updateError: error,
      });

      // Insert new record
      await dynamodb
        .put({
          TableName: process.env.TOTAL_KILLS_TABLE,
          Item: {
            pk,
            killUpdates: 1,
            totalKills: kills,
            lastUpdated: new Date().toISOString(),
          },
          ConditionExpression: "attribute_not_exists(pk)",
        })
        .promise();
    } else {
      console.error("ERROR: dynamodb.put()", { pk, kills }, error);
      throw error;
    }
  }
};
