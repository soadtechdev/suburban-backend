import Joi from 'joi'

export default {
  create: Joi.object().keys({
    idCreador: Joi.number().required(),
    status: Joi.number().required(),
    dataEncargo: Joi.object().required(),
    session: Joi.object().optional()
  }),
  changeStatusOrder: Joi.object().keys({
    status: Joi.number().required(),
    idRepartidor: Joi.number().optional(),
    motivo: Joi.string().optional(),
    session: Joi.object().optional()
  })
}
