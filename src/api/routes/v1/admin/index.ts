import { Router } from 'express'

import routesContacts from './contacts'

const router = Router()

router.use('/contacts', routesContacts)

export default router
