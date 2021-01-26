export const findByEmail = 'SELECT u.* FROM usuarios u WHERE correo = ?'

export const save = 'INSERT INTO usuarios (nombre , apellido, correo , password, celular) VALUES (?, ?, ?, ?, ?)'