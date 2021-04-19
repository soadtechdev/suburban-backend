import { Transactions } from '../../interfaces/transaction.interfaces'
import client from '../../loaders/redis'
import { typeService } from '../../helpers/constans'
export default class Transaction {
  private static instance: Transaction

  public static getInstance(): Transaction {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!Transaction.instance) {
      Transaction.instance = new Transaction()
    }
    return Transaction.instance
  }

  create = async (id: string, creatorPhone: number, type: number, data: string): Promise<Transactions | undefined> => {
    let result: any
    if (type === typeService.INCOME) {
      result = await client.set(`transaction_income_${id}_${creatorPhone}`, data)
    } else {
      result = await client.set(`transaction_outcome_${id}_${creatorPhone}`, data)
    }

    return result
  }
  getKeysByCreatorPhoneAndType = async (creatorPhone: number, type: number): Promise<Array<string> | undefined> => {
    let result: any
    if (type === typeService.INCOME) {
      result = await client.keys(`transaction_income_*_${creatorPhone}`)
    } else {
      result = await client.keys(`transaction_outcome_*_${creatorPhone}`)
    }

    return result
  }
  getKeysByCreatorPhone = async (creatorPhone: number): Promise<Array<string> | undefined> => {
    let result: any = await client.keys(`transaction_*_*_${creatorPhone}`)

    return result
  }
  getByKey = async (key: string): Promise<string | undefined> => {
    let result: any = await client.get(key)

    return result
  }
}
