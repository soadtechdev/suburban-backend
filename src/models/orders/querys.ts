export const createOrder = 'INSERT INTO orders (status, idcreador, ordersdata) VALUES ($1, $2 ,$3) returning *'
export const changeStatus = 'update orders set status = $1, idrepartidor = $2 where id = $3 returning status'
export const declineOrder = 'update orders set status = $1, mensaje = $2 where id = $3 returning (status, mensaje)'
