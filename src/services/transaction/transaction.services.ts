import colors from 'colors'
import { Transactions } from 'interfaces/transaction.interfaces'
import TransactionModal from 'models/transaction/transaction.model'
import Logger from 'helpers/logger'
import { uuidv4 } from 'helpers/uuid'

const transactionModal = TransactionModal.getInstance()
export default class TransactionService {
  private static instance: TransactionService

  public static getInstance (): TransactionService {
    if (TransactionService.instance === undefined) {
      TransactionService.instance = new TransactionService()
    }
    return TransactionService.instance
  }

  create = async (title: string, operationAmount: number, debtorNumber: number, type: number, totalPaid: number, paymentHistory: object[], creatorPhone: number): Promise<Transactions | undefined> => {
    try {
      const data = {
        title,
        operationAmount,
        debtorNumber,
        type,
        totalPaid,
        paymentHistory,
        id: uuidv4()
      }
      const result = await transactionModal.create(data.id, creatorPhone, type, JSON.stringify(data))
      return result
    } catch (error) {
      Logger.error(colors.red('Error TransactionService createContact '), error)
      throw new Error('ERROR TECNICO')
    }
  }
  getKeysByCreatorPhoneAndType = async (creatorPhone: number, type: number): Promise<Array<string> | undefined> => {
    try {
      const result = await transactionModal.getKeysByCreatorPhoneAndType(creatorPhone, type)
      return result
    } catch (error) {
      Logger.error(colors.red('Error TransactionService getKeysByCreatorPhoneAndType '), error)
      throw new Error('ERROR TECNICO')
    }
  }
  getKeysByCreatorPhone = async (creatorPhone: number): Promise<Array<string> | undefined> => {
    try {
      const result = await transactionModal.getKeysByCreatorPhone(creatorPhone)
      return result
    } catch (error) {
      Logger.error(colors.red('Error TransactionService getKeysByCreatorPhoneAndType '), error)
      throw new Error('ERROR TECNICO')
    }
  }
  getByKey = async (key: string): Promise<object | undefined> => {
    try {
      const result = await transactionModal.getByKey(key)
      return result !== undefined ? JSON.parse(result) : result
    } catch (error) {
      Logger.error(colors.red('Error TransactionService getKeysByKey '), error)
      throw new Error('ERROR TECNICO')
    }
  }
}
