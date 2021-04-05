import { Request, Response, RequestHandler } from 'express'
import { Contact } from 'interfaces/contact.interfaces'
import ContactService from 'services/contact/contact.service'
import { BadRequestError, InternalError, SuccessResponse } from '../../../../../../helpers/api.response'
const contactService = ContactService.getInstance()

export const createContact: RequestHandler = async (req: Request, res: Response) => {
  const { name, number, email, pass, creatorPhone }: Contact = req.body
  try {
    const key = await contactService.getKeyByEmail(email)

    if (!Array.isArray(key)) return BadRequestError(res, 'User already exits')
    await contactService.createContact(name, number, email, pass, creatorPhone)
    // TODO: emitir socket
    SuccessResponse(res, 'success')
  } catch (error) {
    InternalError(res)
  }
}

export const getContactByCreatorPhone: RequestHandler = async (req: Request, res: Response) => {
  const { creatorPhone } = (req.params as unknown) as Contact
  try {
    const keysContacts = await contactService.getKeysContactByCreatorPhone(creatorPhone)

    const contacts = []
    if (keysContacts !== undefined) {
      let cont = 0
      while (cont < keysContacts.length) {
        const contact = await contactService.getContactByKey(keysContacts[cont])
        contacts.push(contact)
        cont++
      }
    }

    // TODO: emitir socket
    SuccessResponse(res, 'success', { data: { contacts } })
  } catch (error) {
    InternalError(res)
  }
}
