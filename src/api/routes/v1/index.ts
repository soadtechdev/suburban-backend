import { Router } from 'express'

import routesAuth from './auth'
import auth from '../../middleware/auth'
import routesAdmin from './admin'
const router = Router()

router.use('/auth', routesAuth)
router.use('/admin', auth, routesAdmin)

export default router
