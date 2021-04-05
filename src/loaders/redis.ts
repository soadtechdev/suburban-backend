import colors from 'colors'

import { db } from '../config'
import Logger from '../helpers/logger'
// @ts-expect-error
import { createClient } from 'then-redis'

const { password, host, port } = db

const client = createClient({
  port: port,
  host: host,
  password: password
})
client.on('error', (err: any) => {
  Logger.error('Ha ocurrido un error', err)
})
client.on('ready', () => {
  Logger.info(`${colors.magenta('[  DB  ]')} *** Conectada`)
})

export default client
