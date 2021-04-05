import colors from 'colors'
import { Contact } from 'interfaces/contact.interfaces'
import contactModal from 'models/contact/contact.model'
import Logger from 'helpers/logger'

const contactModel = contactModal.getInstance()
export default class ContactService {
  private static instance: ContactService

  public static getInstance(): ContactService {
    if (ContactService.instance === undefined) {
      ContactService.instance = new ContactService()
    }
    return ContactService.instance
  }

  createContact = async (name: string, number: number, email: string, pass: number, creatorPhone: number): Promise<Contact | undefined> => {
    try {
      const data = {
        name,
        pass,
        image: 'https://i.ibb.co/g3qbhkY/036-person.png',
        creatorPhone
      }
      const result: any = await contactModel.createContact(number, email, creatorPhone, JSON.stringify(data))
      return result
    } catch (error) {
      Logger.error(colors.red('Error contactModel createContact '), error)
      throw new Error('ERROR TECNICO')
    }
  }

  getKeyByEmail = async (email: string): Promise<Contact | undefined> => {
    try {
      const result: any = await contactModel.getKeyByEmail(email)
      return result.length > 0 ? result[0] : result
    } catch (error) {
      Logger.error(colors.red('Error contactModel getKeyByEmail '), error)
      throw new Error('ERROR TECNICO')
    }
  }

  getKeysContactByCreatorPhone = async (creatorPhone: number): Promise<string[] | undefined> => {
    try {
      const result: any = await contactModel.getKeysContactByCreatorPhone(creatorPhone)
      return result
    } catch (error) {
      Logger.error(colors.red('Error contactModel getKeysContactByCreatorPhone '), error)
      throw new Error('ERROR TECNICO')
    }
  }

  getContactByKey = async (key: string): Promise<string[] | undefined> => {
    try {
      const result: any = await contactModel.getContactByKey(key)
      return result !== null ? JSON.parse(result) : result
    } catch (error) {
      Logger.error(colors.red('Error contactModel getContactByKey '), error)
      throw new Error('ERROR TECNICO')
    }
  }
}
