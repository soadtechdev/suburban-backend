import { Router } from 'express'
import validator from '../../../../middleware/validator'
import * as encargos from './access'
import schema from './access/schema'

const router = Router()

router.post('/create', validator(schema.create), encargos.createEncargo)
router.post('/:id', validator(schema.changeStatusOrder), encargos.changeStatusOrder)

export default router
