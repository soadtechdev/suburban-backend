import Joi from 'joi'
import { JoiAuthBearer } from '../../../middleware/validator'

export default {
  headers: Joi.object()
    .keys({
      Authorization: JoiAuthBearer().required(),
      'content-type': Joi.string().required().equal('application/json')
    })
    .unknown(true)
}
