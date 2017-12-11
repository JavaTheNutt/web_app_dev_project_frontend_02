const firebase = require('firebase');
import {firebaseKey} from '../../../src/app/config';
firebase.initializeApp(firebaseKey);
//const key = JSON.parse(process.env.SERVICE_PRIVATE_KEY);
/*admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.SERVICE_KEY_TYPE,
    project_id: process.env.SERVICE_PROJECT_ID,
    private_key_id: process.env.SERVICE_PRIVATE_KEY_ID,
    private_key: key,
    client_email: process.env.SERVICE_CLIENT_EMAIL,
    client_id: process.env.SERVICE_CLIENT_ID,
    auth_uri: process.env.SERVICE_AUTH_URI,
    token_uri: process.env.SERVICE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.SERVICE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.SERVICE_CLIENT_X509_CERT_URL
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});*/
module.exports = {
  async deleteTestUser(){
    const user = await firebase.auth().currentUser.delete();
  }
};
