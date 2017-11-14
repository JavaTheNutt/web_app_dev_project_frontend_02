var privateConfig, backendBaseUrl, firebaseKey;
if(process.env.NODE_ENV !== 'production'){
  try {
    privateConfig = require('./private');
  } catch (e) {
  }
}
if(!privateConfig){
  backendBaseUrl =  process.env.BACKEND_BASE_URL;
    firebaseKey =  {
    apiKey: process.env.FIRBASE_API_KEY,
    authDomain: process.env.FIRBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIRBASE_DATABASE_URL,
    projectId: process.env.FIRBASE_PROJECT_ID,
    storageBucket: process.env.FIRBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIRBASE_MESSAGING_SENDER_ID
  };
}else{
  backendBaseUrl = privateConfig.backendBaseUrl;
  firebaseKey = privateConfig.firebaseKey;
}
var logLevel = process.env.LOG_LEVEL || process.env.NODE_ENV === 'development' ? 'trace': 'silent';
export {backendBaseUrl, firebaseKey, logLevel}


