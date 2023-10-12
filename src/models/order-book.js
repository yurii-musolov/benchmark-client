import { reactive } from "vue"
import { metrics } from './../application'
import { METRIC } from './../application/metric'

// a faster version of big arithmetic
const roundPrice = (price, tick, precision, side = 0) => {
  const round = side === 0 ? Math.floor : Math.ceil
  return (round(price / tick) * tick + Number.EPSILON).toFixed(precision)
}
const roundVolume = (volume, precision = 2) => (volume + Number.EPSILON).toFixed(precision)

export class OrderBook {
  _state = reactive({
    scale: 0.0001,
    bids: [],
    asks: [],
  })
  _orders = new Map()

  constructor(orderBookService, config) {
    this._config = config
    this.orderBookService = orderBookService
    this.orderBookService.on(this._handler.bind(this))

    this._handlers = {
      snapshot: this._snapshot.bind(this),
      insert: this._insert.bind(this),
      update: this._update.bind(this),
      delete: this._delete.bind(this),
    }
    setInterval(this._aggregate.bind(this), this._config.renderDelay)
  }

  get bids() {
    return this._state.bids
  }

  get asks() {
    return this._state.asks
  }

  get scale() {
    return this._state.scale
  }

  setScale(scale) {
    console.log("~ scale", scale)
    this._state.scale = scale
  }

  _handler({ action, data }) {
    metrics.inc(METRIC.ORDER_BOOK_WS_MESSAGES)
    this._handlers[action](data)
  }

  _reset() {
    console.log("~ reset")
    this._orders.clear()
    this._state.bids = []
    this._state.asks = []
  }

  _snapshot(data) {
    console.log("~ snapshot", data.length)
    this._reset()
    this._insert(data)
  }

  _insert(data) {
    console.log("~ insert", data.length)
    data.forEach(order => this._orders.set(order.price, order))
  }

  _update(data) {
    data.forEach(order => {
      const _order = this._orders.get(order.price)
      if (_order) {
        _order.volume = order.volume
        _order.side = order.side
      } else {
        // TODO: log error, reset, get snapshot...
        this._insert([order])
      }
    })
  }

  _delete(data) {
    console.log("~ delete", data.length)
    data.forEach(order => this._orders.delete(order.price))
  }

  _aggregate() {
    const scaledOrders = new Map()
    const limit = this._config.renderLimitLineCount
    const bids = []
    const asks = []
    this._orders.forEach(order => {
      const formatedPrice = roundPrice(order.price, this._state.scale, 4, order.side)
      const scaledOrder = scaledOrders.get(formatedPrice)
      if (scaledOrder) {
        scaledOrder.volume + order.volume
      } else {
        const scaledOrder = { ...order, formatedPrice }
        scaledOrder.side === 0 ? asks.push(scaledOrder) : bids.push(scaledOrder)
        scaledOrders.set(formatedPrice, scaledOrder)
      }
    })

    bids.sort((a, b) => a.price > b.price ? 1 : -1)
    let bidsTotal = 0
    const bidsLimit = Math.min(limit, bids.length)
    for (let i = 0; i < bidsLimit; i++) {
      bidsTotal += bids[i].volume
      bids[i].volume = roundVolume(bids[i].volume)
      bids[i].total = roundVolume(bidsTotal)
    }

    asks.sort((a, b) => a.price > b.price ? -1 : 1)
    let asksTotal = 0
    const asksLimit = Math.min(limit, asks.length)
    for (let i = 0; i < asksLimit; i++) {
      asksTotal += asks[i].volume
      asks[i].volume = roundVolume(asks[i].volume)
      asks[i].total = roundVolume(asksTotal)
    }

    this._state.bids = bids.slice(0, limit)
    this._state.asks = asks.slice(0, limit)
  }
}
