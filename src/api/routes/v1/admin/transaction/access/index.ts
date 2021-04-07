import { Request, Response, RequestHandler } from 'express'
import { typeService } from 'helpers/constans'
import { Transactions } from 'interfaces/transaction.interfaces'
import Transaction from 'services/transaction/transaction.services'
import { InternalError, SuccessResponse, BadRequestError } from '../../../../../../helpers/api.response'
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

export const getTransactionByCreator: RequestHandler = async (req: Request, res: Response) => {
  const { creatorPhone, type } = (req.query as unknown) as Transactions
  try {
    // Buscar por tipo de transaccion
    if (type !== undefined) {

      if (![typeService.INCOME, typeService.OUTCOME].includes(Number(type))) return BadRequestError(res, 'No type found')

      const keysTransaction = await transactionService.getKeysByCreatorPhoneAndType(creatorPhone, Number(type))

      if (keysTransaction !== undefined && keysTransaction.length === 0) return BadRequestError(res, 'No transactions found')

      let cont = 0
      const transactions: Array<object> = []
      while (keysTransaction !== undefined && cont < keysTransaction.length) {

        const transaction = await transactionService.getByKey(keysTransaction[cont])
        if (transaction !== undefined) {
          transactions.push(transaction)
        }
        cont++
      }
      SuccessResponse(res, 'success', { data: { transactions } })
    } else {
      const keysTransaction = await transactionService.getKeysByCreatorPhone(creatorPhone)
      if (keysTransaction !== undefined && keysTransaction.length === 0) return BadRequestError(res, 'No transactions found')
      let cont = 0
      const transactions: Array<object> = []
      while (keysTransaction !== undefined && cont < keysTransaction.length) {

        const transaction = await transactionService.getByKey(keysTransaction[cont])
        if (transaction !== undefined) {
          transactions.push(transaction)
        }
        cont++
      }
      SuccessResponse(res, 'success', { data: { transactions } })
    }
  } catch (error) {
    InternalError(res)
  }
}
