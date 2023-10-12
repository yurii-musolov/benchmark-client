import { HTTPClient } from "../libs/http-client";
import { Metrics } from "../libs/metrics";
import { WSClient } from "../libs/ws-client";
import { OrderBook } from "../models/order-book";
import { OrderBookService } from "../services/order-book-service";

const wsClient = new WSClient({
  url: 'ws://127.0.0.1:3002/realtime',
})
const httpClient = new HTTPClient({
  base: "http://127.0.0.1:3001",
})

const orderBookService = new OrderBookService(httpClient, wsClient, {})
export const orderBook = new OrderBook(orderBookService, {
  renderLimitLineCount: 100,
  renderDelay: 1000,
})

export const metrics = new Metrics(1000)

wsClient.connect()
