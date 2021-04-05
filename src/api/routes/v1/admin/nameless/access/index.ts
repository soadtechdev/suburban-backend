import { Request, Response, RequestHandler } from 'express'
import { Nameless } from 'interfaces/nameless.interfaces'
import NameLessService from 'services/nameless/nameless.services'
import { InternalError, SuccessResponse } from '../../../../../../helpers/api.response'
const nameLessService = NameLessService.getInstance()

export const create: RequestHandler = async (req: Request, res: Response) => {
  const { title, operationAmount, debtorNumber, type, totalPaid, paymentHistory }: Nameless = req.body
  try {
    await nameLessService.create(title, operationAmount, debtorNumber, type, totalPaid, paymentHistory)
    // TODO: emitir socket
    SuccessResponse(res, 'success')
  } catch (error) {
    InternalError(res)
  }
}
