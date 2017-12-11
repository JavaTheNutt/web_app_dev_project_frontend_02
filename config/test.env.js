var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  LOG_LEVEL: '"silent"',
  SERVICE_KEY_TYPE: JSON.stringify(`${process.env.SERVICE_KEY_TYPE}`),
  SERVICE_PRIVATE_KEY_ID: JSON.stringify(`${process.env.SERVICE_PRIVATE_KEY_ID}`),
  SERVICE_PRIVATE_KEY: JSON.stringify(`${process.env.SERVICE_PRIVATE_KEY}`),
  SERVICE_CLIENT_EMAIL: JSON.stringify(`${process.env.SERVICE_CLIENT_EMAIL}`),
  SERVICE_CLIENT_ID: JSON.stringify(`${process.env.SERVICE_CLIENT_ID}`),
  SERVICE_AUTH_URI: JSON.stringify(`${process.env.SERVICE_AUTH_URI}`),
  SERVICE_TOKEN_URI: JSON.stringify(`${process.env.SERVICE_TOKEN_URI}`),
  SERVICE_AUTH_PROVIDER_X509_CERT_URL: JSON.stringify(`${process.env.SERVICE_AUTH_PROVIDER_X509_CERT_URL}`),
  SERVICE_CLIENT_X509_CERT_URL: JSON.stringify(`${process.env.SERVICE_CLIENT_X509_CERT_URL}`)
});
