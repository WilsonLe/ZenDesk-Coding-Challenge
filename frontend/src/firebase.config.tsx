import { initializeApp } from '@firebase/app';
import { getAnalytics, logEvent } from '@firebase/analytics';
import { getFunctions, connectFunctionsEmulator } from '@firebase/functions';
import secrets from './secrets.json';

const firebaseConfig = {
  apiKey: secrets.apiKey,
  authDomain: secrets.authDomain,
  projectId: secrets.projectId,
  storageBucket: secrets.storageBucket,
  messagingSenderId: secrets.messagingSenderId,
  appId: secrets.appId,
};

const app = initializeApp(firebaseConfig);

const functions = getFunctions(app);
const analytics = getAnalytics(app);
logEvent(analytics, 'page_view');

if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

export { functions as fn };
