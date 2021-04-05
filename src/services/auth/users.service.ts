import colors from 'colors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { User } from 'interfaces/users.interfaces'
import { secretKey } from 'config'
import UsersModel from 'models/auth/users.model'
import Logger from 'helpers/logger'

const usersModel = UsersModel.getInstance()
export default class UsersService {
  private static instance: UsersService

  public static getInstance(): UsersService {
    if (UsersService.instance === undefined) {
      UsersService.instance = new UsersService()
    }
    return UsersService.instance
  }

  findByEmail = async (email: string): Promise<User | undefined> => {
    try {
      // TODO: quitar any
      const result: any = await usersModel.findByEmail(email)
      return result !== null ? JSON.parse(result) : result
    } catch (error) {
      Logger.error(colors.red('Error UsersService findByEmail '), error)
      throw new Error('ERROR TECNICO')
    }
  }

  save = async ({ name, middleName, phone, email, password, imagen, document }: User): Promise<any> => {
    try {
      const passwordHash = await bcrypt.hash(password, 10)
      const data = {
        name,
        middleName,
        phone,
        password,
        passwordHash,
        email,
        imagen,
        document
      }
      const userId = await usersModel.save(email, JSON.stringify(data))
      return userId
    } catch (e) {
      Logger.error(colors.red('Error UsersService save '), e)
      throw new Error('ERROR TECNICO')
    }
  }

  comparePassword = async (confirmPassword: string, password: string): Promise<boolean> => {
    try {
      const data = await bcrypt.compare(confirmPassword, password)
      return data
    } catch (e) {
      Logger.error(colors.red('Error comparePassword '), e)
      throw e
    }
  }

  signToken = (data: Record<string, unknown>): string => {
    return jwt.sign(data, secretKey, { expiresIn: '24h' })
  }

  verifyToken = (token: string): any => {
    return jwt.verify(token, secretKey)
  }

  /* findOne = async ({ usuario, correo }: CreateUser): Promise<any> => {
    try {
      const data = await usersModel.findOne({ usuario, correo })
      return data
    } catch (e) {
      Logger.error(colors.red('Error findOne '), e)
      throw new Error('ERROR TECNICO')
    }
  }
  findByUser = async (usuario: any): Promise<any> => {
    try {
      const data = await usersModel.findByUser(usuario)
      return data
    } catch (e) {
      Logger.error(colors.red('Error findByUser '), e)
      throw new Error('ERROR TECNICO')
    }
  }
  save = async ({ nombres, apellidos, identificacion, correo, usuario, clave, telefono, codigo_entidad: codigoEntidad }: CreateUser): Promise<any> => {
    try {
      const passwordHash = await bcrypt.hash(clave, 10)
      const atributos = {
        correo,
        telefono
      }
      const person = await usersModel.savePerson({ nombres, apellidos, identificacion, atributos })
      const user = await usersModel.saveUser({ identificadorPersona: person.id, usuario, clave: passwordHash })
      const data = {
        id: person.id,
        nombres: person.nombres,
        apellidos: person.apellidos,
        identificacion: person.identificacion,
        tipo: person.tipo,
        atributos: person.ed_atributos,
        usuario: user.usuario,
        clave: user.clave
      }
      return data
    } catch (e) {
      Logger.error(colors.red('Error save '), e)
      throw new Error('ERROR TECNICO')
    }
  }
  findAll = async (): Promise<any> => {
    try {
      const data = await usersModel.findAll()
      return data
    } catch (e) {
      Logger.error(colors.red('Error findAll '), e)
      throw new Error('ERROR TECNICO')
    }
  }
  comparePassword = async (confirmPassword: string, password: string): Promise<boolean> => {
    try {
      const data = await bcrypt.compare(confirmPassword, password)
      return data
    } catch (e) {
      Logger.error(colors.red('Error comparePassword '), e)
      throw e
    }
  }
  signToken = (data: Record<string, unknown>): string => {
    return jwt.sign(data, secretKey, { expiresIn: '24h' })
  }
  verifyToken = (token: string): any => {
    return jwt.verify(token, secretKey)
  } */
}
