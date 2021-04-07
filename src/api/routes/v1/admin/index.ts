import { Router } from 'express'

import routesContacts from './contacts'
import routesTransaction from './transaction'

const router = Router()

router.use('/contacts', routesContacts)
router.use('/transaction', routesTransaction)

export default router
