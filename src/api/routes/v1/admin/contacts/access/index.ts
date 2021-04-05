import { Request, Response, RequestHandler } from 'express'
import { Contact } from 'interfaces/contact.interfaces'
import ContactService from 'services/contact/contact.service'
import { BadRequestError, InternalError, SuccessResponse } from '../../../../../../helpers/api.response'
const contactService = ContactService.getInstance()

export const createContact: RequestHandler = async (req: Request, res: Response) => {
  const { name, number, email, pass }: Contact = req.body
  try {
    const key = await contactService.getKeyByEmail(email)

    if (!Array.isArray(key)) return BadRequestError(res, 'User already exits')
    await contactService.createContact(name, number, email, pass)
    // TODO: emitir socket
    SuccessResponse(res, 'success')
  } catch (error) {
    InternalError(res)
  }
}
