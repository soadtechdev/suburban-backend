import colors from 'colors'
import { Nameless } from 'interfaces/nameless.interfaces'
// import NameLessModal from 'models/nameless/nameless.model'
import Logger from 'helpers/logger'

// const nameLessModal = NameLessModal.getInstance()
export default class NameLessService {
  private static instance: NameLessService

  public static getInstance(): NameLessService {
    if (NameLessService.instance === undefined) {
      NameLessService.instance = new NameLessService()
    }
    return NameLessService.instance
  }

  create = async (title: string, operationAmount: number, debtorNumber: number, type: number, totalPaid: number, paymentHistory: object[]): Promise<Nameless | undefined> => {
    try {
      const data = {
        title,
        operationAmount,
        debtorNumber,
        type,
        totalPaid,
        paymentHistory,
        id: 1
      }

      return data
    } catch (error) {
      Logger.error(colors.red('Error contactModel createContact '), error)
      throw new Error('ERROR TECNICO')
    }
  }
}
