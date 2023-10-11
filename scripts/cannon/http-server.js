import http from 'node:http';

export class HTTPServer {
  constructor(router, config) {
    this._router = router
    this._config = config
  }

  run() {
    const server = http.createServer(this._router.handler.bind(this._router));

    server.listen(this._config.port, this._config.host, () => {
      const url = `http://${this._config.host}:${this._config.port}`
      console.log(`The ${HTTPServer.name} is running at ${url}`);
    });
  }
}
