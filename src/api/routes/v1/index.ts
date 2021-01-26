import { Router } from 'express'

import routesAuth from './auth'
// import auth from '../../middleware/auth'

const router = Router()

router.use('/auth', routesAuth)

export default router
