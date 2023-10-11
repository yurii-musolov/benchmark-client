import { WebSocketServer } from 'ws'

export class WSServer {
  _connects = new Set()
  _isRunning = false

  constructor(config) {
    this._config = config
  }

  run() {
    if (this._isRunning) return
    this._isRunning = true

    const wss = new WebSocketServer(this._config)
    wss.on("connection", this.connection.bind(this))

    const url = `ws://${this._config.host}:${this._config.port}/realtime`
    console.log(`The ${WSServer.name} is running at ${url}`)
  }

  connection(ws) {
    this._connects.add(ws)
    ws.send(JSON.stringify({ topic: 'connect' }))
    ws.on("close", () => { console.log("the client has connected"); })
    ws.onerror = function () { console.log("Some Error occurred") }
  }

  send(data) { this._connects.forEach(connect => connect.send(JSON.stringify(data))) }
}
