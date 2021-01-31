import colors from 'colors'
import { Order } from 'interfaces/order.interfaces'
import OrderModel from 'models/orders/orders.model'
import Logger from 'helpers/logger'

const oderModel = OrderModel.getInstance()
export default class OrderService {
  private static instance: OrderService

  public static getInstance(): OrderService {
    if (OrderService.instance === undefined) {
      OrderService.instance = new OrderService()
    }
    return OrderService.instance
  }

  createOrder = async (status: number, idCreador: number, dataEncargo: string): Promise<Order | undefined> => {
    try {
      const result: any = await oderModel.createOrder(status, idCreador, dataEncargo)
      return result
    } catch (error) {
      Logger.error(colors.red('Error OrderService findByEmail '), error)
      throw new Error('ERROR TECNICO')
    }
  }

  acceptOrder = async (orderId: number, status: number, idRepartidor: number): Promise<Order | undefined> => {
    try {
      const result: any = await oderModel.acceptOrder(orderId, status, idRepartidor)
      return result
    } catch (error) {
      Logger.error(colors.red('Error OrderService findByEmail '), error)
      throw new Error('ERROR TECNICO')
    }
  }

  finished = async (orderId: number, status: number, motivo: string): Promise<Order | undefined> => {
    try {
      const result: any = await oderModel.finished(orderId, status, motivo)
      return result
    } catch (error) {
      Logger.error(colors.red('Error OrderService finished '), error)
      throw new Error('ERROR TECNICO')
    }
  }
}
