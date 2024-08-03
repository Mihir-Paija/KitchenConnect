import admin from 'firebase-admin';
import {serviceAccount} from './serviceKey.js'

export const firebaseAdmin = () =>{
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
}
export { admin };
