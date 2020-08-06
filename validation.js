const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().required(),
  number: Joi.number().integer().required(),
  active: Joi.boolean().required(),
});

module.exports = schema;
