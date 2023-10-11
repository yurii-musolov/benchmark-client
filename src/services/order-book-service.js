export class OrderBookService {
  _subscribers = new Set()

  constructor(httpClient, wsClient, config) {
    this.httpClient = httpClient
    this.wsClient = wsClient
    this.config = config

    this.wsClient.on('order_book', this._handler.bind(this))
  }

  on(cb) {
    this.httpClient.jsonDo('/snapshot/order_book')
      .then(response => {
        cb(this.snapshot(response))
        this._subscribers.add(cb)
      })
      .catch(console.error)

    return () => this.off(cb)
  }

  off(cb) { this._subscribers.delete(cb) }

  _handler(data) { this._subscribers.forEach(cb => cb(data)) }

  snapshot(data) { return { topic: 'order_book', action: 'snapshot', data } }
}
