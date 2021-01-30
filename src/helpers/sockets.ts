import socketIO, { Socket } from 'socket.io'

export const connectClient = (_socket: Socket, _io: socketIO.Server): void => {
  console.log('Socket connected')
}

export const disconnect = (socket: Socket, io: socketIO.Server): void => {
  socket.on('disconnect', () => {
    console.log('socket desconectado')
  })
}
