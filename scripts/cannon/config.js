const format = {
  str: String,
  num: Number
}

export const getConfig = configuration => {
  const params = process.argv
    .filter(arg => arg.slice(0, 2) === '--')
    .map(arg => arg.split('='))
    .reduce((config, [key, value]) => (config[key.slice(2)] = value) && config, {})

  const config = {}

  for (const key in configuration) {
    config[key] = format[configuration[key].type](params[key] ?? configuration[key].default)
  }

  return config
}
