export interface User {
  id?: number
  name: string
  middleName: string
  email: string
  password: string
  phone: number
  imagen: string
  document: string
  passwordHash: string
}

export interface UserCredentials {
  correo: string
  password: string
}
