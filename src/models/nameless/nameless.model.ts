import { Nameless } from '../../interfaces/nameless.interfaces'
import client from '../../loaders/redis'

export default class NameLess {
  private static instance: NameLess

  public static getInstance(): NameLess {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!NameLess.instance) {
      NameLess.instance = new NameLess()
    }
    return NameLess.instance
  }

  create = async (number: number, email: string, creatorPhone: number, data: string): Promise<Nameless | undefined> => {
    const result: any = await client.set(`contact_${number}_${email}_${creatorPhone}`, data)
    return result
  }
}
