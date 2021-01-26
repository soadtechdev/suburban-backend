export const findByEmail = 'SELECT u.* FROM users u WHERE correo = $1'

export const save = 'INSERT INTO users (nombre, apellido, imagen, correo, celular, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id'
