const Joi = require("joi");
const { createPrinter } = require("typescript");
const Response = require("./response.js");

const schema = Joi.object({
  playerId: Joi.string().min(21).required(),
  kills: Joi.number().min(1).required(),
});

let validator = Joi.array().items(schema);

exports.parse = async (body) => {
  // If we do not receive a body with an array, we cannot continue...
  if (!Array.isArray(body) || !body.length) {
    // array does not exist, is not an array, or is empty
    throw Response.invalidData("Missing game events data.");
  }
  try {
    const payload = await validator.validateAsync(body);
    return payload;
  } catch (err) {
    console.error("ERROR: ", err.message);
    throw Response.invalidData(err.message.replace(/"/g, ""));
  }
};
