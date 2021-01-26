import { Router } from 'express'

import routesAuth from './auth'

const router = Router()

router.use('/auth', routesAuth)

export default router
