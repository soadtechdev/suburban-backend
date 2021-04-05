import { Contact } from '../../interfaces/contact.interfaces'
import client from '../../loaders/redis'
export default class OrderModel {
  private static instance: OrderModel

  public static getInstance(): OrderModel {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!OrderModel.instance) {
      OrderModel.instance = new OrderModel()
    }
    return OrderModel.instance
  }

  createContact = async (number: number, email: string, data: string): Promise<Contact | undefined> => {
    const result: any = await client.set(`contact_${number}_${email}`, data)
    return result
  }

  getKeyByEmail = async (email: string): Promise<Contact | undefined> => {
    const result: any = await client.keys(`contact_*_${email}`)
    return result
  }
}
