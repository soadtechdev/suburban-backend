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
      result = await client.set(`income_${id}_${creatorPhone}`, data)
    } else {
      result = await client.set(`outcome_${id}_${creatorPhone}`, data)
    }

    return result
  }
}
