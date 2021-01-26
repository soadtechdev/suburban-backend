import { Application } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { api } from '../config'
import routesV1 from '../api/routes/v1'

import { responseError, StatusCode } from '../helpers/api.response'

export default async ({ app }: { app: Application }): Promise<Application> => {
  app.use(cors())

  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

  app.use((_req, res, next) => {
    bodyParser.json({
      verify: (req: any, buf: any) => {
        req.rawBody = buf.toString()
      }
    })(_req, res, (err) => {
      if (err !== undefined) {
        let msg!: string
        let code!: number
        switch (err.type) {
          case 'entity.parse.failed':
            msg = 'entity.parse.failed'
            code = 400
            break
          case 'entity.too.large':
            msg = 'entity.too.large'
            code = 413
            break
        }
        return responseError(StatusCode.FAILURE, msg, code, res)
      }
      next()
    })
  })

  app.use(morgan('dev'))

  app.use(api.prefix, routesV1)

  return app
}
