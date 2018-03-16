import Joi from 'joi'

const objWithHtmlSchema = Joi.object({
  rendered: Joi.string().regex(/<[a-z][\s\S]*>/i).required(),
  excess_detail: Joi.any().allow(null).required(),
}).required()

const objWithSourceSchema = Joi.object({
  source_url: Joi.string().required(),
  excess_detail: Joi.any().allow(null).required(),
}).required()

const featuredMediaSchema = Joi.array().items(
  Joi.object({
    alt_text: Joi.string().required(),
    excess_detail: Joi.any().allow(null).required(),
    media_details: Joi.object({
      sizes: Joi.object({
        medium: objWithSourceSchema,
        medium_large: objWithSourceSchema,
        large: objWithSourceSchema,
        full: objWithSourceSchema,
        excess_detail: Joi.any().allow(null).required(),
      }).required(),
    }).required(),
  }).required()
).max(1).required()

const tagsSchema = Joi.array().ordered(
  Joi.any().allow(null).required(),
  Joi.array().items(
    Joi.object({
      id: Joi.number().positive().required(),
      name: Joi.string().required(),
      excess_detail: Joi.any().allow(null).required(),
    }).required()
  ).required()
).required()

export const basePostSchema = Joi.object({
  id: Joi.number().positive().required(),
  date: Joi.string().isoDate().required(),
  title: objWithHtmlSchema,
  content: objWithHtmlSchema,
  excerpt: objWithHtmlSchema,
  excess_detail: Joi.any().allow(null).required(),
}).required()

export const postWithModifiedDate = basePostSchema.keys({
  modified: Joi.string().isoDate().required(),
})

export const postWithFeaturedMediaSchema = basePostSchema.keys({
  _embedded: Joi.object({
    'wp:featuredmedia': featuredMediaSchema,
    excess_detail: Joi.any().allow(null).required(),
  }).required(),
})

export const postWithTagsSchema = basePostSchema.keys({
  _embedded: Joi.object({
    'wp:term': tagsSchema,
    excess_detail: Joi.any().allow(null).required(),
  }).required(),
})
