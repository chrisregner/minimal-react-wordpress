import Joi from 'joi'

const rawTagsSchema = Joi.array().items(
  Joi.object({
    id: Joi.number().positive().required(),
    count: Joi.number().positive().required(),
    name: Joi.string().required(),
    someUnusedKey: Joi.string().required(),
  })
).required()

export default rawTagsSchema
