import { Order } from '../../interfaces/order.interfaces'
import { pool } from '../../loaders/pgTools'
import * as querys from './querys'

export default class OrderModel {
  private static instance: OrderModel

  public static getInstance(): OrderModel {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!OrderModel.instance) {
      OrderModel.instance = new OrderModel()
    }
    return OrderModel.instance
  }

  createOrder = async (status: number, idCreador: number, dataEncargo: string): Promise<Order | undefined> => {
    const { rows }: any = await pool.query(querys.createOrder, [status, idCreador, dataEncargo])
    return rows[0]
  }

  acceptOrder = async (orderId: number, status: number, idRepartidor: number): Promise<Order | undefined> => {
    const { rows }: any = await pool.query(querys.changeStatus, [status, idRepartidor, orderId])
    return rows[0]
  }

  finished = async (orderId: number, status: number, motivo: string): Promise<Order | undefined> => {
    const { rows }: any = await pool.query(querys.declineOrder, [status, motivo, orderId])
    return rows[0]
  }

  /* validate = async (identificadorPersona: string): Promise<boolean> => {
    const { rows } = await pool.query(querys.validate, [identificadorPersona])
    return (rows.length > 0)
  } */

  /* savePerson = async ({ nombres, apellidos, identificacion, atributos }: any): Promise<any> => {
    const { rows } = await pool.query(querys.savePerson, [nombres, apellidos, identificacion, atributos])
    return rows[0]
  }
  saveUser = async ({ identificadorPersona, usuario, clave }: any): Promise<any> => {
    const { rows } = await pool.query(querys.saveUser, [identificadorPersona, usuario, clave])
    return rows[0]
  }
  findAll = async (): Promise<any[]> => {
    const { rows } = await pool.query(querys.findAll)
    return rows
  }
  findOne = async ({ usuario, correo }: any): Promise<any> => {
    const { rows } = await pool.query(querys.findOne, [usuario, correo])
    return rows[0]
  }
  findByUser = async (usuario: any): Promise<any> => {
    const { rows } = await pool.query(querys.findByUser, [usuario])
    return rows[0]
  } */
}
