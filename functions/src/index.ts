import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onCall((data, context) => {
  return 'HELLO WORLD';
});
