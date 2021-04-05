import dotenv from 'dotenv'
dotenv.config()
// Mapper for environment variables
export const environment = process.env.NODE_ENV
export const port = process.env.PORT ?? '9000'
export const name = process.env.NAME_API ?? 'API'

export const keyHttps = process.env.KEY_HTTPS ?? ''
export const fullChainHttps = process.env.FULL_CHAIN_HTTPS ?? ''

export const db = {
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT
}

export const corsUrl = process.env.CORS_URL

export const secretKey = process.env.SECRETKEY ?? 'Jq60gQRdrY'

export const api = {
  prefix: '/api/v1'
}
