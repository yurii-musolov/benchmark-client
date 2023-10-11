# UI Benchmark (Vite + Vue3)

## run local

```bash
vite build && npx http-server dist
node scripts/cannon
```

## params

param: 'http_host', type: 'str', default: '127.0.0.1'
param: 'http_port', type: 'num', default: 3001
param: 'ws_host', type: 'str', default: '127.0.0.1'
param: 'ws_port', type: 'num', default: 3002
param: 'order_book_size', type: 'num', default: 1000
param: 'order_book_message_per_sec', type: 'num', default: 1

```bash
node scripts/cannon --order_book_message_per_sec=20 --order_book_size=1200
```
