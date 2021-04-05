import { Router } from 'express'
import validator from '../../../../middleware/validator'
import * as nameless from './access'
import schema from './access/schema'

const router = Router()

router.post('/', validator(schema.create), nameless.create)

export default router
