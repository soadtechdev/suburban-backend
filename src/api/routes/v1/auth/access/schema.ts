import Joi from 'joi'

export default {
  userCredential: Joi.object().keys({
    usuario: Joi.string().required().min(3),
    clave: Joi.string().required().min(6)
  }),
  signup: Joi.object().keys({
    name: Joi.string().min(3).max(25).required(),
    middleName: Joi.string().min(3).max(25).required(),
    phone: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    imagen: Joi.string().required(),
    document: Joi.string().required()
  }),
  login: Joi.object().keys({
    correo: Joi.string().email().required(),
    password: Joi.string().required().min(6)
  }),
  validateUser: Joi.object().keys({
    usuario: Joi.string().required().min(3)
  })
}
