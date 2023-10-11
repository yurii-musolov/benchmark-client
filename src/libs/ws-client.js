export class WSClient {
  _subscribers = new Map()

  constructor(config) {
    this._config = config
  }

  connect() {
    const connect = new WebSocket(this._config.url)
    connect.addEventListener('message', this.onMessage.bind(this))
  }

  onMessage(event) {
    const data = JSON.parse(event.data)
    const subscribers = this._subscribers.get(data.topic) ?? []
    subscribers.forEach(cb => cb(data.data))
  }

  on(topic, cb) {
    const subscribers = this._subscribers.get(topic) ?? []
    if (!subscribers.includes(cb)) {
      subscribers.push(cb)
      this._subscribers.set(topic, subscribers)
    }

    return () => this.off(topic, cb)
  }

  off(topic, cb) {
    const subscribers = this._subscribers.get(topic) ?? []
    this._subscribers.set(topic, subscribers.filter(f => f !== cb))
  }
}