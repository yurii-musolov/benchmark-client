import { getConfig } from './config.js'
import { HTTPServer } from './http-server.js'
import { OrderBook } from './order-book.js'
import { Router } from './router.js'
import { WSServer } from './ws-server.js'

const configuration = {
  http_host: { param: 'http_host', type: 'str', default: '127.0.0.1' },
  http_port: { param: 'http_port', type: 'num', default: 3001 },
  ws_host: { param: 'ws_host', type: 'str', default: '127.0.0.1' },
  ws_port: { param: 'ws_port', type: 'num', default: 3002 },
  order_book_size: { param: 'order_book_size', type: 'num', default: 1000 },
  order_book_message_per_sec: { param: 'order_book_message_per_sec', type: 'num', default: 1 },
}

const config = getConfig(configuration)

const orderBook = new OrderBook({
  size: config.order_book_size,
  message_per_sec: config.order_book_message_per_sec,
})

const getOrderBookSnapshotHandler = async (req, res) => {
  console.log(req.method, req.url)
  const snapshot = orderBook.snapshot()
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(snapshot))
}
const routes = {
  '/snapshot/order_book': getOrderBookSnapshotHandler,
}
const router = new Router(routes, {})
const httpServer = new HTTPServer(router, {
  host: config.http_host,
  port: config.http_port,
})

const wsServer = new WSServer({
  host: config.ws_host,
  port: config.ws_port,
  path: '/realtime',
})
orderBook.on(data => wsServer.send({ topic: 'order_book', data }));
orderBook.startGenerating();

httpServer.run()
wsServer.run()

setTimeout(() => console.log('==== cannon runing ===='))
