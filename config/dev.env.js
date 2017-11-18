require('dotenv').config();
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FIRBASE_API_KEY: JSON.stringify(process.env.FIRBASE_API_KEY),
  FIRBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIRBASE_DATABASE_URL),
  FIRBASE_PROJECT_ID: JSON.stringify(process.env.FIRBASE_PROJECT_ID),
  FIRBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIRBASE_STORAGE_BUCKET),
  FIRBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.FIRBASE_MESSAGING_SENDER_ID)
});
