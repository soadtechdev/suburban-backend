import { User } from '../../interfaces/users.interfaces'
import { pool } from '../../loaders/pgTools'
import * as querys from './querys'

export default class UsersModel {
  private static instance: UsersModel

  public static getInstance(): UsersModel {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!UsersModel.instance) {
      UsersModel.instance = new UsersModel()
    }
    return UsersModel.instance
  }

  findByEmail = async (email: string): Promise<User | undefined> => {
    const { rows } = await pool.query(querys.findByEmail, [email])
    return rows[0]
  }

  save = async ({ nombre, apellido, celular, password, correo, imagen }: User): Promise<any> => {
    const { rows } = await pool.query(querys.save, [nombre, apellido, imagen, correo, celular, password])
    console.log(rows)
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
