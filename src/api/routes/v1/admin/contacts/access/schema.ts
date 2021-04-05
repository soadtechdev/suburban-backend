import Joi from 'joi'

export default {
  create: Joi.object().keys({
    name: Joi.string().required(),
    number: Joi.number().required(),
    creatorPhone: Joi.number().required(),
    email: Joi.string().email().required(),
    pass: Joi.string().required(),
    session: Joi.object().optional()
  })
}
