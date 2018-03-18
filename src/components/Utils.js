export const isDev = process.env.NODE_ENV.toUpperCase() === 'DEVELOPMENT'
export const isProd = process.env.NODE_ENV.toUpperCase() === 'PRODUCTION'
export const isTest = process.env.NODE_ENV.toUpperCase() === 'TEST'

export function getParams(query) {
  if (!query) {
    return {}
  }
  return (/^[?#]/.test(query) ? query.slice(1) : query)
  .split('&')
  .reduce((params, param) => {
    let [key, value] = param.split('=')
    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : ''
    return params;
  }, {})
}
