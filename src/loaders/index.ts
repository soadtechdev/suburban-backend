import { Application } from 'express'
import colors from 'colors'

import expressLoader from './express'
import Logger from '../helpers/logger'
import pool from './mysql'

export default async ({ expressApp }: { expressApp: Application }): Promise<void> => {
  Logger.info(colors.blue('Loading configuration... 💻'))

  try {
    await pool.testConnection
    Logger.info(colors.green('MySQL loaded and connected! ✌️'))
  } catch (error) {
    Logger.error(colors.red('error loading or connecting MySQL'), error)
    throw error
  }

  try {
    await expressLoader({ app: expressApp })
    Logger.info(colors.green('Express loaded ✌️'))
  } catch (error) {
    Logger.error(colors.red('error loading Express'), error)
    throw error
  }
}
