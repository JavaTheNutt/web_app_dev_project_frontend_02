var privateConfig;
if(process.env.NODE_ENV !== 'production'){
  try {
    privateConfig = require('./private');
  } catch (e) {
  }
}
export var backendBaseUrl = privateConfig.backendBaseUrl || process.env.BACKEND_BASE_URL;

export var firebaseKey = privateConfig.firebaseKey || {
  apiKey: process.env.FIRBASE_API_KEY,
  authDomain: process.env.FIRBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIRBASE_DATABASE_URL,
  projectId: process.env.FIRBASE_PROJECT_ID,
  storageBucket: process.env.FIRBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIRBASE_MESSAGING_SENDER_ID
};

