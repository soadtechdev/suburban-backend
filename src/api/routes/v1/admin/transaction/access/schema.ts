import Joi from 'joi'

export default {
  create: Joi.object().keys({
    title: Joi.string().required(),
    operationAmount: Joi.number().required(),
    debtorNumber: Joi.number().required(),
    creatorPhone: Joi.number().required(),
    type: Joi.number().required(),
    totalPaid: Joi.number().required(),
    paymentHistory: Joi.array().required(),
    session: Joi.object().optional()
  })
}
