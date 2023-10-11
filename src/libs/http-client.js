import { stringify } from "qs"

export class HTTPClient {
  constructor(config) {
    this._config = config
  }

  async dispatchRequest(req) {
    const input = typeof req.resource === "string" ? req.url : req.resource
    return fetch(input, req)
  }

  async do(resource, options) {
    let url
    if (typeof resource === "string") {
      url = new URL(resource, this._config.base)
    } else if (resource instanceof Request) {
      url = new URL(resource.url, this._config.base)
    } else if (resource instanceof URL) {
      url = new URL(resource, this._config.base)
    } else {
      return Promise.reject(new TypeError("resource: Request | string | URL"))
    }

    fillParams(url.searchParams, options?.params)
    url = new URL(decodeURI(url.toString()))

    const request = {
      body: options?.body,
      cache: options?.cache || this._config.cache,
      config: this._config,
      credentials: options?.credentials || this._config.credentials,
      headers: this.headers(options?.headers),
      integrity: options?.integrity,
      keepalive: options?.keepalive,
      method: options?.method,
      mode: options?.mode || this._config.mode,
      redirect: options?.redirect,
      referrer: options?.referrer || this._config.referrer,
      referrerPolicy: options?.referrerPolicy || this._config.referrerPolicy,
      resource,
      signal: options?.signal,
      url,
      window: options?.window,
      data: options?.data ?? {},
    }

    return this.dispatchRequest(request)
  }

  async jsonDo(resource, options) {
    try {
      const response = await this.do(resource, options)
      if (response.ok) return await response.json()

      return Promise.reject(response)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  headers(optionsHeaders) {
    const headers = new Headers()

    copyHeaders(headers, this._config.headers)
    copyHeaders(headers, optionsHeaders)

    return headers
  }
}

const copyHeaders = (target, source) => {
  if (!source) return

  if (source instanceof Headers) {
    for (let [header, value] of source.entries()) {
      target.set(header, value)
    }
  } else if (Array.isArray(source)) {
    source.forEach(([header, value]) => target.set(header, value))
  } else if (typeof source === "object") {
    for (let header in source) {
      target.set(header, source[header])
    }
  }
}

const fillParams = (target, source) => {
  if (!source) return

  if (source instanceof URLSearchParams) {
    source.forEach((value, key) => target.append(key, value))
  } else if (typeof source === "object") {
    fillParamsWidthRecord(target, source)
  }
}

const fillParamsWidthRecord = (params, record) => {
  const url = new URL("http://temp-domain.com/path?" + stringify(record))
  url.searchParams.forEach((v, k) => params.append(k, v))
}
