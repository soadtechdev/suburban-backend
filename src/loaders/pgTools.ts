import colors from 'colors'
import { Pool, PoolConfig } from 'pg'

import { db } from '../config'
import Logger from '../helpers/logger'

const { user, password, host, database, port } = db

const poolConfig: PoolConfig = {
  user,
  password,
  host,
  database,
  port: +port,
  max: 5,
  idleTimeoutMillis: 40000
}

export const pool = new Pool(poolConfig)

pool.on('connect', (): void => {
  // Logger.info(colors.green('Connection to the database has been established successfully.'))
})

pool.on('error', (err: Error, client: any) => {
  let message!: string

  message += `${colors.magenta('[  DB  ]')} *** CONEXIÓN INICIADA ERRADA POR:\n`
  message += `${colors.magenta('[  DB  ]')} *** NOMBRE:\t${err.name}\n`
  message += `${colors.magenta('[  DB  ]')} *** MENSAJE:\t${err.message}`
  const stack = err.stack
  Logger.error(message, stack)
  throw err
})

pool.on('remove', (client: any) => {
  const message = `[${colors.blue(client.processID)}]${colors.green('[  OPEN ]')} Conexion Client Pool Postgrest Finalizada.`
  Logger.info(`${colors.magenta('[  DB  ]')} *** ${message}`)
})
