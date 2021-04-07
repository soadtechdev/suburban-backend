import { Request, Response, RequestHandler } from 'express'
import { Transactions } from 'interfaces/transaction.interfaces'
import Transaction from 'services/transaction/transaction.services'
import { InternalError, SuccessResponse } from '../../../../../../helpers/api.response'
const transactionService = Transaction.getInstance()

export const create: RequestHandler = async (req: Request, res: Response) => {
  const { title, operationAmount, debtorNumber, type, totalPaid, paymentHistory, creatorPhone }: Transactions = req.body
  try {
    await transactionService.create(title, operationAmount, debtorNumber, type, totalPaid, paymentHistory, creatorPhone)
    // TODO: emitir socket
    SuccessResponse(res, 'success')
  } catch (error) {
    InternalError(res)
  }
}
