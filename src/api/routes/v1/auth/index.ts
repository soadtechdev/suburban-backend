import { Router } from 'express'

import * as signup from './access/signup'
import login from './access/login'
import schema from './access/schema'
import validator from '../../../middleware/validator'

const router = Router()

router.post('/signup', validator(schema.signup), signup.validateEmailUser, signup.createUser)
router.post('/login', validator(schema.login), login)

export default router
