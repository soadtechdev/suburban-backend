import Joi from 'joi'

export default {
  userCredential: Joi.object().keys({
    usuario: Joi.string().required().min(3),
    clave: Joi.string().required().min(6)
  }),
  signup: Joi.object().keys({
    nombre: Joi.string().required().min(3),
    apellido: Joi.string().required().min(3),
    celular: Joi.string().required(),
    correo: Joi.string().email().required(),
    password: Joi.string().required().min(6)
  }),
  login: Joi.object().keys({
    correo: Joi.string().email().required(),
    password: Joi.string().required().min(6)
  }),
  validateUser: Joi.object().keys({
    usuario: Joi.string().required().min(3)
  })
}
