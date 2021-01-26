import express from 'express'
import colors from 'colors'

import { name, port } from 'config'
import Logger from 'helpers/logger'

async function startServer(): Promise<void> {
  const app = express()

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  await require('./loaders').default({ expressApp: app })

  app
    .listen(port, () => {
      Logger.info(`${colors.yellow('########################################################')}
🛡️  ${colors.green(`Server ${colors.blue(name)} listening on port:`)} ${colors.blue(port)} 🛡️
${colors.yellow('########################################################')}`)
    })
    .on('error', (e) => Logger.error('error in server.listen', e))
}

startServer()
  .then(() => Logger.info(colors.green('done ✌️')))
  .catch((error: Error) => Logger.error(colors.red('error when starting the api'), error))
