export interface User {
  id?: number
  nombre: string
  apellido: string
  correo: string
  password: string
  celular: string
  imagen: string
  tipo: string
}

export interface UserCredentials {
  correo: string
  password: string
}
