export const findByEmail = 'SELECT u.* FROM users u WHERE correo = $1'

export const save = 'INSERT INTO users (nombre, apellido, imagen, correo, celular, password, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id'
