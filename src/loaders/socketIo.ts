import { Server } from 'socket.io'
import http from 'http'
import Logger from '../helpers/logger'
import * as socket from '../helpers/sockets'
import colors from 'colors'
export default class SocketIo {
  private static instance: SocketIo

  public static getInstance(): SocketIo {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return this.instance || (this.instance = new this())
  }

  private io!: Server

  setIo = (server: http.Server): void => {
    this.io = new Server(server, {
      cors: {
        origin: '*'
      }
    })
  }

  getIo = (): Server => {
    return this.io
  }

  hearSocket = (): void => {
    Logger.info(colors.green('Escuchando la conexion del socketIO'))

    this.io.on('connection', (client) => {
      Logger.info(colors.green('Un usuario connectado'))
      socket.connectClient(client, this.io)
      socket.disconnect(client, this.io)
    })
  }
}
