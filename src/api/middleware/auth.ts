import { Request, Response, NextFunction, RequestHandler, Router } from 'express'

import jwt from 'jsonwebtoken'
import { secretKey } from 'config'
import { AuthFailureError } from 'helpers/api.response'
import logger from 'helpers/logger'
import schema from './schema'
import validator, { ValidationSource } from './validator'

const router = Router()
const auth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization') as string
  const [, token] = authHeader.split(' ')

  try {
    jwt.verify(token, secretKey)
    req.body.session = jwt.decode(token)
    next()
  } catch (error) {
    if (String(error).includes('invalid token')) return AuthFailureError(res, 'Token is not valid')
    if (String(error).includes('jwt expired')) return AuthFailureError(res, 'Token is expired')
    logger.error(error)
    return AuthFailureError(res)
  }
}

router.use('/', validator(schema.headers, ValidationSource.HEADER), auth)

export default router
