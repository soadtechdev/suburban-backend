import { Router } from 'express'

import routesOrders from './orders'

const router = Router()

router.use('/orders', routesOrders)

export default router
