import { Request, Response, RequestHandler } from 'express'
import { Order } from 'interfaces/order.interfaces'
import OrderService from 'services/orders/orders.service'
import { InternalError, SuccessResponse } from '../../../../../../helpers/api.response'
import { StatusService } from '../../../../../../helpers/constans'
const orderService = OrderService.getInstance()

export const createEncargo: RequestHandler = async (req: Request, res: Response) => {
  const { status, idCreador, dataEncargo }: Order = req.body
  try {
    const order = await orderService.createOrder(status, idCreador, JSON.stringify(dataEncargo))
    // TODO: emitir socket
    SuccessResponse(res, 'success', { data: { order } })
  } catch (error) {
    InternalError(res)
  }
}
export const changeStatusOrder: RequestHandler = async (req: Request, res: Response) => {
  const { status, idRepartidor, motivo } = req.body
  const { id } = req.params

  switch (status) {
    case StatusService.ACEPTADO:
      try {
        const order = await orderService.acceptOrder(Number(id), status, idRepartidor)
        // TODO: emitir socket
        SuccessResponse(res, 'success', { data: { order } })
      } catch (error) {
        InternalError(res)
      }
      break
    case StatusService.CANCELADO:
      try {
        const order = await orderService.finished(Number(id), status, motivo)
        // TODO: emitir socket
        SuccessResponse(res, 'success', { data: { order } })
      } catch (error) {
        InternalError(res)
      }
      break
    default:
      break
  }
}
