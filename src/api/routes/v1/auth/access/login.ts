import { Request, Response } from 'express'

import { InternalError } from '../../../../../helpers/api.response'

export default async (req: Request, res: Response): Promise<Response> => {
  return InternalError(res)
}
