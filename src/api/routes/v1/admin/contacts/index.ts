import { Router } from 'express'
import validator from '../../../../middleware/validator'
import * as encargos from './access'
import schema from './access/schema'

const router = Router()

router.post('/', validator(schema.create), encargos.createContact)

export default router
