const Joi = require("joi");
const response = require("./response.js");

const eventSchema = Joi.object({
  playerId: Joi.string().alphanum().required(),
  kills: Joi.number().min(1).required(),
});

exports.parse = async (body) => {
  console.log("EVENT BODY", body);
  // If we do not receive a body, we cannot continue...
  if (!body) {
    // ...so we return a Bad Request response
    throw Error(response.json("Missing game events data.", 400));
  }
  // validate the first item in the events array
  try {
    const eventObject = body[0];
    const { value: payload, error } = eventSchema.validate(eventObject);
    return body;
  } catch (error) {
    throw Error(`Payload error => ${error}.`);
  }
};
