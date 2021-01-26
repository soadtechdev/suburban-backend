// Mapper for environment variables
export const environment = process.env.NODE_ENV
export const port = process.env.PORT ?? '9000'
export const name = process.env.NAME_API ?? 'API'

export const keyHttps = process.env.KEY_HTTPS ?? ''
export const fullChainHttps = process.env.FULL_CHAIN_HTTPS ?? ''

export const db = {
  database: process.env.PGDATABASE ?? 'postgres',
  host: process.env.PGHOST ?? 'database-1.ckxqesn1ftuj.us-east-1.rds.amazonaws.com',
  user: process.env.PGUSER ?? 'postgres_admin',
  password: process.env.PGPASSWORD ?? 'mv$B69Ck(VARp<L$',
  port: process.env.PORT ?? '5432'
}

export const corsUrl = process.env.CORS_URL

export const secretKey = process.env.SECRETKEY ?? ''

export const api = {
  prefix: '/v1.0'
}
