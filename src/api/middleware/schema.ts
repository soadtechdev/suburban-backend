import Joi from 'joi'
import { JoiAuthBearer } from './validator'

export default {
  headers: Joi.object().keys({
    authorization: JoiAuthBearer().required()
  }).unknown(true)
}