const roundPrice = (price, precision = 4) => +(price + Number.EPSILON).toFixed(precision)

const randomInt = limit => Math.ceil(Math.random() * limit)

const createOrders = (count, size) => {
  const half = size / 2
  const orders = []
  for (let i = 0; i < size; i++) {
    orders.push({
      price: roundPrice(0.0001 * (i + 1)),
      volume: count * (i + 1),
      side: +(i > half)
    })
  }
  return orders
}

export class OrderBook {
  _subscribers = new Set()

  constructor(config) {
    this._config = config
    this._interval = Math.floor(1000 / this._config.message_per_sec)
  }

  snapshot() { return createOrders(1, this._config.size) }

  on(cb) {
    this._subscribers.add(cb)
    return () => this.off(cb)
  }

  off(cb) { this._subscribers.delete(cb) }

  send(action, rows) {
    const data = { action, data: rows }
    this._subscribers.forEach(cb => cb(data))
  }

  startGenerating() {
    let toInsert
    let count = 1
    setInterval(() => {
      if (toInsert) {
        this.send('insert', toInsert)
        toInsert = null
        return
      }

      count++
      const toUpdate = createOrders(count, this._config.size)

      const isDel = Math.random() < 0.2
      if (isDel) {
        const toDelete = this.sift(toUpdate)
        toInsert = toDelete
        this.send('delete', toDelete)
        return
      }

      this.send('update', toUpdate)
    }, this._interval)
  }

  sift(orders) {
    let count = Math.min(Math.max(Math.trunc(orders.length / 10), 10), orders.length)
    const inds = new Set()
    while (count) {
      const randIndex = randomInt(orders.length)
      if (inds.has(randIndex)) {
        continue
      }
      inds.add(randIndex)
      count--
    }

    return [...inds.keys()].map(index => orders[index]).filter(order => order)
  }
}
