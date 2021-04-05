import { Request, Response, NextFunction, RequestHandler } from 'express'

// import schema from './schema'
// import validator from '../../../../middleware/validator'
import { SuccessResponse, InternalError, BadRequestError } from 'helpers/api.response'
import Logger from 'helpers/logger'
import { User } from 'interfaces/users.interfaces'
import UsersService from 'services/auth/users.service'

const usersService = UsersService.getInstance()

export const validateEmailUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body as User

    const user = await usersService.findByEmail(email)
    if (user !== null) return BadRequestError(res, 'User already registered')

    next()
  } catch (error) {
    Logger.error(error)
    return InternalError(res)
  }
}

export const createUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const data: User = req.body
    await usersService.save(data)

    return SuccessResponse(res, 'Signup Successful')
  } catch (error) {
    Logger.error(error)
    return InternalError(res)
  }
}
