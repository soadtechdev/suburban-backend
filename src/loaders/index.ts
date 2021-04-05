import { Application } from 'express'
import colors from 'colors'

import expressLoader from './express'
import Logger from '../helpers/logger'

export default async ({ expressApp }: { expressApp: Application }): Promise<void> => {
  Logger.info(colors.blue('Loading configuration... 💻'))

  // try {
  //  await client.connect()
  //  Logger.info(colors.green('PostgreSQL loaded and connected! ✌️'))
  // } catch (error) {
  //  Logger.error(colors.red('error loading or connecting PostgreSQL'), error)
  //  throw error
  // }
  try {
    await expressLoader({ app: expressApp })
    Logger.info(colors.green('Express loaded ✌️'))
  } catch (error) {
    Logger.error(colors.red('error loading Express'), error)
    throw error
  }
}
