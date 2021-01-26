import { Request, Response } from 'express'
import { UserCredentials } from '../../../../../interfaces/users.interfaces'
import { SuccessResponse, InternalError, BadRequestError, AuthFailureError } from '../../../../../helpers/api.response'
import Logger from '../../../../../helpers/logger'
import UsersService from '../../../../../services/auth/users.service'

const usersService = UsersService.getInstance()

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const { correo, password }: UserCredentials = req.body
    const user = await usersService.findByEmail(correo)
    if (user === undefined) return BadRequestError(res, 'User not register')

    const match = await usersService.comparePassword(password, user.password)

    if (match === undefined) return AuthFailureError(res)
    const newUser: any = { ...user }
    delete newUser.password
    const token = usersService.signToken(newUser)

    return SuccessResponse(res, 'Signup Successful', { data: { user: newUser, token } })
  } catch (error) {
    Logger.error(error)
    return InternalError(res)
  }
}
