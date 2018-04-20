// You don't have to deploy a function everytime you need to test. Do it locally instead!
// https://firebase.google.com/docs/admin/setup#prerequisites

/**
 * Typescript version (index.ts)
 */ 

import * as admin from 'firebase-admin';
import { serviceAccount } from './serviceAccountKey';

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key
    }),
    databaseURL: serviceAccount.database_url
})

// serviceAccountKey.ts

export const serviceAccount = {
  "project_id": "your-project-id",  
  "private_key": "-----BEGIN PRIVATE KEY-----blah-blah-blah=\n-----END PRIVATE KEY-----\n",
  "client_email": "dalenguyen@.iam.gserviceaccount.com",  
  "database_url": "https://dalenguyen.firebaseio.com"
}

/**
 * Javascrit verrsion (index.js)
 */ 
 
var admin = require('firebase-admin');
var serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});
 
