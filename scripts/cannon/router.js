const notFound = async (req, res) => {
  console.log(req.method, req.url)
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ message: 'not-found' }))
}

export class Router {
  constructor(routes, config) {
    this._routes = routes
    this._config = config
  }

  expect(url, path) { return url.slice(0, path.length) === path }

  handler(req, res) {
    for (const route in this._routes) {
      if (this.expect(req.url, route)) {
        return this._routes[route](req, res)
      }
    }

    notFound(req, res)
  }
}
